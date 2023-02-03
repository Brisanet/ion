import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonDatePickerComponent } from './date-picker.component';
import { FormsModule } from '@angular/forms';
import { IonSharedModule } from '../../shared.module';

@NgModule({
  declarations: [IonDatePickerComponent],
  imports: [CommonModule, FormsModule, IonSharedModule],
  exports: [IonDatePickerComponent],
})
export class IonDatePickerModule {}
