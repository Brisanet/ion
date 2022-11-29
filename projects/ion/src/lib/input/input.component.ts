import { SafeAny } from './../utils/safe-any';
import { IconType } from './../icon/icon.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';

export type IconDirection = 'left' | 'right';

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
  @Input() disabled? = false;
  @Input() iconDirection?: IconDirection;
  @Input() valid: boolean;
  @Input() invalid: boolean;
  @Input() inputButton? = false;
  @Input() inputIconButton? = false;
  @Output() clickButton = new EventEmitter();

  public handleClick(): void {
    this.clickButton.emit();
  }
}
