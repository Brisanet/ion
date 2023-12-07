import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';

import {
  IonPopoverModule,
  IonSharedModule,
} from '../projects/ion/src/public-api';
import { PopoverPlacementsComponent } from '../projects/ion/src/lib/popover/mock/popover-placements.component';

const Template: Story<PopoverPlacementsComponent> = (
  args: PopoverPlacementsComponent
) => ({
  component: PopoverPlacementsComponent,
  props: {
    ...args,
  },
  moduleMetadata: {
    declarations: [PopoverPlacementsComponent],
    imports: [CommonModule, IonSharedModule, IonPopoverModule],
    entryComponents: [PopoverPlacementsComponent],
  },
});

export const Placements = Template.bind({});

export default {
  title: 'Ion/Data Display/Popover',
  component: PopoverPlacementsComponent,
} as Meta<PopoverPlacementsComponent>;
