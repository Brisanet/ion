import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IndicatorPopoverComponent } from '../projects/ion/src/lib/indicator/mocks/indicator-popover.component';
import {
  IonSharedModule,
  IonIndicatorModule,
} from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Display/Indicator',
  component: IndicatorPopoverComponent,
} as Meta<IndicatorPopoverComponent>;

const Template: Story<IndicatorPopoverComponent> = (
  args: IndicatorPopoverComponent
) => ({
  component: IndicatorPopoverComponent,
  props: {
    ...args,
  },
  moduleMetadata: {
    declarations: [IndicatorPopoverComponent],
    imports: [CommonModule, IonSharedModule, IonIndicatorModule],
    entryComponents: [IndicatorPopoverComponent],
  },
});

export const withPopover = Template.bind({});
