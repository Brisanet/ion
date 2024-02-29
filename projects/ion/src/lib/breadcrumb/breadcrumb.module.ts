import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonDropdownModule } from '../dropdown/dropdown.module';
import { IonIconModule } from './../icon/icon.module';
import { IonBreadcrumbComponent } from './breadcrumb.component';

@NgModule({
  declarations: [IonBreadcrumbComponent],
  imports: [CommonModule, IonIconModule, IonDropdownModule],
  exports: [IonBreadcrumbComponent],
})
export class IonBreadcrumbModule {}
