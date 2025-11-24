import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';

import { IonTourModule } from '../projects/ion/src/lib/tour';
import { IonSharedModule } from '../projects/ion/src/public-api';
import { TourResizingHostComponent } from '../projects/ion/src/lib/tour/mocks/resizing-host-demo.component';

const Template: Story<TourResizingHostComponent> = (
  args: TourResizingHostComponent
) => ({
  component: TourResizingHostComponent,
  props: args,
  moduleMetadata: {
    declarations: [TourResizingHostComponent],
    imports: [CommonModule, IonSharedModule, IonTourModule],
    entryComponents: [TourResizingHostComponent],
  },
});

export const HostResizing = Template.bind({});
HostResizing.args = {
  ionStepTitle: 'Title Example',
  ionStepBody: 'You can change the props of this step in Storybook controls',
  ionPrevStepBtn: { label: 'Close' },
  ionNextStepBtn: { label: 'Finish' },
  ionStepMarginToContent: 5,
  ionStepBackdropPadding: 5,
};

export default {
  title: 'Ion/Data Display/Tour',
  component: TourResizingHostComponent,
} as Meta<TourResizingHostComponent>;
