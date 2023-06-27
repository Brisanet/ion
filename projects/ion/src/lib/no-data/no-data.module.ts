import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonNoDataComponent } from './no-data.component';
import { IonSharedModule } from '../shared.module';

@NgModule({
  imports: [CommonModule, IonSharedModule],
  exports: [IonNoDataComponent],
})
export class IonNoDataModule {}
