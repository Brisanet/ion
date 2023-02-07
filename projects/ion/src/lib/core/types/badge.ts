import { IconType } from './icon';

export type BadgeType = 'primary' | 'secondary' | 'neutral' | 'negative';

export interface BadgeProps {
  label?: string;
  value?: number;
  icon?: IconType;
  type: BadgeType;
}
