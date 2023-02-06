import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ITEMS_PER_PAGE_DEFAULT,
  PageEvent,
} from '../pagination/pagination.component';
import {
  ActionTable,
  Column,
  ConfigTable,
  EventTable,
  PaginationConfig,
  TableUtils,
} from '../table/utilsTable';
import { SafeAny } from '../utils/safe-any';
import { CheckBoxStates } from '../core/types/checkbox';

export interface TableEvent {
  event: EventTable;
  rows_selected?: SafeAny[];
  change_page?: PageEvent;
  order?: {
    column: string;
    desc: boolean;
  };
  data?: SafeAny;
}

const stateChange = {
  checked: 'enabled',
  enabled: 'checked',
};

export interface IonSmartTableProps<T> {
  config: ConfigSmartTable<T>;
  events?: EventEmitter<TableEvent>;
}

export interface ConfigSmartTable<T> extends ConfigTable<T> {
  pagination: PaginationConfig;
}

@Component({
  selector: 'ion-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['../table/table.component.scss'],
})
export class IonSmartTableComponent implements OnInit {
  @Input() config: ConfigSmartTable<SafeAny>;
  @Output() events = new EventEmitter<TableEvent>();

  public mainCheckBoxState: CheckBoxStates = 'enabled';
  public pagination!: PageEvent;

  private firstLoad = true;
  private tableUtils: TableUtils;

  ngOnInit(): void {
    this.tableUtils = new TableUtils(this.config);
    if (!this.config.pagination.itemsPerPage) {
      this.config.pagination.itemsPerPage = ITEMS_PER_PAGE_DEFAULT;
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

  public paginationEvents(event: PageEvent): void {
    this.pagination = event;
    this.config.pagination.page = this.pagination.actual;
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
