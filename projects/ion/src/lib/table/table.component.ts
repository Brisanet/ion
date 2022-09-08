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
  desc?: boolean;
  width?: number;
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
  public colorUp?: string = '#CED2DB';
  public colorDown?: string = '#CED2DB';

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

  private orderBy(desc: boolean, rowA: SafeAny, rowB: SafeAny, key: string) {
    if (desc) {
      return rowA[key] > rowB[key] ? -1 : rowA[key] > rowB[key] ? 1 : 0;
    }
    return rowA[key] < rowB[key] ? -1 : rowA[key] > rowB[key] ? 1 : 0;
  }

  public fillColor(column: Column, up: boolean) {
    if (column.desc == null) {
      return '#CED2DB';
    }
    if (up) {
      return column.desc ? '#CED2DB' : '#0858CE';
    }
    if (!up) {
      return column.desc ? '#0858CE' : '#CED2DB';
    }
  }

  sort(column: Column) {
    this.config.data.sort((rowA, rowB) =>
      this.orderBy(column.desc, rowA, rowB, column.key)
    );
    this.config.columns.forEach((columnEach) => {
      if (columnEach.key != column.key) {
        columnEach.desc = null;
      }
    });
    column.desc = !column.desc;
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
