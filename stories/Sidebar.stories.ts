import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular/dist/ts3.9/client';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { SidebarGroupComponent } from '../projects/ion/src/lib/sidebar/sidebar-group/sidebar-group.component';
import { SidebarItemComponent } from '../projects/ion/src/lib/sidebar/sidebar-item/sidebar-item.component';
import { SidebarComponent } from '../projects/ion/src/lib/sidebar/sidebar.component';
import { IonButtonModule, IonIconModule } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Navigation/Sidebar',
  component: SidebarComponent,
  decorators: [
    moduleMetadata({
      declarations: [SidebarItemComponent, SidebarGroupComponent],
      imports: [IonIconModule, IonButtonModule],
    }),
  ],
} as Meta;

const Template: Story<SidebarComponent> = (args: SidebarComponent) => ({
  component: SidebarComponent,
  props: { ...args },
});

export const Default = Template.bind({});
Default.args = {
  logo: require('./assets/sidebar-logo.svg'),
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
