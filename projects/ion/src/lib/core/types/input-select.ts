import { EventEmitter } from '@angular/core';
import { DropdownItem } from './dropdown';

export type ValueToEmmit = {
  optionSelected: SelectOption;
  inputValue: string;
  secondValue?: string;
};

export interface SelectOption extends DropdownItem {
  multiple?: boolean;
  firstPlaceholder?: string;
  secondPlaceholder?: string;
}

export interface IonInputSelectProps {
  name: string;
  value?: string;
  secondValue?: string;
  disabled?: boolean;
  selectOptions?: SelectOption[];
  singlePlaceholder?: string;
  firstPlaceholder?: string;
  secondPlaceholder?: string;
  valueChange?: EventEmitter<ValueToEmmit>;
}
