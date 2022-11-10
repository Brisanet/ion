import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';
import { BreadcrumbComponent } from '../projects/ion/src/lib/breadcrumb/breadcrumb.component';

export default {
  title: 'Ion/Navigation/Breadcrumb',
  component: BreadcrumbComponent,
} as Meta;

const Template: Story<BreadcrumbComponent> = (args: BreadcrumbComponent) => ({
  component: BreadcrumbComponent,
  props: args,
  moduleMetadata: {
    declarations: [BreadcrumbComponent],
    imports: [CommonModule],
  },
});

export const Initials = Template.bind({});
Initials.args = {
  breadcrumbs: [
    { label: 'Home', link: '/home' },
    { label: 'Recursos', link: '/recursos' },
    { label: 'Técnico', link: '/recursos/1' },
  ],
};
