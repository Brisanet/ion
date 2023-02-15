import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  link: string;
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
export class IonBreadcrumbComponent {
  @Input() breadcrumbs: Array<BreadcrumbItem>;
  @Output() selectedBread = new EventEmitter<BreadcrumbItem>();

  onSelectedBread(item: BreadcrumbItem) {
    this.selectedBread.emit(item);
  }
}
