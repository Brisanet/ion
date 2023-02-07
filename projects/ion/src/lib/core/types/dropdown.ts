import { EventEmitter } from '@angular/core';
import { IonInputProps } from './input';

export interface DropdownItem {
  label: string;
  key?: string;
  selected?: boolean;
  disabled?: boolean;
  hovered?: boolean;
}

export interface DropdownParams {
  options: DropdownItem[];
  selected: EventEmitter<DropdownItem[]>;
  multiple?: boolean;
  enableSearch?: boolean;
  searchOptions?: IonInputProps;
  searchChange?: EventEmitter<string>;
}
