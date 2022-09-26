import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { SimpleMenuComponent } from '../projects/ion/src/lib/simple-menu/simple-menu.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import {
  AvatarComponent,
  BadgeComponent,
  ButtonComponent,
  TabComponent,
  TabGroupComponent,
} from '../projects/ion/src/public-api';
import { DefaultImageDirective } from '../projects/ion/src/lib/defaultImage.directive';

export default {
  title: 'Ion/Data Display/SimpleMenu',
  component: SimpleMenuComponent,
} as Meta;

const Template: Story<SimpleMenuComponent> = (args: SimpleMenuComponent) => ({
  component: SimpleMenuComponent,
  props: {
    ...args,
    selected: action('selected'),
    logoutClick: action('logoutClick'),
  },
  moduleMetadata: {
    declarations: [
      IonIconComponent,
      TabGroupComponent,
      TabComponent,
      ButtonComponent,
      BadgeComponent,
      AvatarComponent,
      DefaultImageDirective,
    ],
    imports: [CommonModule],
  },
});

export const Basic = Template.bind({});
Basic.args = {
  options: [
    {
      label: 'Agendamentos',
      iconType: 'calendar',
      selected: false,
    },
    {
      label: 'Recursos',
      iconType: 'pencil',
      selected: false,
    },
  ],
  profile: {
    imageUrl:
      'https://ovicio.com.br/wp-content/uploads/2022/01/20220123-rocket-raccoon-guardians-of-the-galaxy.jpeg',
    name: 'Rocket Raccoon',
  },
};
