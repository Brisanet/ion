import { EventEmitter } from '@angular/core';
import { DropdownItem } from './dropdown';

export interface IonSelectProps {
  showToggle?: boolean;
  showDropdown?: boolean;
  placeholder?: string;
  options?: DropdownItem[];
  selected?: EventEmitter<DropdownItem>;
}
