import { EventEmitter } from '@angular/core';
import { fadeInDirection, fadeOutDirection } from '../../utils/animationsTypes';
import { IconType } from './icon';
import { StatusType } from './status';

export interface NotificationProps extends NotificationConfigOptions {
  title: string;
  message: string;
  type?: StatusType;
}

export interface NotificationConfigOptions {
  icon?: IconType;
  fixed?: boolean;
  fadeIn?: fadeInDirection;
  fadeOut?: fadeOutDirection;
  ionOnClose?: EventEmitter<void>;
  pauseOnHover?: boolean;
}

export interface NotificationServiceConfig {
  maxStack?: number;
}
