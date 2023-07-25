import {
  EventTable,
  PaginationConfig,
  ConfigTable,
} from '../../table/utilsTable';
import { SafeAny } from '../../utils/safe-any';
import { PageEvent } from './pagination';
import { EventEmitter } from '@angular/core';
import { TooltipProps } from './tooltip';

export interface SmartTableEvent {
  event: EventTable;
  rows_selected?: SafeAny[];
  change_page?: PageEvent;
  order?: {
    column: string;
    desc: boolean;
  };
  data?: SafeAny;
}

export interface IonSmartTableProps<T> {
  config: ConfigSmartTable<T>;
  events?: EventEmitter<SmartTableEvent>;
}

export interface ConfigSmartTable<T> extends ConfigTable<T> {
  pagination: PaginationConfig;
  debounceOnSort?: number;
  tooltipConfig?: TooltipProps;
  hideLongData?: boolean;
  cellTooltipConfig?: Partial<TooltipProps>;
}
