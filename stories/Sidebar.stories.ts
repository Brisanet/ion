import { moduleMetadata } from '@storybook/angular/dist/ts3.9/client';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { SidebarGroupComponent } from '../projects/ion/src/lib/sidebar/sidebar-group/sidebar-group.component';
import { SidebarItemComponent } from '../projects/ion/src/lib/sidebar/sidebar-item/sidebar-item.component';
import { SidebarComponent } from '../projects/ion/src/lib/sidebar/sidebar.component';
import { IonIconComponent } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Navigation/Sidebar',
  component: SidebarComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        IonIconComponent,
        SidebarItemComponent,
        SidebarGroupComponent,
      ],
      imports: [],
    }),
  ],
} as Meta;

const Template: Story<SidebarComponent> = (args: SidebarComponent) => ({
  component: SidebarComponent,
  props: { ...args },
});

export const Default = Template.bind({});
Default.args = {};
