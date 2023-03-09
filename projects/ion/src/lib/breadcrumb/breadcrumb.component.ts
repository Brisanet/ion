import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  link: string;
}

export interface BreadcrumbProps {
  breadcrumbItems: BreadcrumbItem[];
  selected: EventEmitter<BreadcrumbItem>;
}

@Component({
  selector: 'ion-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class IonBreadcrumbComponent {
  @Input() breadcrumbs: Array<BreadcrumbItem>;
  @Output() selected = new EventEmitter<BreadcrumbItem>();

  onSelected(item: BreadcrumbItem): void {
    if (item !== this.breadcrumbs[this.breadcrumbs.length - 1]) {
      this.selected.emit(item);
    }
  }
}
