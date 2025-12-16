import { EventEmitter } from '@angular/core';
import { Day } from './day';

export type UpdateLabelCalendar = {
  month: string;
  year: string;
};

export type CalendarControlActions =
  | 'previousYear'
  | 'previousMonth'
  | 'nextMonth'
  | 'nextYear';

export interface IonDatePickerCalendarComponentProps {
  currentDate?: string[];
  lang?: string;
  goToMonthInCalendar?: string;
  goToYearInCalendar?: string;
  calendarControlAction?: CalendarControlActions;
  rangePicker?: boolean;
  disabledDate?: (currentDate: Date) => boolean;
  events?: EventEmitter<[Day, Day]>;
}

