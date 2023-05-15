import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigSmartTable, SmartTableEvent } from '../core/types';
import { CheckBoxStates } from '../core/types/checkbox';
import { PageEvent } from '../core/types/pagination';
import {
  ITEMS_PER_PAGE_DEFAULT,
  LIST_OF_PAGE_OPTIONS,
} from '../pagination/pagination.component';
import {
  ActionTable,
  Column,
  EventTable,
  TableUtils,
} from '../table/utilsTable';
import debounce from '../utils/debounce';
import { SafeAny } from '../utils/safe-any';

const stateChange = {
  checked: 'enabled',
  enabled: 'checked',
};

@Component({
  selector: 'ion-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['../table/table.component.scss'],
})
export class IonSmartTableComponent implements OnInit {
  @Input() config: ConfigSmartTable<SafeAny>;
  @Output() events = new EventEmitter<SmartTableEvent>();

  public mainCheckBoxState: CheckBoxStates = 'enabled';
  public pagination!: PageEvent;
  public sortWithDebounce: (column: Column) => void;

  private firstLoad = true;
  private tableUtils: TableUtils;

  ngOnInit(): void {
    this.tableUtils = new TableUtils(this.config);
    if (!this.config.pagination.itemsPerPage) {
      this.config.pagination.itemsPerPage = ITEMS_PER_PAGE_DEFAULT;
    }
    if (!this.config.pagination.pageSizeOptions) {
      this.config.pagination.pageSizeOptions = LIST_OF_PAGE_OPTIONS;
    }
    if (this.config.debounceOnSort) {
      this.sortWithDebounce = debounce((column: Column) => {
        this.sort(column);
      }, this.config.debounceOnSort);
    }
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
    this.config.order = {
      column: column.key,
      desc: column.desc,
    };
    this.events.emit({
      event: EventTable.SORT,
      change_page: this.pagination,
      order: {
        column: column.key,
        desc: !!column.desc,
      },
    });

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

  public disableAction(row: SafeAny, action: ActionTable): boolean {
    return action.disabled(row);
  }

  public paginationEvents(event: PageEvent): void {
    this.pagination = event;
    if (!this.config.loading && !this.firstLoad) {
      this.events.emit({
        event: EventTable.CHANGE_PAGE,
        change_page: event,
      });
    }
    this.firstLoad = false;
  }

  public cellEvents(row: SafeAny, column: Column, cell: SafeAny): void {
    this.events.emit({
      event: EventTable.CELL_SELECT,
      change_page: this.pagination,
      data: {
        selected_row: row,
        cell_data: {
          value: cell,
          column: column.key,
        },
      },
    });
  }

  private setMainCheckboxState(state: CheckBoxStates): void {
    this.mainCheckBoxState = state;
  }

  private emitRowsSelected(): void {
    this.events.emit({
      event: EventTable.ROW_SELECT,
      change_page: this.pagination,
      rows_selected: this.tableUtils.getRowsSelected(),
    });
  }

  private selectAllLike(selected: boolean): void {
    this.config.data.forEach((row) => {
      row.selected = selected;
    });

    this.setMainCheckboxState(stateChange[this.mainCheckBoxState]);
  }
}
