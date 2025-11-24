import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';

import { IonBreadcrumbComponent } from '../projects/ion/src/lib/breadcrumb/breadcrumb.component';
import {
  IonBreadcrumbModule,
  IonDropdownModule,
  IonIconModule,
} from '../projects/ion/src/public-api';
import { BreadcrumbTruncatedComponent } from '../projects/ion/src/lib/breadcrumb/mock/breadcrumb-truncated.component';

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

export const WithoutTruncation = Template.bind({});
WithoutTruncation.args = {
  breadcrumbs: [
    { label: 'Home', link: '/home' },
    { label: 'Recursos', link: '/recursos' },
    { label: 'Técnico', link: '/recursos/1' },
  ],
  truncate: false,
};

const TemplateTruncated: Story<BreadcrumbTruncatedComponent> = (
  args: BreadcrumbTruncatedComponent
) => ({
  component: BreadcrumbTruncatedComponent,
  props: args,
  moduleMetadata: {
    declarations: [BreadcrumbTruncatedComponent],
    entryComponents: [BreadcrumbTruncatedComponent],
    imports: [IonBreadcrumbModule],
  },
});

export const WithTruncation = TemplateTruncated.bind({});
WithTruncation.args = {};
