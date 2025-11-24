import { NgModule } from '@angular/core';
import { IonSpinnerComponent } from './spinner.component';
import { CommonModule } from '@angular/common';
import { IonSharedModule } from '../shared.module';

@NgModule({
  imports: [CommonModule, IonSharedModule],
  exports: [IonSpinnerComponent],
})
export class IonSpinnerModule {}
