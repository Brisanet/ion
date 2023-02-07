import { EventEmitter } from '@angular/core';
import { InfoBadgeStatus } from './info-badge';
import { BadgeType } from './badge';
import { DropdownItem, DropdownParams } from './dropdown';

export interface Badge {
  value: number;
}

export interface RightBadge {
  label: string;
  type: BadgeType;
}

export type ChipSize = 'sm' | 'md';

export type IconDirection = 'right' | 'left';

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
  infoBadge?: InfoBadgeStatus;
  iconPosition?: IconDirection;
  rightBadge?: RightBadge;
  dropdownEvents?: EventEmitter<DropdownItem[]>;
  dropdownSearchConfig?: Pick<DropdownParams, 'searchOptions' | 'enableSearch'>;
  dropdownSearchEvents?: EventEmitter<string>;
}
