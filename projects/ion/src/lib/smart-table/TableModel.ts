import { TableEvent } from './smart-table.component';

export interface TableModel {
  paginationEvents: (event: TableEvent) => void;
}
