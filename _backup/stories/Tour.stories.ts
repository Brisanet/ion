import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';

import { IonTourModule } from '../projects/ion/src/lib/tour';
import { TourBasicDemoComponent } from '../projects/ion/src/lib/tour/mocks/tour-basic-demo.component';
import { IonSharedModule } from '../projects/ion/src/public-api';

const Template: Story<TourBasicDemoComponent> = () => ({
  component: TourBasicDemoComponent,
  moduleMetadata: {
    declarations: [TourBasicDemoComponent],
    imports: [CommonModule, IonSharedModule, IonTourModule],
    entryComponents: [TourBasicDemoComponent],
  },
});

export const BasicTour = Template.bind({});

export default {
  title: 'Ion/Data Display/Tour',
  component: TourBasicDemoComponent,
} as Meta<TourBasicDemoComponent>;
