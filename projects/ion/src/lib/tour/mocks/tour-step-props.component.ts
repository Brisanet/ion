import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';

import { IonTourStepPositions } from '../../core/types';
import { IonTourService } from '../tour.service';

@Component({
  selector: 'tour-step-props',
  template: `
    <style>
      div {
        height: 400px;
        width: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>

    <div>
      <ion-button
        label="Demo"
        type="secondary"
        (ionOnClick)="restartTour()"
        ionTourStep
        ionStepId="demo-step"
        ionTourId="demo-tour"
        [ionStepContent]="ionStepContent"
        [ionStepTitle]="ionStepTitle"
        [ionStepPrevBtnTitle]="ionStepPrevBtnTitle"
        [ionStepNextBtnTitle]="ionStepNextBtnTitle"
        [ionStepFinishBtnTitle]="ionStepFinishBtnTitle"
        [ionPrevStepId]="ionPrevStepId"
        [ionNextStepId]="ionNextStepId"
        [ionStepPosition]="ionStepPosition"
        [ionStepMarginToContent]="ionStepMarginToContent"
        [ionStepBackdropPadding]="ionStepBackdropPadding"
        [ionStepCustomClass]="ionStepCustomClass"
        [ionStepBackdropCustomClass]="ionStepBackdropCustomClass"
        (ionOnPrevStep)="onPrevStep()"
        (ionOnNextStep)="onNextStep()"
        (ionOnFinishTour)="onFinishTour()"
      ></ion-button>
    </div>
  `,
})
export class TourStepPropsComponent implements AfterViewInit, OnChanges {
  @Input() ionStepTitle: string;
  @Input() ionStepContent: string;
  @Input() ionStepPrevBtnTitle: string;
  @Input() ionStepNextBtnTitle: string;
  @Input() ionStepFinishBtnTitle: string;
  @Input() ionPrevStepId: string;
  @Input() ionNextStepId: string;
  @Input() ionStepPosition: IonTourStepPositions;
  @Input() ionStepMarginToContent: number;
  @Input() ionStepBackdropPadding: number;
  @Input() ionStepCustomClass: string;
  @Input() ionStepBackdropCustomClass: string;

  constructor(private readonly ionTourService: IonTourService) {}

  public onPrevStep(): void {
    console.log('Prev Step');
  }

  public onNextStep(): void {
    console.log('Next Step');
  }

  public onFinishTour(): void {
    console.log('Finish Tour');
  }

  public ngAfterViewInit(): void {
    this.ionTourService.start();
  }

  public ngOnChanges(): void {
    this.restartTour();
  }

  public restartTour(): void {
    this.ionTourService.finish();
    this.ionTourService.start();
  }
}
