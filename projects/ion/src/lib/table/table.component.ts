import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeAny } from '../utils/safe-any';

interface TagRow {
  icon?: string;
  iconKey?: string;
}
export interface Column {
  label: string;
  key: string;
  sort?: boolean;
  type?: 'tag' | 'text';
  tag?: TagRow;
}

export interface ActionTable {
  label: string;
  icon: string;
  show?: (row: SafeAny) => boolean;
  call?: (row: SafeAny) => void;
}

interface TableEvent {
  rows_selected: SafeAny[];
}

export interface ConfigTable {
  data: SafeAny[];
  columns: Column[];
  actions?: ActionTable[];
  check?: boolean;
}

export interface IonTableProps {
  config: ConfigTable;
  events?: EventEmitter<TableEvent>;
}

@Component({
  selector: 'ion-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() config: ConfigTable;
  @Output() events = new EventEmitter<TableEvent>();

  private getRowsSelected(): SafeAny[] {
    return this.config.data.filter((rowInData) => rowInData.selected);
  }

  private hasRowSelected(): boolean {
    return this.getRowsSelected().length > 0;
  }

  private emitRowsSelected() {
    this.events.emit({
      rows_selected: this.getRowsSelected(),
    });
  }

  private selectAllLike(selected: boolean) {
    this.config.data.forEach((row) => {
      row.selected = selected;
    });
  }

  checkRow(row: SafeAny) {
    row.selected = !row.selected;
    this.emitRowsSelected();
  }

  toggleAllRows() {
    this.selectAllLike(!this.hasRowSelected());
    this.emitRowsSelected();
  }

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
