import { EventEmitter } from '@angular/core';

type FormatDateInput = 'YYYY-MM-DD' | 'DD/MM/YYYY';

export interface IonDatePickerComponentProps {
  format?: string;
  formatInDateInput?: FormatDateInput;
  rangePicker?: boolean;
  disabledDate?: (currentDate: Date) => boolean;
  event?: EventEmitter<string>;
}
