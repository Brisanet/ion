import { EventEmitter, OutputEmitterRef } from '@angular/core';
import { SafeAny } from '../../utils/safe-any';
import { IconDirection } from './icon';
import { IonButtonProps } from './button';

export type InputSize = 'base' | 'large';
export type InputTheme = 'primary' | 'secondary';
export type InputType = 'text' | 'password' | 'number' | 'email';

export interface IonInputProps {
  size?: InputSize;
  theme?: InputTheme;
  label?: string;
  prefix?: string;
  helperText?: string;
  placeholder?: string;
  button?: string;
  iconInput?: string;
  iconTrailingAriaLabel?: string;
  disabled?: boolean;
  iconDirection?: IconDirection;
  valid?: boolean;
  invalid?: boolean;
  errorMsg?: string;
  inputButton?: boolean;
  clickButton?: OutputEmitterRef<void> | EventEmitter<void>;
  clickIconTrailing?: OutputEmitterRef<void> | EventEmitter<void>;
  inputButtonConfig?: IonButtonProps;
  value?: string;
  clearButton?: boolean;
  readonly?: boolean;
  inputType?: InputType;
  valueChange?: OutputEmitterRef<string> | EventEmitter<string>;
  maxLength?: string | number | null;
}
