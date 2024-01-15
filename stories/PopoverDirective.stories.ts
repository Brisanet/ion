import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';

import {
  PopoverPosition,
  PopoverTrigger,
} from '../projects/ion/src/lib/core/types/popover';
import { OpenPopoverComponent } from '../projects/ion/src/lib/popover/mock/open-popover.component';
import {
  IonPopoverModule,
  IonSharedModule,
} from '../projects/ion/src/public-api';

const Template: Story<OpenPopoverComponent> = (args: OpenPopoverComponent) => ({
  component: OpenPopoverComponent,
  props: {
    ...args,
  },
  moduleMetadata: {
    declarations: [OpenPopoverComponent],
    imports: [CommonModule, IonSharedModule, IonPopoverModule],
    entryComponents: [OpenPopoverComponent],
  },
});

export const DirectiveWithActions = Template.bind({});
DirectiveWithActions.args = {
  ionPopoverTitle: 'Você tem certeza?',
  ionPopoverIconClose: true,
  ionPopoverActions: [{ label: 'action 1' }, { label: 'action 2' }],
  ionPopoverPosition: PopoverPosition.DEFAULT,
  ionPopoverTrigger: PopoverTrigger.DEFAULT,
};

export default {
  title: 'Ion/Data Display/Popover',
  component: OpenPopoverComponent,
} as Meta<OpenPopoverComponent>;
