import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  link: string;
  selected?: boolean;
}

export interface BreadcrumbProps {
  breadcrumbItems: BreadcrumbItem[];
  selectedBread: EventEmitter<BreadcrumbItem>;
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
    this.breadcrumbs.forEach((element) => {
      element.selected = false;
    });
    item.selected = true;
    this.selectedBread.emit(item);
  }
}
