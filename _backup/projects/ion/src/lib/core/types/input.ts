import { EventEmitter } from '@angular/core';
import { SafeAny } from '../../utils/safe-any';
import { IconDirection } from './icon';
import { IonButtonProps } from './button';

export type InputType = 'text' | 'password' | 'number' | 'email';

export interface IonInputProps {
  placeholder?: string;
  button?: string;
  iconInput?: string;
  disabled?: boolean;
  iconDirection?: IconDirection;
  valid?: boolean;
  invalid?: boolean;
  inputButton?: boolean;
  clickButton?: EventEmitter<SafeAny>;
  inputButtonConfig?: IonButtonProps;
  value?: string;
  clearButton?: boolean;
  readonly?: boolean;
  inputType?: InputType;
  valueChange?: EventEmitter<string>;
  maxLength?: string | number | null;
}
