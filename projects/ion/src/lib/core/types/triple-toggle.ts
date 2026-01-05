import { EventEmitter } from '@angular/core';
import { SafeAny } from '../../utils/safe-any';
import { Size } from './button';
import { IconType } from './icon';

export type TripleToggleOptionsToRender = [
  TripleToggleOption,
  TripleToggleOption,
  TripleToggleOption,
];

export type TripleToggleOptions = [TripleToggleOption, TripleToggleOption];

export interface TripleToggleOption {
  value: SafeAny;
  label: string;
  tooltip?: string;
  icon?: IconType;
  rightSideIcon?: boolean;
  selected?: boolean;
}

export interface TripleToggleProps {
  value?: SafeAny;
  disabled?: boolean;
  size?: Size;
  options?: TripleToggleOptions;
  onlyShowIcon?: boolean;
  ionClick?: EventEmitter<SafeAny>;
}
