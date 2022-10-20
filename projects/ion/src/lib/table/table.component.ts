import { CheckBoxStates } from './../checkbox/checkbox.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeAny } from '../utils/safe-any';
import { PageEvent } from '../pagination/pagination.component';
import { ActionTable, Column, ConfigTable, TableUtils } from './utilsTable';

interface TableEvent {
  rows_selected: SafeAny[];
}

export interface IonTableProps<T> {
  config: ConfigTable<T>;
  events?: EventEmitter<TableEvent>;
}

const stateChange = {
  checked: 'enabled',
  enabled: 'checked',
};

@Component({
  selector: 'ion-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() config: ConfigTable<SafeAny>;
  @Output() events = new EventEmitter<TableEvent>();

  private tableUtils: TableUtils;
  public mainCheckBoxState: CheckBoxStates = 'enabled';
  public smartData = [];

  public checkState() {
    if (this.mainCheckBoxState === 'indeterminate') {
      this.uncheckAllRows();

      return;
    }
    this.toggleAllRows();
  }

  private setMainCheckboxState(state: CheckBoxStates): void {
    this.mainCheckBoxState = state;
  }

  public uncheckAllRows() {
    this.config.data.forEach((row) => (row.selected = false));
    this.setMainCheckboxState('enabled');
  }

  private emitRowsSelected() {
    this.events.emit({
      rows_selected: this.tableUtils.getRowsSelected(),
    });
  }

  private selectAllLike(selected: boolean) {
    this.config.data.forEach((row) => {
      row.selected = selected;
    });

    this.setMainCheckboxState(stateChange[this.mainCheckBoxState]);
  }

  checkRow(row: SafeAny) {
    row.selected = !row.selected;

    if (this.tableUtils.isAllRowsSelected()) {
      this.setMainCheckboxState('checked');
    } else if (this.tableUtils.hasRowSelected()) {
      this.setMainCheckboxState('indeterminate');
    } else {
      this.setMainCheckboxState('enabled');
    }

    this.emitRowsSelected();
  }

  toggleAllRows() {
    this.selectAllLike(!this.tableUtils.hasRowSelected());
    this.emitRowsSelected();
  }

  private orderDesc(itemA, itemB) {
    return itemA > itemB ? -1 : itemA > itemB ? 1 : 0;
  }

  private orderAsc(itemA, itemB) {
    return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
  }

  private orderBy(desc: boolean, rowA: SafeAny, rowB: SafeAny, key: string) {
    if (desc) {
      return this.orderDesc(rowA[key], rowB[key]);
    }
    return this.orderAsc(rowA[key], rowB[key]);
  }

  public fillColor(column: Column, upArrow: boolean) {
    return this.tableUtils.fillColor(column, upArrow);
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

  paginationEvents(event: PageEvent) {
    this.smartData = this.config.data.slice(
      event.offset,
      event.offset + event.itemsPerPage
    );
  }

  ngOnInit() {
    this.tableUtils = new TableUtils(this.config);
    if (this.config.pagination) {
      const defaultItemsPerPage = 10;
      this.config.pagination.itemsPerPage = defaultItemsPerPage;

      this.smartData = this.config.data.slice(
        this.config.pagination.offset,
        this.config.pagination.itemsPerPage
      );
      return;
    }
    this.smartData = this.config.data;
  }
}
