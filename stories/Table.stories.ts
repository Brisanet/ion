import { Meta, Story } from '@storybook/angular';
import { IonTableComponent } from '../projects/ion/src/lib/table/table.component';
import { SafeAny } from '../projects/ion/src/lib/utils/safe-any';
import { IonTableModule } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Display/Table',
  component: IonTableComponent,
} as Meta;

const Template: Story<IonTableComponent> = (args: IonTableComponent) => ({
  component: IonTableComponent,
  props: args,
  moduleMetadata: {
    imports: [IonTableModule],
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
  {
    id: 5,
    name: 'A Thousand Suns',
    deleted: false,
    year: 2010,
    icon: 'union',
  },
  {
    id: 6,
    name: 'Living Things',
    deleted: false,
    year: 2012,
    icon: 'union',
  },
  {
    id: 7,
    name: 'The Hunting Party',
    deleted: false,
    year: 2014,
    icon: 'union',
  },
  {
    id: 8,
    name: 'Hybrid Theory',
    deleted: true,
    year: 2000,
    icon: 'star-solid',
  },
  {
    id: 9,
    name: 'Minutes to Midnight',
    deleted: false,
    year: 2007,
    icon: 'union',
  },
  {
    id: 10,
    name: 'A Thousand Suns',
    deleted: false,
    year: 2010,
    icon: 'union',
  },
  {
    id: 11,
    name: 'Living Things',
    deleted: false,
    year: 2012,
    icon: 'union',
  },
  {
    id: 12,
    name: 'The Hunting Party',
    deleted: false,
    year: 2014,
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
    show: (row: SafeAny): boolean => {
      return !row.deleted;
    },
    call: (row: SafeAny): void => {
      row.name += ' DELETED';
    },
    confirm: {
      title: 'Você realmente deseja deletar?',
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

export const CustomWidthCell = Template.bind({});
const customWidth = JSON.parse(JSON.stringify(columns));
customWidth[1].width = 90;
CustomWidthCell.args = {
  config: {
    data,
    columns: customWidth,
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
          iconKey: 'icon',
        },
      },
    ],
  },
};

export const WithPagination = Template.bind({});
WithPagination.args = {
  config: {
    data: [...data, ...data, ...data, ...data],
    columns,
    pagination: {
      total: 46,
      itemsPerPage: 2,
    },
    actions,
  },
};

export const CustomItemsPerPage = Template.bind({});
CustomItemsPerPage.args = {
  config: {
    data: [
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
    ],
    columns,
    pagination: {
      total: 3000,
      itemsPerPage: 7,
    },
  },
};
