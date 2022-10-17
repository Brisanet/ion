import { CheckBoxStates } from './../checkbox/checkbox.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeAny } from '../utils/safe-any';
import { PageEvent } from '../pagination/pagination.component';
import { ActionTable, Column, ConfigTable } from '../table/table.component';

interface TableEvent {
  rows_selected?: SafeAny[];
  change_page?: PageEvent;
}

const stateChange = {
  checked: 'enabled',
  enabled: 'checked',
};

@Component({
  selector: 'ion-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {
  @Input() config: ConfigTable<SafeAny>;
  @Output() events = new EventEmitter<TableEvent>();

  private disabledArrowColor = '#CED2DB';
  private enabledArrowColor = '#0858CE';

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

  public isAllRowsSelected() {
    return this.getRowsSelected().length === this.config.data.length;
  }

  public uncheckAllRows() {
    this.config.data.forEach((row) => (row.selected = false));
    this.setMainCheckboxState('enabled');
  }

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

    this.setMainCheckboxState(stateChange[this.mainCheckBoxState]);
  }

  checkRow(row: SafeAny) {
    row.selected = !row.selected;

    if (this.isAllRowsSelected()) {
      this.setMainCheckboxState('checked');
    } else if (this.hasRowSelected()) {
      this.setMainCheckboxState('indeterminate');
    } else {
      this.setMainCheckboxState('enabled');
    }

    this.emitRowsSelected();
  }

  toggleAllRows() {
    this.selectAllLike(!this.hasRowSelected());
    this.emitRowsSelected();
  }

  // refactor
  private orderDesc(itemA, itemB) {
    return itemA > itemB ? -1 : itemA > itemB ? 1 : 0;
  }

  // refactor
  private orderAsc(itemA, itemB) {
    return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
  }

  // refactor
  private orderBy(desc: boolean, rowA: SafeAny, rowB: SafeAny, key: string) {
    if (desc) {
      return this.orderDesc(rowA[key], rowB[key]);
    }
    return this.orderAsc(rowA[key], rowB[key]);
  }

  public fillColorArrowUp(column: Column) {
    return column.desc ? this.disabledArrowColor : this.enabledArrowColor;
  }

  public fillColorArrowDown(column: Column) {
    return column.desc ? this.enabledArrowColor : this.disabledArrowColor;
  }

  public fillColor(column: Column, upArrow: boolean) {
    if (column.desc === null || column.desc === undefined) {
      return this.disabledArrowColor;
    }

    return upArrow
      ? this.fillColorArrowUp(column)
      : this.fillColorArrowDown(column);
  }

  // refactor
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

  // refactor - emit event
  paginationEvents(event: PageEvent) {
    if (!this.config.loading) {
      console.log('event ->', event);
      this.events.emit({
        change_page: event,
      });
    }
  }
}
