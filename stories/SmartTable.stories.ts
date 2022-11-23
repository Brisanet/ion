import { CheckboxComponent } from './../projects/ion/src/lib/checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular';
import { TagComponent } from '../projects/ion/src/public-api';
import { PaginationComponent } from '../projects/ion/src/lib/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { SmartTableComponent } from '../projects/ion/src/lib/smart-table/smart-table.component';
import { SafeAny } from '../projects/ion/src/lib/utils/safe-any';
import { ButtonModule } from '../projects/ion/src/lib/button/button.module';

export default {
  title: 'Ion/Data Display/SmartTable',
  component: SmartTableComponent,
} as Meta;

const Template: Story<SmartTableComponent> = (args: SmartTableComponent) => ({
  component: SmartTableComponent,
  props: { ...args, events: action('events') },
  moduleMetadata: {
    declarations: [TagComponent, CheckboxComponent, PaginationComponent],
    imports: [CommonModule, FormsModule, ButtonModule],
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

const actions = [
  {
    label: 'Excluir',
    icon: 'trash',
    show: (row: SafeAny): boolean => {
      return !row.deleted;
    },
    call: (row: SafeAny): void => {
      row.name = 'ITEM DELETED';
      row.deleted = true;
    },
  },
  {
    label: 'Editar',
    icon: 'pencil',
  },
];

export const Basic = Template.bind({});
Basic.args = {
  config: {
    check: true,
    data,
    columns,
    actions,
    pagination: {
      total: 8,
    },
  },
};
