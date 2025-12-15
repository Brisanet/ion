import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { IonButtonComponent } from '../button/button.component';
import { IonCheckboxComponent } from '../checkbox/checkbox.component';
import { ConfigSmartTable, SmartTableEvent } from '../core/types';
import { PageEvent } from '../core/types/pagination';
import { IonIconComponent } from '../icon/icon.component';
import { IonLinkComponent } from '../link/ion-link.component';
import {
  ITEMS_PER_PAGE_DEFAULT,
  LIST_OF_PAGE_OPTIONS,
} from '../pagination/pagination.component';
import { IonPaginationComponent } from '../pagination/pagination.component';
import { IonPopConfirmDirective } from '../popconfirm/popconfirm.directive';
import { IonPopoverDirective } from '../popover/popover.directive';
import { IonSpinnerComponent } from '../spinner/spinner.component';
import { Column, EventTable, BaseRow } from '../table/utils';
import { IonTagComponent } from '../tag/ion-tag.component';
import { IonThemeService } from '../theme/theme.service';
import { IonTooltipDirective } from '../tooltip/tooltip.directive';
import { BaseTable } from '../utils/baseTable';
import debounce from '../utils/debounce';
import { ReplaceEmptyPipe } from '../utils/pipes/replace-empty/replace-empty.pipe';
import { SafeAny } from '../utils/safe-any';
import {
  TooltipPosition,
  TooltipTrigger,
} from '../core/types/tooltip';
import {
  PopoverPosition,
  PopoverTrigger,
} from '../core/types/popover';

@Component({
  selector: 'ion-smart-table',
  standalone: true,
  imports: [
    CommonModule,
    IonCheckboxComponent,
    IonTagComponent,
    IonPopConfirmDirective,
    IonPopoverDirective,
    IonButtonComponent,
    IonIconComponent,
    IonPaginationComponent,
    IonTooltipDirective,
    IonSpinnerComponent,
    IonLinkComponent,
    ReplaceEmptyPipe,
  ],
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class IonSmartTableComponent<RowType extends BaseRow>
  extends BaseTable<RowType, ConfigSmartTable<RowType>, SmartTableEvent>
  implements OnInit, AfterViewChecked
{
  @Input() override config: ConfigSmartTable<RowType> = undefined!;
  @Output() override events = new EventEmitter<SmartTableEvent>();

  public pagination!: PageEvent;
  public sortWithDebounce: (column: Column) => void = () => {};
  private firstLoad = true;

  public TooltipPosition = TooltipPosition;
  public TooltipTrigger = TooltipTrigger;
  public PopoverPosition = PopoverPosition;
  public PopoverTrigger = PopoverTrigger;

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

    this.config.columns.forEach((columnEach: Column) => {
      if (columnEach.key != column.key) {
        columnEach.desc = undefined;
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
