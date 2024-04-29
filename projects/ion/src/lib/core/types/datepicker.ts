import { EventEmitter } from '@angular/core';

type FormatDateInput = 'YYYY-MM-DD' | 'DD/MM/YYYY';

export enum CalendarDirection {
  up = 'UP',
  down = 'DOWN',
}

export interface IonDatePickerComponentProps {
  format?: string;
  formatInDateInput?: FormatDateInput;
  rangePicker?: boolean;
  direction?: CalendarDirection;
  disabledDate?: (currentDate: Date) => boolean;
  event?: EventEmitter<string>;
}
