import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';

import { IonTourModule } from '../projects/ion/src/lib/tour';
import { TourStepDemoComponent } from '../projects/ion/src/lib/tour/mocks/tour-step-props.component';
import {
  IonSharedModule,
  PopoverPosition,
  IonTourStepProps,
} from '../projects/ion/src/public-api';

const Template: Story<TourStepDemoComponent> = (
  args: TourStepDemoComponent
) => ({
  component: TourStepDemoComponent,
  props: args,
  moduleMetadata: {
    declarations: [TourStepDemoComponent],
    imports: [CommonModule, IonSharedModule, IonTourModule],
    entryComponents: [TourStepDemoComponent],
  },
});

export const TourStep = Template.bind({});
TourStep.args = {
  ionStepTitle: 'Title Example',
  ionStepBody: 'You can change the props of this step in Storybook controls',
  ionStepPrevBtnTitle: 'Voltar',
  ionStepNextBtnTitle: 'Continuar',
  ionStepFinishBtnTitle: 'Finalizar',
  ionStepPosition: PopoverPosition.TOP_CENTER,
  ionStepMarginToContent: 5,
  ionStepBackdropPadding: 5,
} as IonTourStepProps;

export default {
  title: 'Ion/Data Display/Tour',
  component: TourStepDemoComponent,
  argTypes: {
    ionStepTitle: { control: 'text' },
    ionStepBody: { control: 'text' },
    ionStepPrevBtnTitle: { control: 'text' },
    ionStepNextBtnTitle: { control: 'text' },
    ionStepFinishBtnTitle: { control: 'text' },
    ionPrevStepId: { control: 'text' },
    ionNextStepId: { control: 'text' },
    ionStepPosition: {
      control: {
        type: 'select',
        options: Object.values(PopoverPosition),
      },
    },
    ionStepMarginToContent: { control: 'number' },
    ionStepBackdropPadding: { control: 'number' },
    ionStepCustomClass: { control: 'text' },
    ionStepBackdropCustomClass: { control: 'text' },
  },
} as Meta<TourStepDemoComponent>;
