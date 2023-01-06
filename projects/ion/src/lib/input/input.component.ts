import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconType } from './../icon/icon.component';
import { SafeAny } from './../utils/safe-any';

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
  @Input() iconDirection?: IconDirection = 'left';
  @Input() valid: boolean;
  @Input() invalid: boolean;
  @Input() inputButton? = false;
  @Input() inputIconButton? = false;
  @Input() value = '';
  @Input() inputType: InputType = 'text';
  @Output() valueChange = new EventEmitter<string>();
  @Output() clickButton = new EventEmitter();

  onChange(value: string): void {
    this.valueChange.emit(value);
  }

  public handleClick(): void {
    this.clickButton.emit();
  }
}
