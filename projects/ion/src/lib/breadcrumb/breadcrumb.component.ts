import { Component, Input } from '@angular/core';
import { BreadcrumbItem } from '../core/types/breadcrumb';

@Component({
  selector: 'ion-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class IonBreadcrumbComponent {
  @Input() breadcrumbs: Array<BreadcrumbItem>;
}
