import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  IonButtonProps,
  TripleToggleOptions,
  Size,
  SwitchSize,
  CalendarDirection,
} from '../types';
import { PreDefinedRangeConfig } from '../../picker/predefined-range-picker/predefined-range-picker.component';

export type BnFormFieldType =
  | 'text'
  | 'password'
  | 'number'
  | 'email'
  | 'triple-toggle'
  | 'switch'
  | 'datepicker'
  | 'select';

export interface BnBaseFormField {
  key: string;
  label: string;
  type?: BnFormFieldType;
  className?: string;
  initialValue?: any;
  validators?: ValidatorFn[];
  disabled?: boolean;
  required?: boolean;
  description?: string;
  errorMsg?: string;
  onlyShowWhen?: (form: any) => boolean;
}

export interface BnInputFormField extends BnBaseFormField {
  type?: 'text' | 'password' | 'number' | 'email';
  placeholder?: string;
  readonly?: boolean;
  maxLength?: number;
  clearButton?: boolean;
  iconInput?: string;
  iconDirection?: 'left' | 'right';
  inputButton?: boolean;
  inputButtonConfig?: IonButtonProps;
  onClickButton?: (value: any) => void;
}

export interface BnTripleToggleFormField extends BnBaseFormField {
  type: 'triple-toggle';
  options: TripleToggleOptions;
  size?: Size;
  onlyShowIcon?: boolean;
  onIonClick?: (value: any) => void;
}

export interface BnSwitchFormField extends BnBaseFormField {
  type: 'switch';
  size?: SwitchSize;
  atValueChange?: (value: boolean) => void;
}

export interface BnDatePickerFormField extends BnBaseFormField {
  type: 'datepicker';
  format?: string;
  formatInDateInput?: 'YYYY-MM-DD' | 'DD/MM/YYYY';
  rangePicker?: boolean;
  direction?: CalendarDirection;
  disabledDate?: (currentDate: Date) => boolean;
  predefinedRanges?: PreDefinedRangeConfig[];
  onEvent?: (dates: string[]) => void;
}

export interface BnSelectFormField extends BnBaseFormField {
  type: 'select';
  options: any[];
  placeholder?: string;
  multiple?: boolean;
  enableSearch?: boolean;
  propValue?: string;
  propLabel?: string;
  loading?: boolean;
  refresh?: {
    use: (field: BnSelectFormField, search?: string) => Observable<any[]>;
    debounceTime?: number;
  };
}

export type BnFormField =
  | BnInputFormField
  | BnTripleToggleFormField
  | BnSwitchFormField
  | BnDatePickerFormField
  | BnSelectFormField;

export interface BnFormConfig {
  fields: BnFormField[];
}
