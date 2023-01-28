import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'date-picker-input',
  templateUrl: './date-picker-input.component.html',
  styleUrls: ['./date-picker-input.component.scss'],
})
export class DatePickerInputComponent {
  @Input() date = '';
  @Input() placeholder = 'Selecione a data';
  @Output() clearDate = new EventEmitter();

  clearDateValue(): void {
    this.date = '';
    this.clearDate.emit();
  }
}
