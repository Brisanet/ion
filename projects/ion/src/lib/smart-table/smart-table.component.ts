import { CheckBoxStates } from './../checkbox/checkbox.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeAny } from '../utils/safe-any';
import { PageEvent } from '../pagination/pagination.component';
import { ActionTable, Column, ConfigTable } from '../table/table.component';

export interface TableEvent {
  event?: 'sort' | 'change_page' | 'row_select';
  rows_selected?: SafeAny[];
  change_page?: PageEvent;
  order?: {
    column: string;
    desc: boolean;
  };
}

const stateChange = {
  checked: 'enabled',
  enabled: 'checked',
};

@Component({
  selector: 'ion-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['../table/table.component.scss'],
})
export class SmartTableComponent {
  @Input() config: ConfigTable<SafeAny>;
  @Output() events = new EventEmitter<TableEvent>();

  private disabledArrowColor = '#CED2DB';
  private enabledArrowColor = '#0858CE';

  public mainCheckBoxState: CheckBoxStates = 'enabled';
  private firstLoad = true;
  public pagination!: PageEvent;

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
      event: 'row_select',
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

  sort(column: Column) {
    this.events.emit({
      event: 'sort',
      change_page: this.pagination,
      order: {
        column: column.key,
        desc: column.desc,
      },
    });

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
    this.pagination = event;
    if (!this.config.loading && !this.firstLoad) {
      this.events.emit({
        event: 'change_page',
        change_page: event,
      });
    }
    this.firstLoad = false;
  }
}
