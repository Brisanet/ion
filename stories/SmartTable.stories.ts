import { CheckboxComponent } from './../projects/ion/src/lib/checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular';
import {
  AlertComponent,
  IonDividerComponent,
  PopConfirmDirective,
  TagComponent,
} from '../projects/ion/src/public-api';
import { PaginationComponent } from '../projects/ion/src/lib/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { SmartTableComponent } from '../projects/ion/src/lib/smart-table/smart-table.component';
import { SafeAny } from '../projects/ion/src/lib/utils/safe-any';
import { ButtonModule } from '../projects/ion/src/lib/button/button.module';
import { PopConfirmComponent } from '../projects/ion/src/lib/popconfirm/popconfirm.component';

export default {
  title: 'Ion/Data Display/SmartTable',
  component: SmartTableComponent,
} as Meta;

const Template: Story<SmartTableComponent> = (args: SmartTableComponent) => ({
  component: SmartTableComponent,
  props: { ...args, events: action('events') },
  moduleMetadata: {
    entryComponents: [PopConfirmComponent],
    declarations: [
      TagComponent,
      CheckboxComponent,
      PaginationComponent,
      PopConfirmDirective,
      PopConfirmComponent,
      AlertComponent,
      IonDividerComponent,
    ],
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
    label: 'Nome',
    sort: false,
  },
];

const selectableColumns = [
  {
    key: 'id',
    label: 'Código',
    sort: true,
    actions: {
      trigger: 'click',
    },
  },
  {
    key: 'name',
    label: 'Nome',
    sort: false,
    actions: {
      trigger: 'click',
    },
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
    confirm: {
      title: 'Você realmente deseja deletar?',
      description: 'você estará excluindo um disco da sua base de dados!',
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
      total: 2,
    },
  },
};

export const NoData = Template.bind({});
NoData.args = {
  config: {
    check: true,
    data: [],
    columns,
    actions,
    pagination: {
      total: 0,
    },
  },
};

export const SelectableCells = Template.bind({});
SelectableCells.args = {
  config: {
    check: true,
    data,
    columns: selectableColumns,
    actions,
    pagination: {
      total: 0,
    },
  },
};
