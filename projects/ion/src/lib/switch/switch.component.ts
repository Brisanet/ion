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
      useExisting: SwitchComponent,
      multi: true,
    },
  ],
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() key!: string;
  @Input() value = false;
  @Output() atValueChange = new EventEmitter<boolean>();

  onTouch = () => {};

  onChange = (value: boolean) => {};

  writeValue(value: boolean): void {
    this.onChange(value);
    this.value = !this.value;
    this.atValueChange.emit(this.value);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(disabled: boolean): void {
    // this.disabled = disabled;
  }
}
