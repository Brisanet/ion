import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { TableActionPopoverComponent } from '../projects/ion/src/lib/smart-table/mocks/tableActionPopover';
import { IonSmartTableModule } from '../projects/ion/src/public-api';

const Template: Story<TableActionPopoverComponent> = (
  args: TableActionPopoverComponent
) => ({
  component: TableActionPopoverComponent,
  props: {
    ...args,
  },
  moduleMetadata: {
    declarations: [TableActionPopoverComponent],
    imports: [CommonModule, IonSmartTableModule],
    entryComponents: [TableActionPopoverComponent],
  },
});

export const WithPopoverAction = Template.bind({});
WithPopoverAction.args = {};

export default {
  title: 'Ion/Data Display/SmartTable',
  component: TableActionPopoverComponent,
} as Meta<TableActionPopoverComponent>;
