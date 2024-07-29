import { Component } from '@angular/core';

import { IonTourService } from '../tour.service';

@Component({
  template: `
    <style>
      div {
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
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
          ionStepTitle="Upload Action"
          [ionTourId]="tourId"
          [ionStepId]="steps.UPLOAD"
          [ionNextStepId]="steps.SAVE"
          [ionStepContent]="uploadStepContent"
        ></ion-button>
        <ion-button
          label="Save"
          ionTourStep
          [ionTourId]="tourId"
          [ionStepId]="steps.SAVE"
          [ionPrevStepId]="steps.UPLOAD"
          [ionNextStepId]="steps.MORE_OPTIONS"
          ionStepContent="Save your changes."
        ></ion-button>
        <ion-button
          iconType="option"
          type="secondary"
          ionTourStep
          [ionTourId]="tourId"
          ionStepTitle="Other Actions"
          [ionStepId]="steps.MORE_OPTIONS"
          [ionPrevStepId]="steps.SAVE"
          [ionStepContent]="optionsStepContent"
        ></ion-button>
      </main>
    </div>

    <ng-template #uploadStepContent>
      <span>Here is a random image:</span>
      <img src="https://picsum.photos/200/100" alt="Random Image" />
    </ng-template>

    <ng-template #optionsStepContent>
      <span>Click to see other actions.</span>
    </ng-template>
  `,
})
export class TourBasicDemoComponent {
  public tourId = 'basic-demo';

  public steps: Record<string, string> = {
    UPLOAD: 'upload',
    SAVE: 'save',
    MORE_OPTIONS: 'more_options',
  };

  constructor(private readonly ionTourService: IonTourService) {}

  public startTour(): void {
    this.ionTourService.start();
  }
}
