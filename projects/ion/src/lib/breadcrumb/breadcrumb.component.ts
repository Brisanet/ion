import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SafeAny } from '../utils/safe-any';

export interface BreadcrumbItem {
  label: string;
  link: string;
}

export interface BreadcrumbProps {
  BreadcrumbItem: BreadcrumbItem;
  selected: EventEmitter<BreadcrumbItem>;
}

@Component({
  selector: 'ion-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input() breadcrumbs: Array<BreadcrumbItem>;
  @Output() selectedBread = new EventEmitter<BreadcrumbItem>();

  onSelectedBread(item: BreadcrumbItem) {
    this.selectedBread.emit(item);
  }
}
