import { Observable, forkJoin, of } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LIST_OF_PAGE_OPTIONS } from '../../lib/pagination/pagination.component';
import { ConfigTable, EventTable } from '../../lib/table/utilsTable';
import {
  ConfigSmartTable,
  OrderTableEvent,
  PageEvent,
  SmartTableEvent,
} from '../../public-api';
import { IPayload, IResponse } from '../api/http.interfaces';
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
}

export interface BnService<DataType> {
  list: (filters?: IPayload) => Observable<IResponse<DataType>>;
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

  constructor(config: IBnTable<DataType>) {
    this.service = config.service;

    // set configs
    this.configTable.columns = config.tableConfig.columns;
    this.configTable.actions = config.tableConfig.actions;

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

    const totalRequest$ = this.payload.total
      ? this.service.list(this.payload).pipe(
          take(1),
          finalize(() => (this.configTable.loading = false))
        )
      : of(null);

    const dataRequest$ = this.service
      .list({ ...this.payload, total: false })
      .pipe(
        take(1),
        finalize(() => (this.configTable.loading = false))
      );

    forkJoin([totalRequest$, dataRequest$]).subscribe(
      (response) => {
        const totalResponse: IResponse<DataType> = response[0];
        const dataResponse: IResponse<DataType> = response[1];

        if (totalResponse && totalResponse.total !== null) {
          this.configTable.pagination = {
            ...this.configTable.pagination,
            total: totalResponse.total || 0,
          };
        }

        this.configTable.data = dataResponse.dados || dataResponse.data || [];
      },
      (error) => {
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
    };

    const handler = eventHandlers[event.event];
    if (handler) {
      handler();
    }

    this.smartData();
  }

  handlePageChange(changePage: PageEvent): void {
    this.payload.limit = changePage.itemsPerPage;
    this.payload.offset = changePage.offset;
  }

  handleSort(order: OrderTableEvent): void {
    this.payload.order = order.column;
    this.payload.sort = order.desc ? 'desc' : 'asc';

    this.resetTablePagination();
  }

  private resetTablePagination(): void {
    this.configTable.pagination.offset = 0;
    this.configTable.pagination.total = 0;
    this.payload.offset = 0;
  }

  private onInit(): void {
    this.smartData();
  }
}
