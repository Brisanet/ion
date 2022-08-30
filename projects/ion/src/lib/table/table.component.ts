import { Component, Input } from '@angular/core';
import { SafeAny } from '../utils/safe-any';

export interface Column {
  label: string;
  key: string;
  sort?: boolean;
}

export interface ActionTable {
  label: string;
  icon: string;
  show?: (row: SafeAny) => boolean;
  call?: (row: SafeAny) => void;
}

export interface ConfigTable {
  data: SafeAny[];
  columns: Column[];
  actions?: ActionTable[];
  check?: boolean;
}

export interface IonTableProps {
  config: ConfigTable;
}

@Component({
  selector: 'ion-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() config: ConfigTable;

  sort(key: string) {
    this.config.data.sort((rowA, rowB) =>
      rowA[key] < rowB[key] ? -1 : rowA[key] > rowB[key] ? 1 : 0
    );
  }

  handleEvent(row: SafeAny, action: ActionTable) {
    if (action.call) {
      action.call(row);
    }
  }

  showAction(row: SafeAny, action: ActionTable) {
    return action.show(row);
  }
}
