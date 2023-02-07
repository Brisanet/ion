import { IonInputProps } from '../../input/input.component';
import { EventEmitter } from '@angular/core';

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
