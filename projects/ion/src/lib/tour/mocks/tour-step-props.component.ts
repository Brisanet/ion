import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';

import { PopoverButtonsProps, PopoverPosition } from '../../core/types';
import { IonTourService } from '../tour.service';

@Component({
  selector: 'tour-step-props',
  template: `
    <style>
      div {
        height: 800px;
        width: 100%;
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
        [ionStepId]="ionStepId"
        [ionTourId]="ionTourId"
        [ionStepBody]="stepBody"
        [ionStepTitle]="ionStepTitle"
        [ionPrevStepBtn]="ionPrevStepBtn"
        [ionNextStepBtn]="ionNextStepBtn"
        [ionPrevStepId]="ionPrevStepId"
        [ionNextStepId]="ionNextStepId"
        [ionStepPosition]="ionStepPosition"
        [ionStepMarginToContent]="ionStepMarginToContent"
        [ionStepBackdropPadding]="ionStepBackdropPadding"
        [ionStepCustomClass]="ionStepCustomClass"
        [ionStepBackdropCustomClass]="ionStepBackdropCustomClass"
      ></ion-button>
    </div>

    <ng-template #stepBody>
      <p>Step body content</p>
    </ng-template>
  `,
})
export class TourStepDemoComponent implements AfterViewInit, OnChanges {
  @Input() ionStepId = 'demo-step';
  @Input() ionTourId = 'demo-tour';
  @Input() ionStepTitle: string;
  @Input() ionPrevStepBtn: PopoverButtonsProps;
  @Input() ionNextStepBtn: PopoverButtonsProps;
  @Input() ionPrevStepId: string;
  @Input() ionNextStepId: string;
  @Input() ionStepPosition: PopoverPosition;
  @Input() ionStepMarginToContent: number;
  @Input() ionStepBackdropPadding: number;
  @Input() ionStepCustomClass: string;
  @Input() ionStepBackdropCustomClass: string;

  constructor(private readonly ionTourService: IonTourService) {}

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
