import { ValidatorFn } from '@angular/forms';
import { IonButtonProps, TripleToggleOptions, Size, SwitchSize, CalendarDirection, PreDefinedRangeConfig, DropdownItem } from 'ion';

export type BnFormFieldType = 'text' | 'password' | 'number' | 'email' | 'triple-toggle' | 'switch' | 'datepicker' | 'select';

export interface BnBaseFormField {
  key: string;
  label: string;
  type?: BnFormFieldType;
  className?: string;
  initialValue?: any;
  validators?: ValidatorFn[];
  disabled?: boolean;
  required?: boolean;
  errorMsg?: string;
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
  options: DropdownItem[];
  placeholder?: string;
  multiple?: boolean;
  enableSearch?: boolean;
  propValue?: string;
}

export type BnFormField = BnInputFormField | BnTripleToggleFormField | BnSwitchFormField | BnDatePickerFormField | BnSelectFormField;

export interface BnFormConfig {
  fields: BnFormField[];
}
