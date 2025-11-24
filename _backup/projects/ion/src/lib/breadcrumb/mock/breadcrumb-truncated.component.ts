import { Component } from '@angular/core';

import { BreadcrumbProps } from '../breadcrumb.component';

@Component({
  template: `
    <div>
      <ion-breadcrumb
        [truncate]="args.truncate"
        [breadcrumbs]="args.breadcrumbs"
      ></ion-breadcrumb>
    </div>
  `,
  styles: [],
})
export class BreadcrumbTruncatedComponent {
  public args: Partial<BreadcrumbProps> = {
    truncate: true,
    breadcrumbs: Array.from({ length: 10 }, (_, index) => ({
      label: `Titulo ${index}`,
      link: `/titulo${index}`,
    })),
  };
}
