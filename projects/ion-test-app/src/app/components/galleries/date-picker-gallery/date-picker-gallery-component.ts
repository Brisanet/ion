import { Component } from '@angular/core';
import {
  CalendarDirection,
  IonDatepickerComponent,
  PreDefinedRangeConfig,
} from 'ion';

@Component({
  selector: 'app-date-picker-gallery',
  standalone: true,
  imports: [IonDatepickerComponent],
  templateUrl: './date-picker-gallery-component.html',
  styleUrls: ['./date-picker-gallery-component.scss'],
})
export class DatePickerGalleryComponent {
  CalendarDirection = CalendarDirection;
  datePickerValue: string[] = [];
  dateRangePickerValue: string[] = [];
  datePickerWithPredefinedValue: string[] = [];

  predefinedRanges: PreDefinedRangeConfig[] = [
    { label: 'Últimos 7 dias', duration: 'P7D', isFuture: false },
    { label: 'Últimos 30 dias', duration: 'P30D', isFuture: false },
    { label: 'Últimos 90 dias', duration: 'P90D', isFuture: false },
    { label: 'Próximos 7 dias', duration: 'P7D', isFuture: true },
    { label: 'Próximos 30 dias', duration: 'P30D', isFuture: true },
  ];

  handleDatePickerChange(dates: string[]): void {
    console.log('Date selected:', dates);
    this.datePickerValue = dates;
  }

  handleDateRangePickerChange(dates: string[]): void {
    console.log('Date range selected:', dates);
    this.dateRangePickerValue = dates;
  }

  handleDatePickerWithPredefinedChange(dates: string[]): void {
    console.log('Date range with predefined selected:', dates);
    this.datePickerWithPredefinedValue = dates;
  }

  disabledDateExample = (currentDate: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return currentDate < today;
  };
}