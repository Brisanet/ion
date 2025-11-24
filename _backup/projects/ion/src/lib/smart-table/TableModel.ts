import { SmartTableEvent } from '../core/types';

export interface TableModel {
  paginationEvents: (event: SmartTableEvent) => void;
}
