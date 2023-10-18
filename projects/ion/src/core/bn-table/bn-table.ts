import { forkJoin, of } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LIST_OF_PAGE_OPTIONS } from '../../lib/pagination/pagination.component';
import { ConfigTable, EventTable } from '../../lib/table/utilsTable';
import {
  ConfigSmartTable,
  OrderTableEvent,
  PageEvent,
  SmartTableEvent,
} from '../../public-api';
import { BnService, IPayload, IResponse } from '../api/http.interfaces';
import { clearObject } from '../utils/clearObject';

export interface SmartPayload {
  offset?: number;
  total?: boolean;
  limit?: number;
  order?: string;
  sort?: string;
}

export interface IBnTable<DataType> {
  service: BnService<DataType>;
  tableConfig: Pick<ConfigTable<DataType>, 'columns' | 'actions'>;
  formatData?: (data: DataType[]) => DataType[];
}

export default class BnTable<DataType> {
  public configTable: ConfigSmartTable<DataType> = {
    data: [],
    columns: [],
    actions: [],
    pagination: {
      total: 0,
      itemsPerPage: LIST_OF_PAGE_OPTIONS[0],
      pageSizeOptions: LIST_OF_PAGE_OPTIONS,
    },
    loading: false,
  };

  public payload: IPayload = {
    total: true,
    offset: this.configTable.pagination.offset || 0,
    limit: this.configTable.pagination.itemsPerPage,
  };

  private service: BnService<DataType>;
  private formatData: (data: DataType[]) => DataType[];
  private firstLoad = true;

  constructor(config: IBnTable<DataType>) {
    this.service = config.service;

    // set configs
    this.configTable.columns = config.tableConfig.columns;
    this.configTable.actions = config.tableConfig.actions;

    this.formatData = config.formatData;
    this.onInit();
  }

  filter<T = DataType>(filter: T): void {
    this.payload = {
      ...this.payload,
      ...filter,
    };
    clearObject(this.payload);
    this.resetTablePagination();
    this.smartData();
  }

  smartData(): void {
    this.configTable.loading = true;

    if (this.firstLoad) {
      const firstOrderedColumn = this.configTable.columns.filter(
        (column) => column.desc !== undefined
      )[0];

      if (firstOrderedColumn) {
        this.handleSort({
          column: firstOrderedColumn.key,
          desc: firstOrderedColumn.desc,
        });
      }

      this.firstLoad = false;
    }

    const totalRequest$ = this.payload.total
      ? this.service.list(this.payload).pipe(take(1))
      : of(null);

    const dataRequest$ = this.service
      .list({ ...this.payload, total: false })
      .pipe(take(1));

    forkJoin([totalRequest$, dataRequest$])
      .pipe(finalize(() => (this.configTable.loading = false)))
      .subscribe(
        (response) => {
          const [totalResponse, dataResponse]: [
            IResponse<DataType>,
            IResponse<DataType>
          ] = response;

          if (totalResponse && totalResponse.total !== null) {
            this.configTable.pagination = {
              ...this.configTable.pagination,
              total: totalResponse.total || 0,
            };
          }

          this.configTable.data = dataResponse.dados || dataResponse.data || [];

          if (this.formatData) {
            this.configTable.data = this.formatData(this.configTable.data);
          }
        },
        () => {
          // TODO: add notification service
          // const msg: string = error.msg || error.error.msg;
          // this.notify.error('Erro', msg);
        }
      );
  }

  events(event: SmartTableEvent): void {
    const eventHandlers = {
      [EventTable.CHANGE_PAGE]: () => this.handlePageChange(event.change_page),
      [EventTable.SORT]: () => event.order && this.handleSort(event.order),
      [EventTable.REFRESH_FILTER]: () => this.filter(event.data),
    };

    const handler = eventHandlers[event.event];
    if (handler) {
      handler();
    }

    if (event.event !== EventTable.REFRESH_FILTER) {
      this.smartData();
    }
  }

  handlePageChange(changePage: PageEvent): void {
    this.payload.limit = changePage.itemsPerPage;
    this.payload.offset = changePage.offset;
    this.configTable.pagination.page = changePage.actual;
  }

  handleSort(order: OrderTableEvent): void {
    this.payload.order = order.column;
    this.payload.sort = order.desc ? 'desc' : 'asc';

    this.resetTablePagination();
  }

  private resetTablePagination(): void {
    this.configTable.pagination.offset = 0;
    this.configTable.pagination.total = 0;
    this.configTable.pagination.page = 1;

    this.payload.offset = 0;
  }

  private onInit(): void {
    this.smartData();
  }
}
