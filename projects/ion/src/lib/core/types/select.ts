import { EventEmitter } from '@angular/core';
import { DropdownItem } from './dropdown';

export interface IonSelecProps {
  disableVisibilityToggle?: boolean;
  showDropdown?: boolean;
  placeholder?: string;
  options?: DropdownItem[];
  selected?: EventEmitter<DropdownItem>;
}
