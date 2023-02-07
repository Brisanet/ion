import { EventTable } from '../../table/utilsTable';
import { SafeAny } from '../../utils/safe-any';
import { PageEvent } from './pagination';

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
