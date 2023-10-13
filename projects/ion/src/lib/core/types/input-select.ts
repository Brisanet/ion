import { EventEmitter } from '@angular/core';
import { DropdownItem } from './dropdown';

export type ValueToEmmit = {
  optionSelected: SelectOption;
  firstValue: string;
  secondValue?: string;
};

export interface SelectOption extends DropdownItem {
  multiple?: boolean;
  firstPlaceholder?: string;
  secondPlaceholder?: string;
}

export interface IonInputSelectProps {
  name: string;
  disabled?: boolean;
  value?: string;
  secondValue?: string;
  selectOptions?: SelectOption[];
  valueChange?: EventEmitter<ValueToEmmit>;
}
