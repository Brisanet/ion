import { EventEmitter } from '@angular/core';
import { SafeAny } from '../../utils/safe-any';
import { BadgeProps } from './badge';
import { DropdownItem, DropdownParams } from './dropdown';
import { IconType } from './icon';

export type Type = 'primary' | 'secondary' | 'ghost' | 'dashed';

export type Size = 'sm' | 'md' | 'lg' | 'xl';

export type ButtonBadgeTypes = Pick<BadgeProps, 'type' | 'value'>;

export enum ButtonIconSizeOptions {
  sm = 16,
  md = 20,
  lg = 24,
  xl = 24,
}

export interface IonButtonProps {
  label?: string;
  tooltip?: string;
  type?: Type;
  size?: Size;
  expand?: boolean;
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingMessage?: string;
  multiple?: boolean;
  iconType?: IconType;
  rightSideIcon?: boolean;
  options?: DropdownItem[];
  showDropdown?: boolean;
  showDropdownAbove?: boolean;
  circularButton?: boolean;
  id?: string;
  selected?: EventEmitter<SafeAny>;
  ionOnClick?: EventEmitter<SafeAny>;
  dropdownConfig?: Pick<
    DropdownParams,
    'description' | 'notShowClearButton' | 'required' | 'enableSearch'
  >;
  handleDropdownSearch?: EventEmitter<string>;
}
