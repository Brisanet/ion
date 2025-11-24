import { EventEmitter } from '@angular/core';

export interface IonInputAreaProps {
  cols?: string;
  rows?: string;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  valueChange?: EventEmitter<string>;
}
