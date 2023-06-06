import { EventEmitter } from '@angular/core';
import { DropdownItem } from './dropdown';

type Mode = 'default' | 'multiple';

export interface IonSelectProps {
  mode?: Mode;
  placeholder?: string;
  options?: DropdownItem[];
  events?: EventEmitter<DropdownItem[]>;
  maxSelecteds?: number;
}

export interface IonSelectItemProps {
  label: string;
  unselect?: EventEmitter<void>;
}
