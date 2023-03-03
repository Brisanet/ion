/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ion-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IonSwitchComponent,
      multi: true,
    },
  ],
})
export class IonSwitchComponent implements ControlValueAccessor {
  @Input() key!: string;
  @Input() value = false;
  @Input() disabled = false;
  @Output() atValueChange = new EventEmitter<boolean>();

  onTouch = () => {};

  onChange = (value: boolean) => {};

  writeValue(value: boolean): void {
    this.value = value;
    this.onTouch();
    this.onChange(value);
    this.atValueChange.emit(value);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
