import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';

import { IonTourModule } from '../projects/ion/src/lib/tour';
import { TourStepPropsComponent } from '../projects/ion/src/lib/tour/mocks';
import {
  IonSharedModule,
  IonTourStepPositions,
  IonTourStepProps,
} from '../projects/ion/src/public-api';

const Template: Story<TourStepPropsComponent> = (
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

export const TourStep = Template.bind({});
TourStep.args = {
  ionStepTitle: 'Title Example',
  ionStepContent: 'You can change the props of this step in Storybook controls',
  ionStepPrevBtnTitle: 'Voltar',
  ionStepNextBtnTitle: 'Continuar',
  ionStepFinishBtnTitle: 'Finalizar',
  ionStepPosition: IonTourStepPositions.TOP_CENTER,
  ionStepMarginToContent: 5,
  ionStepBackdropPadding: 20,
} as IonTourStepProps;

export default {
  title: 'Ion/Data Display/Tour',
  component: TourStepPropsComponent,
  argTypes: {
    ionStepTitle: { control: 'text' },
    ionStepContent: { control: 'text' },
    ionStepPrevBtnTitle: { control: 'text' },
    ionStepNextBtnTitle: { control: 'text' },
    ionStepFinishBtnTitle: { control: 'text' },
    ionPrevStepId: { control: 'text' },
    ionNextStepId: { control: 'text' },
    ionStepPosition: {
      control: {
        type: 'select',
        options: Object.values(IonTourStepPositions),
      },
    },
    ionStepMarginToContent: { control: 'number' },
    ionStepBackdropPadding: { control: 'number' },
    ionStepCustomClass: { control: 'text' },
    ionStepBackdropCustomClass: { control: 'text' },
  },
} as Meta<TourStepPropsComponent>;
