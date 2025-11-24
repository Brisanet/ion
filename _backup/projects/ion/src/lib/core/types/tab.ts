import { IconType } from './icon';

export type TabSize = 'sm' | 'md' | 'lg';

type Direction = 'bottom' | 'top' | 'right' | 'left';

interface BadgeOptions {
  value: number;
}

export interface IonTabProps {
  label: string;
  tabSize?: TabSize;
  disabled?: boolean;
  selected?: boolean;
  direction?: Direction;
  iconType?: IconType;
  badge?: BadgeOptions;
}
