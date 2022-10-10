import { StatusType } from './status';

export enum IconSizeOptions {
  sm = 8,
  md = 12,
}

export enum FixIconSizeOptions {
  sm = 14,
  md = 20,
}

export type InfoBadgeStatus = StatusType | 'primary';
export type InfoBadgeSize = 'sm' | 'md';
