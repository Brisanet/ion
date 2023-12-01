import { EventEmitter, TemplateRef } from '@angular/core';
import { CurrencyPipeStrategy } from '../../core/pipes/currency.pipe';
import { DatePipeStrategy } from '../../core/pipes/date.pipe';
import { PipeApplicator, PipeStrategy } from '../../core/pipes/pipe-strategy';
import { ReplaceEmptyPipeStrategy } from '../../core/pipes/replace-empty.pipe';
import {
  CheckBoxStates,
  FontSize,
  IconType,
  PageEvent,
  StatusType,
  TooltipProps,
} from '../core/types';
import { SafeAny } from '../utils/safe-any';
import { TagStatus } from './../core/types/status';
import { IconSide, LinkTarget } from './../core/types/link';

export enum EventTable {
  SORT = 'sort',
  CHANGE_PAGE = 'change_page',
  ROW_SELECT = 'row_select',
  CELL_SELECT = 'cell_select',
  REFRESH_FILTER = 'refresh_filter',
}

export enum ColumnType {
  TAG = 'tag',
  TEXT = 'text',
  LINK = 'link',
}

interface TagRow {
  icon?: string;
  iconKey?: string;
  status?: TagStatus;
  statusKey?: string;
  tooltipKey?: string;
}

interface LinkRow<RowType> {
  label?: (_: RowType) => string;
  icon?: IconType;
  iconSide?: IconSide;
  size?: FontSize;
  bold?: boolean;
  disabled?: (_: RowType) => boolean;
  target?: LinkTarget;
  url?: (_: RowType) => string;
  action?: (_: RowType) => void;
}

export interface PipeColumn {
  apply: string;
  format?: string;
}

export interface Column<RowType = SafeAny> {
  label: string;
  key: string;
  sort?: boolean;
  type?: ColumnType;
  tag?: TagRow;
  link?: LinkRow<RowType>;
  desc?: boolean;
  width?: number;
  actions?: ColumnActions;
  configTooltip?: TooltipProps;
  pipe?: PipeColumn;
  hideLongData?: boolean;
}

export interface ActionConfirm<RowType> {
  title: string;
  description?: string;
  dynamicDescription?: (row: RowType) => string;
  type?: StatusType;
  confirmText?: string;
  cancelText?: string;
}

export interface ActionTable<RowType> {
  label: string;
  icon: string;
  disabled?: (row: RowType) => boolean;
  danger?: boolean;
  show?: (row: RowType) => boolean;
  call?: (row: RowType) => void;
  confirm?: ActionConfirm<RowType>;
  tooltipConfig?: TooltipProps;
}

export interface PaginationConfig {
  total: number;
  itemsPerPage?: number;
  pageSizeOptions?: number[];
  offset?: number;
  page?: number;
}

export interface ConfigTable<RowType> {
  data: RowType[];
  columns: Column<RowType>[];
  actions?: ActionTable<RowType>[];
  check?: boolean;
  pagination?: PaginationConfig;
  loading?: boolean;
  order?: {
    column: string;
    desc: boolean | undefined;
  };
  customRowTemplate?: TemplateRef<HTMLElement>;
}

export interface ColumnActions {
  trigger: 'click';
}

const stateChange = {
  checked: 'enabled',
  enabled: 'checked',
};

export interface BaseRow {
  selected?: boolean;
}

export abstract class BaseTable<
  RowType extends BaseRow,
  ConfigType extends ConfigTable<RowType>,
  EventType
> {
  public config: ConfigType;
  public events: EventEmitter<EventType>;
  public mainCheckBoxState: CheckBoxStates = 'enabled';

  private disabledArrowColor = '#CED2DB';
  private enabledArrowColor = '#0858CE';

  public abstract sort(column: Column): void;

  public abstract paginationEvents(event: PageEvent): void;

  public abstract emitRowsSelected(): void;

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

  public checkRow(row: RowType): void {
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

  public toggleAllRows(): void {
    this.selectAllLike(!this.hasRowSelected());
    this.emitRowsSelected();
  }

  public hasRowSelected(): boolean {
    return this.getRowsSelected().length > 0;
  }

  public isAllRowsSelected(): boolean {
    return this.getRowsSelected().length === this.config.data.length;
  }

  public getRowsSelected(): RowType[] {
    return this.config.data.filter((rowInData: RowType) => rowInData.selected);
  }

  public fillColor(column: Column, upArrow: boolean): string {
    if (column.desc === null || column.desc === undefined) {
      return this.disabledArrowColor;
    }

    return upArrow
      ? this.fillColorArrowUp(column)
      : this.fillColorArrowDown(column);
  }

  public fillColorArrowUp(column: Column): string {
    return column.desc ? this.disabledArrowColor : this.enabledArrowColor;
  }

  public fillColorArrowDown(column: Column): string {
    return column.desc ? this.enabledArrowColor : this.disabledArrowColor;
  }

  public handleEvent(row: RowType, action: ActionTable<RowType>): void {
    if (action.call) {
      action.call(row);
    }
  }

  public showAction(row: RowType, action: ActionTable<RowType>): boolean {
    return action.show(row);
  }

  public disableAction(row: RowType, action: ActionTable<RowType>): boolean {
    return action.disabled(row);
  }

  public applyPipes(config: ConfigType): void {
    this.config = config;
    this.config.columns.forEach((column) => {
      if (column.pipe) {
        const strategy = this.getPipeStrategy(column.pipe.apply);

        this.config.data.forEach((row) => {
          const rowValue = row[column.key];
          row[column.key] = this.applyPipe(
            rowValue,
            column.pipe.format,
            strategy
          );
        });
      }
    });
  }

  private getPipeStrategy(pipeType: string): PipeStrategy {
    switch (pipeType) {
      case 'date':
        return new DatePipeStrategy();
      case 'currency':
        return new CurrencyPipeStrategy();
      default:
        return new ReplaceEmptyPipeStrategy();
    }
  }

  private applyPipe(
    value: string | number,
    format: string,
    strategy: PipeStrategy
  ): string {
    const applicator = new PipeApplicator(strategy);
    return applicator.apply(value, format);
  }

  private setMainCheckboxState(state: CheckBoxStates): void {
    this.mainCheckBoxState = state;
  }

  private selectAllLike(selected: boolean): void {
    this.config.data.forEach((row) => {
      row.selected = selected;
    });

    this.setMainCheckboxState(stateChange[this.mainCheckBoxState]);
  }
}

// export class TableUtils<T = SafeAny> {
//   private config: ConfigTable<T> | ConfigSmartTable<T>;
//   private disabledArrowColor = '#CED2DB';
//   private enabledArrowColor = '#0858CE';

//   constructor(config: ConfigTable<T> | ConfigSmartTable<T>) {
//     this.config = config;
//     this.applyPipes(config);
//   }

//   public hasRowSelected(): boolean {
//     return this.getRowsSelected().length > 0;
//   }

//   public isAllRowsSelected(): boolean {
//     return this.getRowsSelected().length === this.config.data.length;
//   }

//   public getRowsSelected(): SafeAny[] {
//     return this.config.data.filter((rowInData: SafeAny) => rowInData.selected);
//   }

//   public fillColorArrowUp(column: Column): string {
//     return column.desc ? this.disabledArrowColor : this.enabledArrowColor;
//   }

//   public fillColorArrowDown(column: Column): string {
//     return column.desc ? this.enabledArrowColor : this.disabledArrowColor;
//   }

//   public fillColor(column: Column, upArrow: boolean): string {
//     if (column.desc === null || column.desc === undefined) {
//       return this.disabledArrowColor;
//     }

//     return upArrow
//       ? this.fillColorArrowUp(column)
//       : this.fillColorArrowDown(column);
//   }

//   public applyPipes(config: ConfigTable<T> | ConfigSmartTable<T>): void {
//     this.config = config;
//     this.config.columns.forEach((column) => {
//       if (column.pipe) {
//         const strategy = this.getPipeStrategy(column.pipe.apply);

//         this.config.data.forEach((row) => {
//           const rowValue = row[column.key];
//           row[column.key] = this.applyPipe(
//             rowValue,
//             column.pipe.format,
//             strategy
//           );
//         });
//       }
//     });
//   }

//   private getPipeStrategy(pipeType: string): PipeStrategy {
//     switch (pipeType) {
//       case 'date':
//         return new DatePipeStrategy();
//       case 'currency':
//         return new CurrencyPipeStrategy();
//       default:
//         return new ReplaceEmptyPipeStrategy();
//     }
//   }

//   private applyPipe(
//     value: string | number,
//     format: string,
//     strategy: PipeStrategy
//   ): string {
//     const applicator = new PipeApplicator(strategy);
//     return applicator.apply(value, format);
//   }
// }
