import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeAny } from './../../../utils/safe-any';

export interface IonDatePickerInputComponentProps {
  date?: string;
  placeholder?: string;
  clearDate?: EventEmitter<SafeAny>;
}
@Component({
  selector: 'date-picker-input',
  templateUrl: './date-picker-input.component.html',
  styleUrls: ['./date-picker-input.component.scss'],
})
export class IonDatePickerInputComponent {
  @Input() date?: string;
  @Input() rangePicker?: boolean;
  @Input() placeholder? = 'Selecione a data';
  @Output() clearDate = new EventEmitter();

  public clearButtonConfig = {
    iconType: 'close-solid',
    type: 'secondary',
    size: 'lg',
  };

  clearDateValue(): void {
    this.date = '';
    this.clearDate.emit();
  }
}
