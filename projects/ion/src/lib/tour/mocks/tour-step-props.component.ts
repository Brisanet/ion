import { AfterViewInit, Component } from '@angular/core';

import { IonTourStepPositions, IonTourStepProps } from '../../core/types';
import { IonTourService } from '../tour.service';

export const tourStepsDemoDefaultArgs: Partial<IonTourStepProps> = {
  ionStepTitle: 'Title Example',
  ionStepContent: 'You can change the props of this step in Storybook controls',
  ionStepPrevBtnTitle: 'Voltar',
  ionStepNextBtnTitle: 'Continuar',
  ionStepFinishBtnTitle: 'Finalizar',
  ionStepZIndex: 123,
  ionStepPosition: IonTourStepPositions.TOP_CENTER,
  ionStepMarginToContent: 5,
  ionStepWidth: 300,
  ionStepHeight: 150,
  ionStepBackdropPadding: 20,
  ionStepBackdropdZIndex: 100,
};

@Component({
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
        [ionStepContent]="args.ionStepContent"
        [ionStepTitle]="args.ionStepTitle"
        [ionStepContent]="args.ionStepContent"
        [ionStepPrevBtnTitle]="args.ionStepPrevBtnTitle"
        [ionStepNextBtnTitle]="args.ionStepNextBtnTjitle"
        [ionStepFinishBtnTitle]="args.ionStepFinishBtnTitle"
        [ionPrevStepId]="args.ionPrevStepId"
        [ionNextStepId]="args.ionNextStepId"
        [ionStepZIndex]="args.ionStepZIndex"
        [ionStepPosition]="args.ionStepPosition"
        [ionStepMarginToContent]="args.ionStepMarginToContent"
        [ionStepWidth]="args.ionStepWidth"
        [ionStepHeight]="args.ionStepHeight"
        [ionStepBackdropPadding]="args.ionStepBackdropPadding"
        [ionStepBackdropdZIndex]="args.ionStepBackdropdZIndex"
        (ionOnPrevStep)="onPrevStep()"
        (ionOnNextStep)="onNextStep()"
        (ionOnFinishTour)="onFinishTour()"
      ></ion-button>
    </div>
  `,
})
export class TourStepPropsComponent implements AfterViewInit {
  public args: Partial<IonTourStepProps> = tourStepsDemoDefaultArgs;

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

  public restartTour(): void {
    this.ionTourService.finish();
    this.ionTourService.start();
  }
}
