import { EventEmitter, TemplateRef } from '@angular/core';

export interface IonTourStepProps {
  ionStepId: string;
  ionTourId: string;
  ionStepTitle?: string;
  ionStepContent?: TemplateRef<unknown> | string;
  ionStepPrevBtnTitle?: string;
  ionStepNextBtnTitle?: string;
  ionStepFinishBtnTitle?: string;
  ionPrevStepId?: IonTourStepProps['ionStepId'];
  ionNextStepId?: IonTourStepProps['ionStepId'];
  ionStepPosition?: IonTourStepPositions;
  ionStepMarginToContent?: number;
  ionStepBackdropPadding?: number;
  ionStepCustomClass?: string;
  ionStepBackdropCustomClass?: string;
  ionOnPrevStep: EventEmitter<void>;
  ionOnNextStep: EventEmitter<void>;
  ionOnFinishTour: EventEmitter<void>;
}

export interface IonTourPopoverProps extends IonTourStepProps {
  target: DOMRect;
}

export enum IonTourStepPositions {
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
}

export interface IonStartTourProps {
  tourId?: string;
}
