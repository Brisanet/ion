import { IonDividerModule } from './../../divider/divider.module';
import { IonInputModule } from './../../input/input.module';
import { IonIconModule } from './../../icon/icon.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonTooltipModule } from './../../tooltip/tooltip.module';
import { IonButtonModule } from './../../button/button.module';
import { IonDatepickerComponent } from './date-picker.component';
import { IonControlPickerComponent } from '../control-picker/control-picker.component';
import { IonDatePickerCalendarComponent } from './date-picker-calendar/date-picker-calendar.component';
import { IonDatePickerInputComponent } from './date-picker-input/date-picker-input.component';
import { IonPredefinedRangePickerComponent } from '../predefined-range-picker/predefined-range-picker.component';
import { IonChipModule } from '../../chip/chip.module';

@NgModule({
  declarations: [
    IonDatepickerComponent,
    IonControlPickerComponent,
    IonDatePickerInputComponent,
    IonDatePickerCalendarComponent,
    IonPredefinedRangePickerComponent,
  ],
  imports: [
    CommonModule,
    IonButtonModule,
    IonDividerModule,
    IonInputModule,
    IonIconModule,
    IonTooltipModule,
    IonChipModule,
  ],
  exports: [IonDatepickerComponent],
})
export class IonDatePickerModule {}
