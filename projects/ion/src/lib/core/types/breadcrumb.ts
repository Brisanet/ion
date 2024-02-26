import { EventEmitter } from '@angular/core';

export interface BreadcrumbProps {
  breadcrumbItems: BreadcrumbItem[];
  truncate?: boolean;
  selected: EventEmitter<BreadcrumbItem>;
}

export interface BreadcrumbItem {
  label: string;
  link: string;
}
