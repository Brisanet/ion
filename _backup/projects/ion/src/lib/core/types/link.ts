import { EventEmitter } from '@angular/core';
import { IconType } from './icon';

export type FontSize = 'sm' | 'md';

export type IconSide = 'left' | 'right';

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export interface IonLinkProps {
  label?: string;
  icon?: IconType;
  iconSide?: IconSide;
  size?: FontSize;
  bold?: boolean;
  disabled?: boolean;
  target?: LinkTarget;
  link?: string;
  ionOnClick?: EventEmitter<void>;
}
