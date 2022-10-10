import { StatusType } from './status';

export enum IconSizeOptions {
  sm = 8,
  md = 12,
}

export type InfoBadgeStatus = StatusType | 'primary';
export type InfoBadgeSize = 'sm' | 'md';
