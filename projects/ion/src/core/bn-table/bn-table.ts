import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LIST_OF_PAGE_OPTIONS } from '../../lib/pagination/pagination.component';
import { ConfigTable, EventTable } from '../../lib/table/utilsTable';
import { SafeAny } from '../../lib/utils/safe-any';
import { ConfigSmartTable, SmartTableEvent } from '../../public-api';
import { IPayload, IResponse } from '../api/http.interfaces';

export interface SmartPayload {
  offset?: number;
  total?: boolean;
  limit?: number;
}

export interface IBnTable<DataType> {
  service: BnService;
  tableConfig: Pick<ConfigTable<DataType>, 'columns' | 'actions'>;
}

export interface BnService<DataType = SafeAny> {
  list: (filters?: IPayload) => Observable<IResponse<DataType>>;
}

export default class BnTable<DataType> {
  public message: string;

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

    // TODO: make function to get and not duplicated this list code
    if (this.payload.total) {
      this.service
        .list(this.payload)
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
          },
          (error) => {
            // TODO: add notification service
            // const msg: string = error.msg || error.error.msg;
            // this.notify.error('Erro', msg);
          }
        );
    }

    const notTotal = JSON.parse(JSON.stringify(this.payload));
    if (notTotal.total) {
      delete notTotal.total;
    }

    this.service
      .list({ ...notTotal })
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
          if (response.dados) {
            this.configTable.data = response.dados;
          }
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
