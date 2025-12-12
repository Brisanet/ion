import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  computed,
  effect,
  input,
  output,
  EventEmitter,
} from '@angular/core';
import { IonCheckboxComponent } from '../checkbox/checkbox.component';
import { IonTagComponent } from '../tag/ion-tag.component';
import { IonButtonComponent } from '../button/button.component';
import { IonIconComponent } from '../icon/icon.component';
import { IonPaginationComponent } from '../pagination/pagination.component';
import { IonSpinnerComponent } from '../spinner/spinner.component';
import { IonLinkComponent } from '../link/ion-link.component';
import { IonTooltipDirective } from '../tooltip/tooltip.directive';
import { BaseTable } from '../utils/baseTable';
import { CheckBoxStates } from '../core/types';
import { PageEvent } from '../core/types/pagination';
import { TableEvent } from '../core/types/table';
import { ConfigTable, Column, BaseRow } from './utils';
import { LIST_OF_PAGE_OPTIONS } from '../pagination/pagination.component';
import { IonThemeService } from '../theme/theme.service';
import { SafeAny } from '../utils/safe-any';

@Component({
  selector: 'ion-table',
  standalone: true,
  imports: [
    CommonModule,
    IonCheckboxComponent,
    IonTagComponent,
    IonButtonComponent,
    IonIconComponent,
    IonPaginationComponent,
    IonSpinnerComponent,
    IonLinkComponent,
    IonTooltipDirective,
  ],
  templateUrl: './ion-table.component.html',
  styleUrls: ['./ion-table.component.scss'],
})
export class IonTableComponent<RowType extends BaseRow>
  extends BaseTable<RowType, ConfigTable<RowType>, TableEvent>
  implements OnInit
{
  configInput = input.required<ConfigTable<RowType>>({ alias: 'config' });
  override events = new EventEmitter<TableEvent>();

  public smartData: RowType[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    protected ionThemeService: IonThemeService
  ) {
    super();
    effect(() => {
      const config = this.configInput();
      if (config) {
        this.config = config;
        this.smartData = config.data;
        this.applyPipes(config);
        if (config.pagination) {
          this.paginationEvents({
            actual: config.pagination.page || 1,
            itemsPerPage: config.pagination.itemsPerPage || 10,
            offset: (config.pagination.offset || 0) * (config.pagination.page || 1),
          });
        }
      }
    });
  }

  ngOnInit(): void {
    // Logic moved to effect or handled by initial config
  }

  public sort(column: Column): void {
    this.config.data.sort((rowA, rowB) =>
      this.orderBy(column.desc, rowA, rowB, column.key)
    );
    this.config.columns.forEach((columnEach) => {
      if (columnEach.key != column.key) {
        columnEach.desc = undefined;
      }
    });
    column.desc = !column.desc;

    if (this.config.pagination) {
      this.paginationEvents({
        actual: 1,
        itemsPerPage: this.config.pagination.itemsPerPage || 10,
        offset: this.config.pagination.offset || 0,
      });
    }
  }

  public paginationEvents(event: PageEvent): void {
    if (this.config.pagination) {
      this.smartData = this.config.data.slice(
        event.offset,
        event.offset + event.itemsPerPage
      );
      this.config.pagination.page = event.actual;
      this.cdr.detectChanges();
    }
  }

  public emitRowsSelected(): void {
    this.events.emit({
      rows_selected: this.getRowsSelected(),
    });
  }

  private orderDesc(itemA: SafeAny, itemB: SafeAny): number {
    return itemA > itemB ? -1 : itemA > itemB ? 1 : 0;
  }

  private orderAsc(itemA: SafeAny, itemB: SafeAny): number {
    return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
  }

  private orderBy(
    desc: boolean | undefined,
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
