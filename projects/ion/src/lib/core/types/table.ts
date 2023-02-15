import { EventEmitter } from '@angular/core';
import { ConfigTable } from '../../table/utilsTable';
import { SafeAny } from '../../utils/safe-any';

export interface TableEvent {
  rows_selected: SafeAny[];
}

export interface IonTableProps<T> {
  config: ConfigTable<T>;
  events?: EventEmitter<TableEvent>;
}
