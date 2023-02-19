import { IonDividerModule } from './../../divider/divider.module';
import { IonInputModule } from './../../input/input.module';
import { IonIconModule } from './../../icon/icon.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonTooltipModule } from './../../tooltip/tooltip.module';
import { IonButtonModule } from './../../button/button.module';
import { IonDatepickerComponent } from './date-picker.component';
import { ControlPickerComponent } from '../control-picker/control-picker.component';
import { DatePickerCalendarComponent } from './date-picker-calendar/date-picker-calendar.component';
import { DatePickerInputComponent } from './date-picker-input/date-picker-input.component';

@NgModule({
  declarations: [
    IonDatepickerComponent,
    ControlPickerComponent,
    DatePickerInputComponent,
    DatePickerCalendarComponent,
  ],
  imports: [
    CommonModule,
    IonButtonModule,
    IonDividerModule,
    IonInputModule,
    IonIconModule,
    IonTooltipModule,
  ],
  exports: [IonDatepickerComponent],
})
export class IonDatePickerModule {}
