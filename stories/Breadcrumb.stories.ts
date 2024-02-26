import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';

import { IonBreadcrumbComponent } from '../projects/ion/src/lib/breadcrumb/breadcrumb.component';
import { IonDropdownModule } from '../projects/ion/src/lib/dropdown/dropdown.module';
import { IonIconModule } from './../projects/ion/src/lib/icon/icon.module';

export default {
  title: 'Ion/Navigation/Breadcrumb',
  component: IonBreadcrumbComponent,
} as Meta;

const Template: Story<IonBreadcrumbComponent> = (
  args: IonBreadcrumbComponent
) => ({
  component: IonBreadcrumbComponent,
  props: args,
  moduleMetadata: {
    declarations: [IonBreadcrumbComponent],
    imports: [CommonModule, IonIconModule, IonDropdownModule],
  },
});

const breadcrumbs = [
  { label: 'Titulo 1', link: '/titulo1' },
  { label: 'Titulo 2', link: '/titulo2' },
  { label: 'Titulo 3', link: '/titulo3' },
  { label: 'Titulo 4', link: '/titulo4' },
  { label: 'Titulo 5', link: '/titulo5' },
  { label: 'Titulo 6', link: '/titulo6' },
  { label: 'Titulo 7', link: '/titulo7' },
  { label: 'Titulo 8', link: '/titulo8' },
  { label: 'Titulo 9', link: '/titulo9' },
];

export const Initials = Template.bind({});
Initials.args = {
  breadcrumbs,
};

export const WithTruncation = Template.bind({});
WithTruncation.args = {
  breadcrumbs,
  truncate: true,
};
