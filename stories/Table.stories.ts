import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';
import { TableComponent } from '../projects/ion/src/lib/table/table.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { SafeAny } from '../projects/ion/src/lib/utils/safe-any';
import { TagComponent } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Display/Table',
  component: TableComponent,
} as Meta;

const Template: Story<TableComponent> = (args: TableComponent) => ({
  component: TableComponent,
  props: args,
  moduleMetadata: {
    declarations: [TableComponent, IonIconComponent, TagComponent],
    imports: [CommonModule],
  },
});

const data = [
  { id: 1, name: 'Meteora', deleted: false, year: 2003 },
  { id: 2, name: 'One More Light', deleted: false, year: 2017 },
  {
    id: 3,
    name: 'Hybrid Theory',
    deleted: true,
    year: 2000,
    icon: 'star-solid',
  },
  {
    id: 4,
    name: 'Minutes to Midnight',
    deleted: false,
    year: 2007,
    icon: 'union',
  },
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
    show: (row: SafeAny) => {
      return !row.deleted;
    },
    call: (row: SafeAny) => {
      row.name += ' DELETED';
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
    data,
    columns,
  },
};

export const WithActions = Template.bind({});
WithActions.args = {
  config: {
    data,
    columns,
    actions,
  },
};

export const WithCheck = Template.bind({});
WithCheck.args = {
  config: {
    data,
    columns,
    check: true,
  },
};

export const WithTagByColumn = Template.bind({});
WithTagByColumn.args = {
  config: {
    data,
    columns: [
      ...columns,
      {
        key: 'year',
        label: 'Year',
        sort: true,
        type: 'tag',
        tag: {
          icon: 'check',
        },
      },
    ],
  },
};

export const WithTagByRow = Template.bind({});
const customDataWithIcon = JSON.parse(JSON.stringify(data));

WithTagByRow.args = {
  config: {
    data: customDataWithIcon,
    columns: [
      ...columns,
      {
        key: 'year',
        label: 'Year',
        sort: true,
        type: 'tag',
        tag: {
          // icon: 'check',
          iconKey: 'icon',
        },
      },
    ],
  },
};
