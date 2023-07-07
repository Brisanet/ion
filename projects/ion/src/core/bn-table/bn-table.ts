import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { SafeAny } from '../../lib/utils/safe-any';
import { ConfigSmartTable, SmartTableEvent } from '../../public-api';
import { ConfigTable, EventTable } from '../../lib/table/utilsTable';
import { IPayload, IResponse } from '../api/http.interfaces';
import { LIST_OF_PAGE_OPTIONS } from '../../lib/pagination/pagination.component';

export interface SmartPayload {
  offset: number;
  total: number;
  limit: number;
}

export interface IBnTable<DataType> {
  service: BnService;
  tableConfig: Pick<ConfigTable<DataType>, 'columns' | 'actions'>;
}

export interface BnService<DataType = SafeAny> {
  smartList: (
    filters?: IPayload
  ) => Observable<{ data: DataType[]; total: number }>;
  list: () => SafeAny;
}

export class BnTable<DataType> {
  public message: string;

  protected configTable: ConfigSmartTable<DataType> = {
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

  protected payload: IPayload = {
    total: 0,
    offset: 0,
    limit: this.configTable.pagination.itemsPerPage,
  };

  private service: BnService;

  constructor(config: IBnTable<DataType>) {
    this.service = config.service;

    // set configs
    this.configTable.columns = config.tableConfig.columns;
    this.configTable.actions = config.tableConfig.actions;

    this.onInit();
  }

  smartData(): void {
    this.configTable.loading = true;

    this.service
      .smartList(this.payload)
      .pipe(
        take(1),
        finalize(() => (this.configTable.loading = false))
      )
      .subscribe(
        (response: IResponse<DataType>) => {
          if (response.total && response.total !== null) {
            this.configTable.pagination = {
              ...this.configTable.pagination,
              total: response.total || 0,
            };
          }
          this.configTable.data = response.data;
        },
        (error) => {
          // TODO: add notification service
          // const msg: string = error.msg || error.error.msg;
          // this.notify.error('Erro', msg);
        }
      );
  }

  events(event: SmartTableEvent): void {
    if (event.event === EventTable.CHANGE_PAGE) {
      this.payload.limit = event.change_page.itemsPerPage;

      this.smartData();
    }
  }

  private onInit(): void {
    this.smartData();
  }
}
