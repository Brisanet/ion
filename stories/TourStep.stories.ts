import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';

import { IonTourModule } from '../projects/ion/src/lib/tour';
import { TourStepPropsComponent } from '../projects/ion/src/lib/tour/mocks';
import {
  IonSharedModule,
  IonTourStepPositions,
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
  ionStepZIndex: 123,
  ionStepPosition: IonTourStepPositions.TOP_CENTER,
  ionStepMarginToContent: 5,
  ionStepWidth: 300,
  ionStepHeight: 150,
  ionStepBackdropPadding: 20,
  ionStepBackdropdZIndex: 100,
};

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
    ionStepZIndex: { control: 'number' },
    ionStepPosition: {
      control: {
        type: 'select',
        options: Object.values(IonTourStepPositions),
      },
    },
    ionStepMarginToContent: { control: 'number' },
    ionStepWidth: { control: 'text' },
    ionStepHeight: { control: 'text' },
    ionStepBackdropPadding: { control: 'number' },
    ionStepBackdropdZIndex: { control: 'number' },
  },
} as Meta<TourStepPropsComponent>;
