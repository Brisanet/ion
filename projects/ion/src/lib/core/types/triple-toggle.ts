import { EventEmitter } from '@angular/core';
import { SafeAny } from '../../utils/safe-any';
import { Size } from './button';
import { IconType } from './icon';

export interface TripleToggleSetting {
  value: SafeAny;
  label: string;
  tooltip?: string;
  icon?: IconType;
  selected?: boolean;
}

export interface TripleToggleProps {
  value?: SafeAny;
  disabled?: boolean;
  size?: Size;
  configuration?: TripleToggleSetting[];
  ionClick?: EventEmitter<SafeAny>;
}
