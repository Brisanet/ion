import { EventEmitter } from '@angular/core';

type DateEvent = {
  date: string;
};

type FormatDateInput = 'YYYY-MM-DD' | 'DD/MM/YYYY';

export interface IonDatePickerComponentProps {
  format?: string;
  formatInDateInput?: FormatDateInput;
  event?: EventEmitter<DateEvent>;
}
