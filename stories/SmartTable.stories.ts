import { CheckboxComponent } from './../projects/ion/src/lib/checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import {
  BadgeComponent,
  ButtonComponent,
  DropdownComponent,
  TagComponent,
} from '../projects/ion/src/public-api';
import { PaginationComponent } from '../projects/ion/src/lib/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { SmartTableComponent } from '../projects/ion/src/lib/smart-table/smart-table.component';

export default {
  title: 'Ion/Data Display/SmartTable',
  component: SmartTableComponent,
} as Meta;

const Template: Story<SmartTableComponent> = (args: SmartTableComponent) => ({
  component: SmartTableComponent,
  props: { ...args, events: action('events') },
  moduleMetadata: {
    declarations: [
      IonIconComponent,
      TagComponent,
      CheckboxComponent,
      PaginationComponent,
      ButtonComponent,
      BadgeComponent,
      DropdownComponent,
    ],
    imports: [CommonModule, FormsModule],
  },
});

const data = [
  { id: 1, name: 'Meteora', deleted: false, year: 2003 },
  { id: 2, name: 'One More Light', deleted: false, year: 2017 },
];

const columns = [
  {
    key: 'id',
    label: 'Código',
    sort: true,
  },
  {
    key: 'name',
    label: 'Name',
    sort: true,
  },
];

export const Basic = Template.bind({});
Basic.args = {
  config: {
    check: true,
    data,
    columns,
    pagination: {
      total: 8,
    },
  },
};
