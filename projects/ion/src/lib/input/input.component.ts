/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconType } from './../icon/icon.component';
import { SafeAny } from './../utils/safe-any';

export type IconDirection = 'left' | 'right';
export type InputType = 'text' | 'password';

export interface IonInputProps {
  key?: string;
  placeholder?: string;
  button?: string;
  iconInput?: string;
  disabled?: boolean;
  iconDirection?: IconDirection;
  valid?: boolean;
  invalid?: boolean;
  inputButton?: boolean;
  inputIconButton?: boolean;
  clickButton?: EventEmitter<SafeAny>;
  value?: string;
  clearButton?: boolean;
  inputType?: InputType;
  valueChange?: EventEmitter<string>;
}

@Component({
  selector: 'ion-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() key = '';
  @Input() placeholder?: string;
  @Input() button = 'Button';
  @Input() iconInput: IconType;
  @Input() disabled = false;
  @Input() iconDirection?: IconDirection = 'left';
  @Input() valid: boolean;
  @Input() invalid: boolean;
  @Input() inputButton? = false;
  @Input() inputIconButton? = false;
  @Input() value = '';
  @Input() inputType: InputType = 'text';
  @Input() clearButton = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() clickButton = new EventEmitter();

  onTouch = () => {};
  onChange = (value: string) => {};

  setValue(value: string): void {
    this.writeValue(value);
    this.onTouch();
  }

  public handleClick(): void {
    this.clickButton.emit();
  }

  // Allow Angular to set the value on the component
  writeValue(value: string): void {
    this.onChange(value);
    this.valueChange.emit(value);
    this.value = value;
  }

  // Save a reference to the change function passed to us by
  // the Angular form control
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // Save a reference to the touched function passed to us by
  // the Angular form control
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  // Allow the Angular form control to disable this input
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  public clearInput(): void {
    this.writeValue('');
  }

  public isClearButtonVisible(): boolean {
    return this.clearButton && this.value.length > 0;
  }
}
