import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular/dist/ts3.9/client';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonSidebarGroupComponent } from '../projects/ion/src/lib/sidebar/sidebar-group/sidebar-group.component';
import { IonSidebarItemComponent } from '../projects/ion/src/lib/sidebar/sidebar-item/sidebar-item.component';
import { IonSidebarComponent } from '../projects/ion/src/lib/sidebar/sidebar.component';
import {
  IonButtonModule,
  IonIconModule,
  IonTooltipModule,
} from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Navigation/Sidebar',
  component: IonSidebarComponent,
  decorators: [
    moduleMetadata({
      declarations: [IonSidebarItemComponent, IonSidebarGroupComponent],
      imports: [IonIconModule, IonButtonModule, IonTooltipModule],
    }),
  ],
} as Meta;

const Template: Story<IonSidebarComponent> = (args: IonSidebarComponent) => ({
  component: IonSidebarComponent,
  props: { ...args },
});

export const Default = Template.bind({});
Default.args = {
  logo: require('./assets/sidebar-logo.svg'),
  closeOnSelect: false,
  items: [
    {
      title: 'Fila de atendimento',
      icon: 'headset',
      action: action('Fila de atendimento'),
    },
    { title: 'Cadastros', icon: 'plus-solid', action: action('Cadastros') },
    {
      title: 'Comissões',
      icon: 'calendar-money',
      action: action('Comissões'),
      disabled: true,
    },
    {
      title: 'Permissões',
      icon: 'config',
      action: action('Permissões'),
      options: [
        {
          title: 'Gerência',
          icon: 'user',
          action: action('Gerência'),
        },
        {
          title: 'Grupos',
          icon: 'union',
          action: action('Grupos'),
        },
        {
          title: 'Pausas',
          icon: 'wait',
          action: action('Pausas'),
        },
        {
          title: 'Comissões',
          icon: 'calendar-money',
          action: action('Comissões'),
          disabled: true,
        },
      ],
    },
    {
      title: 'Gerenciamento',
      icon: 'working',
      options: [
        {
          title: 'Gerência',
          icon: 'user',
          action: action('Gerência'),
        },
        {
          title: 'Grupos',
          icon: 'union',
          action: action('Grupos'),
        },
        {
          title: 'Pausas',
          icon: 'wait',
          action: action('Pausas'),
        },
        {
          title: 'Comissões',
          icon: 'calendar-money',
          action: action('Comissões'),
          disabled: true,
        },
      ],
    },
  ],
};

export const ShrinkMode = Template.bind({});
ShrinkMode.args = {
  shrinkMode: true,
  logo: require('./assets/sidebar-logo.svg'),
  closeOnSelect: false,
  items: [
    {
      title: 'Fila de atendimento',
      icon: 'headset',
      action: action('Fila de atendimento'),
    },
    { title: 'Cadastros', icon: 'plus-solid', action: action('Cadastros') },
    {
      title: 'Comissões',
      icon: 'calendar-money',
      action: action('Comissões'),
      disabled: true,
    },
    {
      title: 'Permissões',
      icon: 'config',
      action: action('Permissões'),
      options: [
        {
          title: 'Gerência',
          icon: 'user',
          action: action('Gerência'),
        },
        {
          title: 'Grupos',
          icon: 'union',
          action: action('Grupos'),
        },
        {
          title: 'Pausas',
          icon: 'wait',
          action: action('Pausas'),
        },
        {
          title: 'Comissões',
          icon: 'calendar-money',
          action: action('Comissões'),
          disabled: true,
        },
      ],
    },
    {
      title: 'Gerenciamento',
      icon: 'working',
      options: [
        {
          title: 'Gerência',
          icon: 'user',
          action: action('Gerência'),
        },
        {
          title: 'Grupos',
          icon: 'union',
          action: action('Grupos'),
        },
        {
          title: 'Pausas',
          icon: 'wait',
          action: action('Pausas'),
        },
        {
          title: 'Comissões',
          icon: 'calendar-money',
          action: action('Comissões'),
        },
      ],
    },
  ],
};
