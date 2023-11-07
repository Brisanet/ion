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
  events?: EventEmitter<[Day, Day]>;
}

export const SUNDAY = 'domingo';
export const SATURDAY = 'sábado';
export const INITIAL_RANGE = 0;
export const FINAL_RANGE = 1;
