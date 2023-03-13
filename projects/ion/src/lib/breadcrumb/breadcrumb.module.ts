import { IonIconModule } from './../icon/icon.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonBreadcrumbComponent } from './breadcrumb.component';

@NgModule({
  declarations: [IonBreadcrumbComponent],
  imports: [CommonModule, IonIconModule],
  exports: [IonBreadcrumbComponent],
})
export class IonBreadcrumbModule {}
