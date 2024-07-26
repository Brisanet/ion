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
        [ionStepZIndex]="ionStepZIndex"
        [ionStepPosition]="ionStepPosition"
        [ionStepMarginToContent]="ionStepMarginToContent"
        [ionStepWidth]="ionStepWidth"
        [ionStepHeight]="ionStepHeight"
        [ionStepBackdropPadding]="ionStepBackdropPadding"
        [ionStepBackdropdZIndex]="ionStepBackdropdZIndex"
        (ionOnPrevStep)="onPrevStep()"
        (ionOnNextStep)="onNextStep()"
        (ionOnFinishTour)="onFinishTour()"
      ></ion-button>
    </div>
  `,
})
export class TourStepPropsComponent implements AfterViewInit, OnChanges {
  @Input() public ionStepTitle: string;
  @Input() public ionStepContent: string;
  @Input() public ionStepPrevBtnTitle: string;
  @Input() public ionStepNextBtnTitle: string;
  @Input() public ionStepFinishBtnTitle: string;
  @Input() public ionPrevStepId: string;
  @Input() public ionNextStepId: string;
  @Input() public ionStepZIndex: number;
  @Input() public ionStepPosition: IonTourStepPositions;
  @Input() public ionStepMarginToContent: number;
  @Input() public ionStepWidth: string;
  @Input() public ionStepHeight: string;
  @Input() public ionStepBackdropPadding: number;
  @Input() public ionStepBackdropdZIndex: number;

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
