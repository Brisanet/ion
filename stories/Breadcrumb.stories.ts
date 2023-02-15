import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';
import { IonIconComponent } from '../projects/ion/src/public-api';
import { BreadcrumbComponent } from '../projects/ion/src/lib/breadcrumb/breadcrumb.component';

export default {
  title: 'Ion/Navigation/Breadcrumb',
  component: BreadcrumbComponent,
} as Meta;

const Template: Story<BreadcrumbComponent> = (args: BreadcrumbComponent) => ({
  component: BreadcrumbComponent,
  props: args,
  moduleMetadata: {
    declarations: [BreadcrumbComponent, IonIconComponent],
    imports: [CommonModule],
  },
});

const breadcrumbs = [
  { label: 'Home', link: '/home' },
  { label: 'Recursos', link: '/recursos' },
  { label: 'Técnico', link: '/recursos/1' },
];

export const Initials = Template.bind({});
Initials.args = {
  breadcrumbs,
};
