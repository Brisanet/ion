import { EventEmitter } from '@angular/core';
import { DropdownItem } from './dropdown';

type Mode = 'default' | 'multiple';

export interface IonSelectProps {
  mode?: Mode;
  placeholder?: string;
  options?: DropdownItem[];
  events?: EventEmitter<DropdownItem[]>;
  maxSelected?: number;
  search?: EventEmitter<string>;
  required?: boolean;
  loading?: boolean;
  propLabel?: string;
  disabled?: boolean;
}

export interface IonSelectItemProps {
  label: string;
  disabled?: boolean;
  unselect?: EventEmitter<void>;
}
