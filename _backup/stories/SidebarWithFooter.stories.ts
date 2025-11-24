import { Meta, Story } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { SidebarWithFooterComponent } from '../projects/ion/src/lib/sidebar/mocks/sidebarWithFooter.component';
import { IonSidebarModule } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Navigation/Sidebar',
  component: SidebarWithFooterComponent,
} as Meta<SidebarWithFooterComponent>;

const Template: Story<SidebarWithFooterComponent> = (args) => ({
  component: SidebarWithFooterComponent,
  props: {
    ...args,
  },
  moduleMetadata: {
    declarations: [SidebarWithFooterComponent],
    imports: [CommonModule, IonSidebarModule],
    entryComponents: [SidebarWithFooterComponent],
  },
});

export const WithFooter = Template.bind({});
