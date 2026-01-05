import { ChipSize, RightBadge } from './chip';
import { IconDirection, IconType } from './icon';
import { InfoBadgeStatus } from './info-badge';
import { DropdownItem } from './dropdown';

export interface ChipInGroup {
  label: string;
  icon?: IconType;
  selected?: boolean;
  options?: DropdownItem[];
  disabled?: boolean;
  multiple?: boolean;
  size?: ChipSize;
  infoBadge?: InfoBadgeStatus;
  iconPosition?: IconDirection;
  rightBadge?: RightBadge;
}

export interface ChipGroupProps {
  chips: ChipInGroup[];
  disabled?: boolean;
  size?: ChipSize;
  multiple?: boolean;
  events?: {
    emit?: (data: ChipInGroup) => void;
  };
  selected?: {
    emit?: (data: ChipInGroup) => void;
  };
  dropdown?: {
    emit?: (data: DropdownItem[]) => void;
  };
  required?: boolean;
}
