import { TagStatus } from './../core/types/status';
import { ConfigSmartTable, StatusType, TooltipProps } from '../core/types';
import { SafeAny } from '../utils/safe-any';
import { TemplateRef } from '@angular/core';

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
}

interface TagRow {
  icon?: string;
  iconKey?: string;
  status?: TagStatus;
  statusKey?: string;
  tooltipKey?: string;
}
export interface Column {
  label: string;
  key: string;
  sort?: boolean;
  type?: ColumnType;
  tag?: TagRow;
  desc?: boolean;
  width?: number;
  actions?: ColumnActions;
  configTooltip?: TooltipProps;
}

export interface ActionConfirm {
  title: string;
  description?: string;
  dynamicDescription?: (row: SafeAny) => string;
  type?: StatusType;
  confirmText?: string;
  cancelText?: string;
}

export interface ActionTable {
  label: string;
  icon: string;
  disabled?: (row: SafeAny) => boolean;
  danger?: boolean;
  show?: (row: SafeAny) => boolean;
  call?: (row: SafeAny) => void;
  confirm?: ActionConfirm;
  tooltipConfig?: TooltipProps;
}

export interface PaginationConfig {
  total: number;
  itemsPerPage?: number;
  pageSizeOptions?: number[];
  offset?: number;
  page?: number;
}

export interface ConfigTable<T> {
  data: T[];
  columns: Column[];
  actions?: ActionTable[];
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

export class TableUtils<T = SafeAny> {
  private config: ConfigTable<T> | ConfigSmartTable<T>;
  private disabledArrowColor = '#CED2DB';
  private enabledArrowColor = '#0858CE';

  constructor(config: ConfigTable<T> | ConfigSmartTable<T>) {
    this.config = config;
  }

  public hasRowSelected(): boolean {
    return this.getRowsSelected().length > 0;
  }

  public isAllRowsSelected(): boolean {
    return this.getRowsSelected().length === this.config.data.length;
  }

  public getRowsSelected(): SafeAny[] {
    return this.config.data.filter((rowInData: SafeAny) => rowInData.selected);
  }

  public fillColorArrowUp(column: Column): string {
    return column.desc ? this.disabledArrowColor : this.enabledArrowColor;
  }

  public fillColorArrowDown(column: Column): string {
    return column.desc ? this.enabledArrowColor : this.disabledArrowColor;
  }

  public fillColor(column: Column, upArrow: boolean): string {
    if (column.desc === null || column.desc === undefined) {
      return this.disabledArrowColor;
    }

    return upArrow
      ? this.fillColorArrowUp(column)
      : this.fillColorArrowDown(column);
  }
}
