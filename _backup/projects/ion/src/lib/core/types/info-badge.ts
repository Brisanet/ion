import { StatusType } from './status';
import { IconType } from './icon';

export type InfoBadgeStatus = StatusType | 'primary';

export type InfoBadgeSize = 'sm' | 'md';

export interface InfoBadgeProps {
  variant: InfoBadgeStatus;
  icon?: IconType;
  text?: string;
  size?: InfoBadgeSize;
}
