import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';

import { IonTourModule } from '../projects/ion/src/lib/tour';
import {
  TourBasicDemoComponent,
  TourStepPropsComponent,
  tourStepsDemoDefaultArgs,
} from '../projects/ion/src/lib/tour/mocks';
import {
  IonSharedModule,
  IonTourStepPositions,
} from '../projects/ion/src/public-api';

const BasicTemplate: Story<TourBasicDemoComponent> = (
  args: TourBasicDemoComponent
) => ({
  component: TourBasicDemoComponent,

  props: args,
  moduleMetadata: {
    declarations: [TourBasicDemoComponent],
    imports: [CommonModule, IonSharedModule, IonTourModule],
    entryComponents: [TourBasicDemoComponent],
  },
});

export const BasicTour = BasicTemplate.bind({});
BasicTour.args = {};

const StepTemplate: Story<TourStepPropsComponent> = (
  args: TourStepPropsComponent
) => ({
  component: TourStepPropsComponent,
  props: args,
  moduleMetadata: {
    declarations: [TourStepPropsComponent],
    imports: [CommonModule, IonSharedModule, IonTourModule],
    entryComponents: [TourStepPropsComponent],
  },
});

export const TourStep = StepTemplate.bind({});
TourStep.args = tourStepsDemoDefaultArgs;

export default {
  title: 'Ion/Data Display/Tour',
  component: TourBasicDemoComponent,
  argTypes: {
    ionStepTitle: {
      name: 'ionStepTitle',
      type: { name: 'string' },
    },
    ionStepContent: {
      name: 'ionStepContent',
      type: { name: 'string | template' },
    },
    ionStepPrevBtnTitle: {
      name: 'ionStepPrevBtnTitle',
      type: { name: 'string' },
      defaultValue: 'Previous',
    },
    ionStepNextBtnTitle: {
      name: 'ionStepNextBtnTitle',
      type: { name: 'string' },
      defaultValue: 'Next',
    },
    ionStepFinishBtnTitle: {
      name: 'ionStepFinishBtnTitle',
      type: { name: 'string' },
      defaultValue: 'Finish',
    },
    ionPrevStepId: {
      name: 'ionPrevStepId',
      type: { name: 'string' },
    },
    ionNextStepId: {
      name: 'ionNextStepId',
      type: { name: 'string' },
    },
    ionStepZIndex: {
      name: 'ionStepZIndex',
      type: { name: 'number' },
      defaultValue: 101,
    },
    ionStepPosition: {
      name: 'ionStepPosition',
      control: {
        type: 'select',
        options: [...Object.values(IonTourStepPositions)],
      },
    },
    ionStepMarginToContent: {
      name: 'ionStepMarginToContent',
      type: { name: 'number' },
      defaultValue: 15,
    },
    ionStepWidth: {
      name: 'ionStepWidth',
      type: { name: 'string | number' },
      defaultValue: 'auto',
    },
    ionStepHeight: {
      name: 'ionStepHeight',
      type: { name: 'string | number' },
      defaultValue: 'auto',
    },
    ionStepBackdropPadding: {
      name: 'ionStepBackdropPadding',
      type: { name: 'number' },
      defaultValue: 10,
    },
    ionStepBackdropdZIndex: {
      name: 'ionStepBackdropdZIndex',
      type: { name: 'number' },
      defaultValue: 100,
    },
  },
} as Meta<TourBasicDemoComponent>;
