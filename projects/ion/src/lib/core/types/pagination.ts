import { EventEmitter } from '@angular/core';

export interface Page {
  page_number: number;
  selected: boolean;
}

export interface PageEvent {
  actual: number;
  itemsPerPage: number;
  offset: number;
}

export interface IonPaginationProps {
  total: number;
  itemsPerPage?: number;
  size?: string;
  events?: EventEmitter<PageEvent>;
  allowChangeQtdItems?: boolean;
  loading?: boolean;
  page?: number;
  openItemsPerPageAbove?: boolean;
  pageSizeOptions?: number[];
}
