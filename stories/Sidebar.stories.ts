import { moduleMetadata } from '@storybook/angular/dist/ts3.9/client';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { SidebarGroupComponent } from '../projects/ion/src/lib/sidebar/sidebar-group/sidebar-group.component';
import { SidebarItemComponent } from '../projects/ion/src/lib/sidebar/sidebar-item/sidebar-item.component';
import { SidebarComponent } from '../projects/ion/src/lib/sidebar/sidebar.component';
import { IonIconModule } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Navigation/Sidebar',
  component: SidebarComponent,
  decorators: [
    moduleMetadata({
      declarations: [SidebarItemComponent, SidebarGroupComponent],
      imports: [IonIconModule],
    }),
  ],
} as Meta;

const Template: Story<SidebarComponent> = (args: SidebarComponent) => ({
  component: SidebarComponent,
  props: { ...args },
});

export const Default = Template.bind({});
Default.args = {
  items: [
    { title: 'Fila de atendimento', icon: 'headset' },
    { title: 'Cadastros', icon: 'plus-solid' },
    {
      title: 'Permissões',
      icon: 'config',
      options: [
        {
          title: 'Gerência',
          icon: 'user',
        },
        {
          title: 'Grupos',
          icon: 'union',
        },
        {
          title: 'Pausas',
          icon: 'wait',
        },
      ],
    },
  ],
};
