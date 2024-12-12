import { EventEmitter } from '@angular/core';

import { PopoverButtonsProps, PopoverPosition, PopoverProps } from './popover';

export interface IonTourStepProps {
  ionStepId: string;
  ionTourId: string;
  ionStepTitle?: PopoverProps['ionPopoverTitle'];
  ionStepBody?: PopoverProps['ionPopoverBody'];
  ionPrevStepId?: IonTourStepProps['ionStepId'];
  ionNextStepId?: IonTourStepProps['ionStepId'];
  ionPrevStepBtn?: PopoverButtonsProps;
  ionNextStepBtn?: PopoverButtonsProps;
  ionStepPosition?: PopoverPosition;
  ionStepMarginToContent?: number;
  ionStepBackdropPadding?: number;
  ionStepCustomClass?: string;
  ionStepBackdropCustomClass?: string;
  ionOnPrevStep?: EventEmitter<void>;
  ionOnNextStep?: EventEmitter<void>;
  ionOnFinishTour?: EventEmitter<void>;
  getTarget?: () => DOMRect;
}

export interface IonStartTourProps {
  tourId?: string;
}
