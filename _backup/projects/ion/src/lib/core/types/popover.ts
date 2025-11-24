import { EventEmitter, TemplateRef } from '@angular/core';

import { IonButtonProps } from './button';
import { IconType } from './icon';
import { Subject } from 'rxjs';

export enum PopoverPosition {
  TOP_RIGHT = 'topRight',
  TOP_CENTER = 'topCenter',
  TOP_LEFT = 'topLeft',
  RIGHT_TOP = 'rightTop',
  RIGHT_CENTER = 'rightCenter',
  RIGHT_BOTTOM = 'rightBottom',
  LEFT_TOP = 'leftTop',
  LEFT_CENTER = 'leftCenter',
  LEFT_BOTTOM = 'leftBottom',
  BOTTOM_RIGHT = 'bottomRight',
  BOTTOM_CENTER = 'bottomCenter',
  BOTTOM_LEFT = 'bottomLeft',
  DEFAULT = 'bottomLeft',
}

export interface PopoverButtonsProps extends IonButtonProps {
  keepOpenAfterAction?: boolean;
}

export enum PopoverTrigger {
  CLICK = 'click',
  HOVER = 'hover',
  DEFAULT = 'click',
}

export interface PopoverProps {
  ionPopoverTitle: string;
  ionPopoverBody: TemplateRef<void>;
  ionPopoverActions?: PopoverButtonsProps[];
  ionPopoverIcon?: IconType;
  ionPopoverIconColor?: string;
  ionPopoverIconClose?: boolean;
  ionPopoverPosition?: PopoverPosition;
  ionPopoverKeep?: boolean;
  ionPopoverCustomClass?: string;
  ionOnFirstAction?: EventEmitter<void>;
  ionOnSecondAction?: EventEmitter<void>;
  ionOnClose?: EventEmitter<void>;
}

export interface PopoverDirectiveProps extends PopoverProps {
  ionPopoverStopCloseOnScroll?: boolean;
  ionPopoverClose?: Subject<void>;
  ionPopoverArrowPointAtCenter?: boolean;
  ionPopoverTrigger?: PopoverTrigger;
  ionPopoverAutoReposition?: boolean;
}
