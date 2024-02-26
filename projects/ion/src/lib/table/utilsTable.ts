import { TemplateRef } from '@angular/core';

import {
  FontSize,
  IconType,
  PopoverProps,
  StatusType,
  TooltipProps,
} from '../core/types';
import { SafeAny } from '../utils/safe-any';
import { IconSide, LinkTarget } from './../core/types/link';
import { TagStatus } from './../core/types/status';

export enum EventTable {
  SORT = 'sort',
  CHANGE_PAGE = 'change_page',
  ROW_SELECT = 'row_select',
  CELL_SELECT = 'cell_select',
  REFRESH_FILTER = 'refresh_filter',
}

export enum ActionType {
  POPCONFIRM = 'popconfirm',
  POPOVER = 'popover',
}

export enum ColumnType {
  TAG = 'tag',
  TEXT = 'text',
  LINK = 'link',
  BOOLEAN = 'boolean',
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
  booleanText?: ColumnBooleanText;
}

export interface ColumnBooleanText {
  truthy: string;
  falsy: string;
}

export interface ActionConfirm<RowType> {
  title: string;
  description?: string;
  dynamicDescription?: (row: RowType) => string;
  type?: StatusType;
  confirmText?: string;
  cancelText?: string;
}

export type ActionPopover = PopoverProps;

export interface ActionTable<RowType = SafeAny> {
  label: string;
  icon: string;
  disabled?: (row: RowType) => boolean;
  danger?: boolean;
  show?: (row: RowType) => boolean;
  call?: (row: RowType) => void;
  secundCall?: (row: RowType) => void;
  confirm?: ActionConfirm<RowType>;
  tooltipConfig?: TooltipProps;
  showLabel?: boolean;
  rightSideIcon?: boolean;
  popover?: ActionPopover;
}

export interface PaginationConfig {
  total: number;
  itemsPerPage?: number;
  pageSizeOptions?: number[];
  offset?: number;
  page?: number;
  openItemsPerPageAbove?: boolean;
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

export interface BaseRow {
  selected?: boolean;
}
