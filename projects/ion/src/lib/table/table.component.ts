import { IonThemeService } from './../theme/theme.service';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { CheckBoxStates } from '../core/types/checkbox';
import { PageEvent } from '../core/types/pagination';
import { TableEvent } from '../core/types/table';
import { LIST_OF_PAGE_OPTIONS } from '../pagination/pagination.component';
import { BaseTable } from '../utils/baseTable';
import { SafeAny } from '../utils/safe-any';
import { Column, ConfigTable } from './utilsTable';

@Component({
  selector: 'ion-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class IonTableComponent<RowType>
  extends BaseTable<RowType, ConfigTable<RowType>, TableEvent>
  implements OnInit, OnChanges
{
  @Input() config: ConfigTable<RowType>;
  @Output() events = new EventEmitter<TableEvent>();

  public mainCheckBoxState: CheckBoxStates = 'enabled';
  public smartData = [];

  constructor(
    private cdr: ChangeDetectorRef,
    protected ionThemeService: IonThemeService
  ) {
    super();
  }

  ngOnChanges(change: SimpleChanges): void {
    if (!change.config.firstChange && change.config.currentValue) {
      this.config.data = change.config.currentValue.data;
      this.smartData = this.config.data;
    }
    if (change.config) {
      this.applyPipes(this.config);
    }
  }

  ngOnInit(): void {
    if (this.config.pagination) {
      const defaultItemsPerPage = 10;

      this.config.pagination.itemsPerPage =
        this.config.pagination.itemsPerPage || defaultItemsPerPage;

      this.config.pagination.page = this.config.pagination.page || 1;

      this.config.pagination.pageSizeOptions =
        this.config.pagination.pageSizeOptions || LIST_OF_PAGE_OPTIONS;

      this.paginationEvents({
        actual: this.config.pagination.page,
        itemsPerPage: this.config.pagination.itemsPerPage,
        offset: this.config.pagination.offset * this.config.pagination.page,
      });

      return;
    }
    this.smartData = this.config.data;
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

    if (this.config.pagination) {
      this.paginationEvents({
        actual: 1,
        itemsPerPage: this.config.pagination.itemsPerPage,
        offset: this.config.pagination.offset,
      });
    }
  }

  public paginationEvents(event: PageEvent): void {
    this.smartData = this.config.data.slice(
      event.offset,
      event.offset + event.itemsPerPage
    );
    this.config.pagination.page = event.actual;

    this.cdr.detectChanges();
  }

  public emitRowsSelected(): void {
    this.events.emit({
      rows_selected: this.getRowsSelected(),
    });
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
