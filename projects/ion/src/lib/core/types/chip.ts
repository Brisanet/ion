import { EventEmitter } from '@angular/core';
import { BadgeType } from './badge';
import { DropdownItem, DropdownParams } from './dropdown';
import { IconDirection } from './icon';
import { InfoBadgeStatus } from './info-badge';

export interface Badge {
  value: number;
}

export interface RightBadge {
  label: string;
  type: BadgeType;
}

export type ChipSize = 'sm' | 'md';

export interface ChipEvent {
  selected: boolean;
  disabled: boolean;
}

export interface IonChipProps {
  label: string;
  disabled?: boolean;
  selected?: boolean;
  size?: ChipSize;
  events?: EventEmitter<ChipEvent>;
  options?: DropdownItem[];
  icon?: string;
  multiple?: boolean;
  required?: boolean;
  infoBadge?: InfoBadgeStatus;
  iconPosition?: IconDirection;
  rightBadge?: RightBadge;
  dropdownEvents?: EventEmitter<DropdownItem[]>;
  dropdownSearchConfig?: Pick<DropdownParams, 'searchOptions' | 'enableSearch'>;
  dropdownSearchEvents?: EventEmitter<string>;
}
