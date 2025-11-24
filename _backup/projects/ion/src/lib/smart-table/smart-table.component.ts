import { IonThemeService } from './../theme/theme.service';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ConfigSmartTable, SmartTableEvent } from '../core/types';
import { CheckBoxStates } from '../core/types/checkbox';
import { PageEvent } from '../core/types/pagination';
import {
  ITEMS_PER_PAGE_DEFAULT,
  LIST_OF_PAGE_OPTIONS,
} from '../pagination/pagination.component';
import { Column, EventTable } from '../table/utilsTable';
import { BaseTable } from '../utils/baseTable';
import debounce from '../utils/debounce';
import { SafeAny } from '../utils/safe-any';

@Component({
  selector: 'ion-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['../table/table.component.scss'],
})
export class IonSmartTableComponent<RowType>
  extends BaseTable<RowType, ConfigSmartTable<RowType>, SmartTableEvent>
  implements OnInit, AfterViewChecked, OnChanges
{
  @Input() config: ConfigSmartTable<RowType>;
  @Output() events = new EventEmitter<SmartTableEvent>();

  public mainCheckBoxState: CheckBoxStates = 'enabled';
  public pagination!: PageEvent;
  public sortWithDebounce: (column: Column) => void;
  private firstLoad = true;

  constructor(
    private cdr: ChangeDetectorRef,
    protected ionThemeService: IonThemeService
  ) {
    super();
  }

  ngOnInit(): void {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.applyPipes(this.config);
    }
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  public sort(column: Column): void {
    if (this.config.loading) {
      return;
    }
    column.desc = !column.desc;

    this.config.order = {
      column: column.key,
      desc: column.desc,
    };
    this.events.emit({
      event: EventTable.SORT,
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

  public cellEvents(row: RowType, column: Column, cell: SafeAny): void {
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

  public emitRowsSelected(): void {
    this.events.emit({
      event: EventTable.ROW_SELECT,
      change_page: this.pagination,
      rows_selected: this.getRowsSelected(),
    });
  }
}
