import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';

import {
  PopoverPosition,
  PopoverTrigger,
} from '../projects/ion/src/lib/core/types/popover';
import { iconsPaths } from '../projects/ion/src/lib/icon/svgs/icons';
import { OpenPopoverComponent } from '../projects/ion/src/lib/popover/mock/open-popover.component';
import {
  IonPopoverModule,
  IonSharedModule,
} from '../projects/ion/src/public-api';

const Template: Story<OpenPopoverComponent> = (args: OpenPopoverComponent) => ({
  component: OpenPopoverComponent,

  props: args,
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
  ionPopoverAutoReposition: true,
};

export default {
  title: 'Ion/Data Display/Popover',
  component: OpenPopoverComponent,
  argTypes: {
    ionPopoverTitle: {
      name: 'ionPopoverTitle',
      type: { name: 'string' },
      defaultValue: 'Título do popover',
    },
    ionPopoverIconClose: {
      name: 'ionPopoverIconClose',
      type: { name: 'boolean' },
      defaultValue: false,
    },
    ionPopoverIcon: {
      name: 'ionPopoverIcon',
      defaultValue: 'historic',
      control: {
        type: 'select',
        options: [...Object.keys(iconsPaths)],
      },
    },
    ionPopoverPosition: {
      name: 'ionPopoverPosition',
      control: {
        type: 'select',
        options: [...Object.values(PopoverPosition)],
      },
    },
    ionPopoverTrigger: {
      name: 'ionPopoverTrigger',
      control: 'radio',
      options: [...Object.values(PopoverTrigger)],
    },
    ionPopoverArrowPointAtCenter: {
      name: 'ionPopoverArrowPointAtCenter',
      control: 'boolean',
      defaultValue: true,
    },
    ionPopoverCustomClass: {
      name: 'ionPopoverCustomClass',
      type: { name: 'string' },
      defaultValue: '',
    },
    ionPopoverAutoReposition: {
      name: 'ionPopoverAutoReposition',
      type: { name: 'boolean' },
      defaultValue: true,
    },
  },
} as Meta<OpenPopoverComponent>;
