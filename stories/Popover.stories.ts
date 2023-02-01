import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { PopoverComponent } from '../projects/ion/src/lib/popover/popover.component';
import { InputComponent } from '../projects/ion/src/lib/input/input.component';

import {
  AlertComponent,
  BadgeComponent,
  ButtonComponent,
  DropdownComponent,
  IonDividerComponent,
  IonIconComponent,
} from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Display/Popover',
  component: PopoverComponent,
} as Meta;

const Template: Story<PopoverComponent> = (args: PopoverComponent) => ({
  component: PopoverComponent,
  props: args,
  moduleMetadata: {
    declarations: [
      IonDividerComponent,
      ButtonComponent,
      IonIconComponent,
      BadgeComponent,
      DropdownComponent,
      AlertComponent,
      InputComponent,
    ],
    imports: [CommonModule, FormsModule],
  },
});

export const Default = Template.bind({});
Default.args = {
  ionPopoverTitle: 'Você tem certeza?',
  ionPopoverBody:
    'Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs.',
  ionPopoverIcon: 'left2',
  ionPopoverIconClose: 'close',
};

export const withActions = Template.bind({});
withActions.args = {
  ionPopoverTitle: 'Você tem certeza?',
  ionPopoverBody:
    'Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs.',
  ionPopoverIcon: 'condominium',
  ionPopoverIconClose: 'close',
  ionPopoverActions: [{ label: 'action 1' }, { label: 'action 2' }],
};
