import { IconType } from './icon';

export type TabSize = 'sm' | 'md' | 'lg';

export type TabDirection = 'bottom' | 'top' | 'right' | 'left';

export interface TabBadge {
  value: number;
}

export interface IonTabProps {
  label: string;
  tabSize?: TabSize;
  disabled?: boolean;
  selected?: boolean;
  direction?: TabDirection;
  iconType?: IconType;
  badge?: TabBadge;
}
