import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonNoDataComponent } from './no-data.component';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [IonNoDataComponent],
})
export class IonNoDataModule {}
