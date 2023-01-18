import { SafeAny } from './../utils/safe-any';
import { IconType } from './../icon/icon.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';

export type IconDirection = 'left' | 'right';
export type InputType = 'text' | 'password';

export interface IonInputProps {
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
})
export class InputComponent {
  @Input() placeholder?: string;
  @Input() button = 'Button';
  @Input() iconInput: IconType;
  @Input() disabled = false;
  @Input() iconDirection?: IconDirection;
  @Input() valid: boolean;
  @Input() invalid: boolean;
  @Input() inputButton? = false;
  @Input() inputIconButton? = false;
  @Input() value = '';
  @Input() inputType: InputType = 'text';
  @Input() clearButton = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() clickButton = new EventEmitter();

  onChange(value: string): void {
    this.valueChange.emit(value);
  }

  public handleClick(): void {
    this.clickButton.emit();
  }

  public clearInput(): void {
    this.value = '';
    this.onChange(this.value);
  }

  public isClearButtonVisible(): boolean {
    return this.clearButton && this.value.length > 0;
  }
}
