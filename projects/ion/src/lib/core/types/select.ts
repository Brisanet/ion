import { EventEmitter } from '@angular/core';
import { DropdownItem } from './dropdown';

export interface IonSelectProps {
  disableVisibilityToggle?: boolean;
  showDropdown?: boolean;
  placeholder?: string;
  options?: DropdownItem[];
  selected?: EventEmitter<DropdownItem>;
}
