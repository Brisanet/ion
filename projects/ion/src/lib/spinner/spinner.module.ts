import { NgModule } from '@angular/core';
import { IonSpinnerComponent } from './spinner.component';
import { CommonModule } from '@angular/common';
import { IonSharedModule } from '../shared.module';

@NgModule({
  declarations: [IonSpinnerComponent],
  imports: [CommonModule, IonSharedModule],
  exports: [IonSpinnerComponent],
})
export class IonSpinnerModule {}
