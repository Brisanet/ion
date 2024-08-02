import { EventEmitter } from '@angular/core';

import { PopoverPosition, PopoverProps } from './popover';

export interface IonTourStepProps {
  ionStepId: string;
  ionTourId: string;
  ionStepTitle?: PopoverProps['ionPopoverTitle'];
  ionStepBody?: PopoverProps['ionPopoverBody'];
  ionStepPrevBtnTitle?: string;
  ionStepNextBtnTitle?: string;
  ionPrevStepId?: IonTourStepProps['ionStepId'];
  ionNextStepId?: IonTourStepProps['ionStepId'];
  ionStepPosition?: PopoverPosition;
  ionStepMarginToContent?: number;
  ionStepBackdropPadding?: number;
  ionStepCustomClass?: string;
  ionStepBackdropCustomClass?: string;
  ionOnPrevStep?: EventEmitter<void>;
  ionOnNextStep?: EventEmitter<void>;
  ionOnFinishTour?: EventEmitter<void>;
  target?: DOMRect;
}

export interface IonStartTourProps {
  tourId?: string;
}
