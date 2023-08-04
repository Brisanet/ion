import { TemplateRef } from '@angular/core';
import { IonButtonProps } from './button';
import { IconType } from './icon';

export enum PopoverPosition {
  TOP_RIGHT = 'topRight',
  TOP_CENTER = 'topCenter',
  TOP_LEFT = 'topLeft',
  RIGHT_TOP = 'rightTop',
  RIGHT_BOTTOM = 'rightBottom',
  LEFT_TOP = 'leftTop',
  LEFT_BOTTOM = 'leftBottom',
  BOTTOM_RIGHT = 'bottomRight',
  BOTTOM_CENTER = 'bottomCenter',
  BOTTOM_LEFT = 'bottomLeft',
  DEFAULT = 'bottomRight',
}

export interface PopoverProps {
  ionPopoverTitle: string;
  ionPopoverBody: TemplateRef<void>;
  ionPopoverActions?: IonButtonProps[];
  ionPopoverIcon?: IconType;
  ionPopoverIconColor?: string;
  ionPopoverIconClose?: boolean;
  ionPopoverPosition?: PopoverPosition;
  ionPopoverKeep?: boolean;
}
