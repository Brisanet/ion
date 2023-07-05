import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { SafeAny } from '../../lib/utils/safe-any';
import { ConfigSmartTable } from '../../public-api';
import { ConfigTable } from '../../lib/table/utilsTable';
import { IResponse } from '../api/http.interfaces';

export interface IBnTable<DataType> {
  service: BnService;
  tableConfig: Pick<ConfigTable<DataType>, 'columns' | 'actions'>;
}

export interface BnService<DataType = SafeAny> {
  smartList: (
    filters?: SafeAny
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
      itemsPerPage: 10,
      pageSizeOptions: [],
    },
    loading: false,
  };

  private service: BnService;
  private PAGE_SIZE_OPTIONS = [10, 15, 30];

  constructor(config: IBnTable<DataType>) {
    this.service = config.service;

    // Config defaults values to table
    this.configTable.pagination.pageSizeOptions = this.PAGE_SIZE_OPTIONS;
    this.configTable.pagination.itemsPerPage = this.PAGE_SIZE_OPTIONS[0];

    // set columns
    this.configTable.columns = config.tableConfig.columns;

    this.onInit();
  }

  smartData(): void {
    this.configTable.loading = true;

    this.service
      .smartList()
      .pipe(
        take(1),
        finalize(() => (this.configTable.loading = false))
      )
      .subscribe(
        (response: IResponse<DataType>) => {
          this.configTable.data = response.data;
          this.configTable.pagination.total = response.total;
        }
        // (error) => {
        //   const msg: string = error.msg || error.error.msg;
        //   this.notify.error('Erro', msg);
        // },
      );
  }

  private onInit(): void {
    this.smartData();
  }
}
