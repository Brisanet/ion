import { Component } from '@angular/core';

import { IonTourService } from '../tour.service';
import { IonTourStepProps, PopoverPosition } from '../../core/types';

export enum DemoSteps {
  UPLOAD = 'upload',
  SAVE = 'save',
  MORE_OPTIONS = 'more_options',
}

export const STEP1_MOCK: IonTourStepProps = {
  ionStepTitle: 'Upload Action',
  ionTourId: 'basic-demo',
  ionStepId: DemoSteps.UPLOAD,
  ionNextStepId: DemoSteps.SAVE,
  ionStepPosition: PopoverPosition.BOTTOM_CENTER,
  ionPrevStepBtn: { label: 'Close' },
};

export const STEP2_MOCK: IonTourStepProps = {
  ionStepTitle: 'Save Action',
  ionTourId: 'basic-demo',
  ionStepId: DemoSteps.SAVE,
  ionPrevStepId: DemoSteps.UPLOAD,
  ionNextStepId: DemoSteps.MORE_OPTIONS,
  ionStepPosition: PopoverPosition.BOTTOM_CENTER,
};

export const STEP3_MOCK: IonTourStepProps = {
  ionStepTitle: 'More Options',
  ionTourId: 'basic-demo',
  ionStepId: DemoSteps.MORE_OPTIONS,
  ionPrevStepId: DemoSteps.SAVE,
  ionStepPosition: PopoverPosition.RIGHT_CENTER,
  ionNextStepBtn: { label: 'Finish' },
};

@Component({
  template: `
    <style>
      div {
        height: 100%;
        margin-top: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 100px;

        main {
          display: flex;
          gap: 10px;
        }
      }

      span {
        color: #8d93a5;
        font-size: 14px;
      }
    </style>

    <div>
      <ion-button label="Begin tour" (ionOnClick)="startTour()"> </ion-button>

      <main>
        <ion-button
          label="Upload"
          type="secondary"
          ionTourStep
          [ionStepTitle]="step1.ionStepTitle"
          [ionStepPosition]="step1.ionStepPosition"
          [ionTourId]="step1.ionTourId"
          [ionStepId]="step1.ionStepId"
          [ionNextStepId]="step1.ionNextStepId"
          [ionPrevStepBtn]="step1.ionPrevStepBtn"
          [ionStepBody]="uploadStepContent"
        ></ion-button>
        <ion-button
          label="Save"
          ionTourStep
          [ionTourId]="step2.ionTourId"
          [ionStepId]="step2.ionStepId"
          [ionPrevStepId]="step2.ionPrevStepId"
          [ionNextStepId]="step2.ionNextStepId"
          [ionStepTitle]="step2.ionStepTitle"
          [ionStepBody]="saveStep"
          (ionOnNextStep)="markOptionStepAsVisible()"
        ></ion-button>
        <ion-button
          *ngIf="isOptionStepVisible"
          iconType="option"
          type="secondary"
          ionTourStep
          [ionStepPosition]="step3.ionStepPosition"
          [ionTourId]="step3.ionTourId"
          [ionStepId]="step3.ionStepId"
          [ionPrevStepId]="step3.ionPrevStepId"
          [ionStepTitle]="step3.ionStepTitle"
          [ionStepBody]="optionsStepContent"
          [ionNextStepBtn]="step3.ionNextStepBtn"
        ></ion-button>
      </main>
    </div>

    <ng-template #uploadStepContent>
      <span>Here is a random image:</span>
      <img
        src="https://picsum.photos/200/100"
        alt="Random Image"
        width="200px"
        height="100px"
      />
    </ng-template>

    <ng-template #saveStep>
      <span>Save your changes.</span>
    </ng-template>

    <ng-template #optionsStepContent>
      <span>Click to see other actions.</span>
    </ng-template>
  `,
})
export class TourBasicDemoComponent {
  public tourId = 'basic-demo';

  public step1 = STEP1_MOCK;
  public step2 = STEP2_MOCK;
  public step3 = STEP3_MOCK;

  public isOptionStepVisible = false;

  constructor(private readonly ionTourService: IonTourService) {}

  public startTour(): void {
    this.ionTourService.start();
  }

  public markOptionStepAsVisible(): void {
    this.isOptionStepVisible = true;
  }
}
