import { EventEmitter, TemplateRef } from '@angular/core';

import { PopoverPosition } from './popover';

export interface IonTourStepProps {
  ionStepId: string;
  ionTourId: string;
  ionStepTitle?: string;
  ionStepBody?: TemplateRef<unknown>;
  ionStepPrevBtnTitle?: string;
  ionStepSkipBtnTitle?: string;
  ionStepNextBtnTitle?: string;
  ionStepFinishBtnTitle?: string;
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
