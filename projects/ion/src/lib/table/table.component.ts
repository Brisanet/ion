import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckBoxStates } from '../core/types/checkbox';
import { PageEvent } from '../core/types/pagination';
import { SafeAny } from '../utils/safe-any';
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
export class IonTableComponent implements OnInit {
  @Input() config: ConfigTable<SafeAny>;
  @Output() events = new EventEmitter<TableEvent>();

  public mainCheckBoxState: CheckBoxStates = 'enabled';
  public smartData = [];
  private tableUtils: TableUtils;

  ngOnInit(): void {
    this.tableUtils = new TableUtils(this.config);
    if (this.config.pagination) {
      const defaultItemsPerPage = 10;

      this.config.pagination.itemsPerPage =
        this.config.pagination.itemsPerPage || defaultItemsPerPage;

      this.smartData = this.config.data.slice(
        this.config.pagination.offset,
        this.config.pagination.itemsPerPage
      );
      return;
    }
    this.smartData = this.config.data;
  }

  public checkState(): void {
    if (this.mainCheckBoxState === 'indeterminate') {
      this.uncheckAllRows();

      return;
    }
    this.toggleAllRows();
  }

  public uncheckAllRows(): void {
    this.config.data.forEach((row) => (row.selected = false));
    this.setMainCheckboxState('enabled');
  }

  public checkRow(row: SafeAny): void {
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

  public toggleAllRows(): void {
    this.selectAllLike(!this.tableUtils.hasRowSelected());
    this.emitRowsSelected();
  }

  public fillColor(column: Column, upArrow: boolean): string {
    return this.tableUtils.fillColor(column, upArrow);
  }

  public sort(column: Column): void {
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

  public handleEvent(row: SafeAny, action: ActionTable): void {
    if (action.call) {
      action.call(row);
    }
  }

  public showAction(row: SafeAny, action: ActionTable): boolean {
    return action.show(row);
  }

  public paginationEvents(event: PageEvent): void {
    this.smartData = this.config.data.slice(
      event.offset,
      event.offset + event.itemsPerPage
    );
  }

  private setMainCheckboxState(state: CheckBoxStates): void {
    this.mainCheckBoxState = state;
  }

  private emitRowsSelected(): void {
    this.events.emit({
      rows_selected: this.tableUtils.getRowsSelected(),
    });
  }

  private selectAllLike(selected: boolean): void {
    this.config.data.forEach((row) => {
      row.selected = selected;
    });

    this.setMainCheckboxState(stateChange[this.mainCheckBoxState]);
  }

  private orderDesc(itemA, itemB): number {
    return itemA > itemB ? -1 : itemA > itemB ? 1 : 0;
  }

  private orderAsc(itemA, itemB): number {
    return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
  }

  private orderBy(
    desc: boolean,
    rowA: SafeAny,
    rowB: SafeAny,
    key: string
  ): number {
    if (desc) {
      return this.orderDesc(rowA[key], rowB[key]);
    }
    return this.orderAsc(rowA[key], rowB[key]);
  }
}
