import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonDatePickerComponent } from './date-picker.component';
import { FormsModule } from '@angular/forms';
import { IonButtonModule } from '../../button/button.module';
import { IonIconModule } from '../../icon/icon.module';

@NgModule({
  declarations: [IonDatePickerComponent],
  imports: [CommonModule, FormsModule, IonButtonModule, IonIconModule],
  exports: [IonDatePickerComponent],
})
export class IonDatePickerModule {}
