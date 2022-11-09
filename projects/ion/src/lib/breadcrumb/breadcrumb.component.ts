/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';

export interface BreadCrumbProps {
  label: string;
  link: string;
}

@Component({
  selector: 'ion-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input() breadcrumbs: Array<BreadCrumbProps>;
}
