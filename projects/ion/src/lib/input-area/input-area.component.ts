/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ion-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IonInputAreaComponent,
      multi: true,
    },
  ],
})
export class IonInputAreaComponent implements ControlValueAccessor {
  @Input() key!: string;
  @Input() cols = '30';
  @Input() rows = '5';
  @Input() disabled = false;
  @Input() value: string;
  @Input() placeholder?: string;
  @Output() valueChange = new EventEmitter<string>();

  onTouch = () => {};

  onChange = (value: string) => {};

  writeValue(value: string): void {
    this.onChange(value);
    this.valueChange.emit(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
