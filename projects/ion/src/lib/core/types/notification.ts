import { EventEmitter } from '@angular/core';
import { fadeInDirection, fadeOutDirection } from '../../utils/animationsTypes';
import { IconType } from './icon';
import { StatusType } from './status';

export interface NotificationProps {
  title: string;
  message: string;
  type?: StatusType;
  icon?: IconType;
  fixed?: boolean;
  fadeIn?: fadeInDirection;
  fadeOut?: fadeOutDirection;
  ionOnClose?: EventEmitter<void>;
}
