import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonSimpleMenuComponent } from '../projects/ion/src/lib/simple-menu/simple-menu.component';
import {
  IonAvatarModule,
  IonTabGroupModule,
  IonIconModule,
  IonButtonModule,
} from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Display/SimpleMenu',
  component: IonSimpleMenuComponent,
} as Meta;

const Template: Story<IonSimpleMenuComponent> = (
  args: IonSimpleMenuComponent
) => ({
  component: IonSimpleMenuComponent,
  props: {
    ...args,
    selected: action('selected'),
    logoutClick: action('logoutClick'),
  },
  moduleMetadata: {
    imports: [
      CommonModule,
      IonIconModule,
      IonButtonModule,
      IonAvatarModule,
      IonTabGroupModule,
    ],
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

export const withLogo = Template.bind({});
withLogo.args = {
  logo: {
    src: require('./assets/sidebar-logo.svg'),
    alt: 'Logo de exemplo',
  },
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

export const withoutImage = Template.bind({});
withoutImage.args = {
  options: [
    {
      label: 'Gerenciamento',
      iconType: 'doc-add',
      selected: false,
    },
  ],
  profile: {
    imageUrl: '',
    name: 'Taylor Swift',
  },
};
