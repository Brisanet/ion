import { EventEmitter } from '@angular/core';
import { SafeAny } from '../../utils/safe-any';
import { Size } from './button';
import { IconType } from './icon';

export interface TripleToggleOption {
  value: SafeAny;
  label?: string;
  tooltip?: string;
  icon?: IconType;
  rightSideIcon?: boolean;
  selected?: boolean;
}

export interface TripleToggleProps {
  value?: SafeAny;
  disabled?: boolean;
  size?: Size;
  options?: [TripleToggleOption, TripleToggleOption, TripleToggleOption];
  ionClick?: EventEmitter<SafeAny>;
}
