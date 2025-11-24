import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { OpenPopconfirmComponent } from '../projects/ion/src/lib/popconfirm/mock/open-popconfirm.component';
import { IonSharedModule } from '../projects/ion/src/public-api';
import { IonPopConfirmModule } from './../projects/ion/src/lib/popconfirm/popconfirm.module';

const Template: Story<OpenPopconfirmComponent> = (
  args: OpenPopconfirmComponent
) => ({
  component: OpenPopconfirmComponent,
  props: {
    ...args,
  },
  moduleMetadata: {
    declarations: [OpenPopconfirmComponent],
    imports: [CommonModule, IonSharedModule, IonPopConfirmModule],
    entryComponents: [OpenPopconfirmComponent],
  },
});

export const Directive = Template.bind({});
Directive.args = {};

export default {
  title: 'Ion/Data Display/Popconfirm',
  component: OpenPopconfirmComponent,
} as Meta<OpenPopconfirmComponent>;
