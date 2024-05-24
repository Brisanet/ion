import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular';

import { LIST_OF_PAGE_OPTIONS } from '../projects/ion/src/lib/pagination/pagination.component';
import { IonSmartTableComponent } from '../projects/ion/src/lib/smart-table/smart-table.component';
import { SafeAny } from '../projects/ion/src/lib/utils/safe-any';
import {
  ConfigSmartTable,
  IonSmartTableModule,
  IonSpinnerModule,
} from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Display/SmartTable',
  component: IonSmartTableComponent,
} as Meta;

const Template: Story<IonSmartTableComponent<unknown>> = (
  args: IonSmartTableComponent<unknown>
) => ({
  component: IonSmartTableComponent,
  props: { ...args, events: action('events') },
  moduleMetadata: {
    imports: [IonSmartTableModule, IonSpinnerModule],
  },
});

const data = [
  { id: 1, name: 'Meteora', deleted: false, year: 2003 },
  { id: 2, name: 'One More Light', deleted: false, year: 2017 },
];

const longData = [
  { id: 1, name: 'Meteora', deleted: false, year: 2003 },
  { id: 2, name: 'One More Light', deleted: false, year: 2017 },
  {
    id: 3,
    name: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, voluptatibus veniam reiciendis repellendus laborum nam laboriosam est natus ut, delectus iure quis consequuntur eligendi aspernatur, corporis voluptates nulla assumenda adipisci. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, voluptatibus veniam reiciendis repellendus laborum nam laboriosam est natus ut, delectus iure quis consequuntur eligendi aspernatur, corporis voluptates nulla assumenda adipisci. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, voluptatibus veniam reiciendis repellendus laborum nam laboriosam est natus ut, delectus iure quis consequuntur eligendi aspernatur, corporis voluptates nulla assumenda adipisci.',
    deleted: false,
    year: 2017,
  },
  { id: 4, name: 'Slayyyter', deleted: false, year: 2019 },
  { id: 5, name: 'Troubled Paradise', deleted: false, year: 2021 },
];

const doubleLongData = [
  { id: 1, name: 'Meteora', deleted: false, year: 2003 },
  { id: 2, name: 'One More Light', deleted: false, year: 2017 },
  {
    id: 3,
    name: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    deleted: false,
    year: 2023,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, voluptatibus veniam reiciendis repellendus laborum nam laboriosam est natus ut, delectus iure quis consequuntur eligendi aspernatur, corporis voluptates nulla assumenda adipisci. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, voluptatibus veniam reiciendis repellendus laborum nam laboriosam est natus ut, delectus iure quis consequuntur eligendi aspernatur, corporis voluptates nulla assumenda adipisci. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, voluptatibus veniam reiciendis repellendus laborum nam laboriosam est natus ut, delectus iure quis consequuntur eligendi aspernatur, corporis voluptates nulla assumenda adipisci.',
  },
  { id: 4, name: 'Slayyyter', deleted: false, year: 2019 },
  { id: 5, name: 'Troubled Paradise', deleted: false, year: 2021 },
];

const dataWithTag = [
  ...data,
  {
    id: 3,
    name: 'Hybrid Theory',
    tooltip: 'Tooltip personalizado 1',
    deleted: false,
    year: 2000,
    icon: 'star-solid',
    status: 'warning',
  },
  {
    id: 4,
    name: 'Minutes to Midnight',
    tooltip: 'Tooltip personalizado 2',
    deleted: false,
    year: 2007,
    icon: 'union',
    status: 'info',
  },
];

const dataWithLink = [
  {
    id: 1,
    name: 'Meteora',
    deleted: false,
    year: 2003,
  },
  {
    id: 2,
    name: 'One More Light',
    deleted: false,
    year: 2017,
  },
  {
    id: 3,
    name: 'Hybrid Theory',
    deleted: true,
    year: 2000,
  },
  {
    id: 4,
    name: 'Minutes to Midnight',
    deleted: false,
    year: 2007,
  },
  {
    id: 5,
    name: 'A Thousand Suns',
    deleted: false,
    year: 2010,
  },
  {
    id: 6,
    name: 'Living Things',
    deleted: false,
    year: 2012,
  },
  {
    id: 7,
    name: 'The Hunting Party',
    deleted: false,
    year: 2014,
  },
  {
    id: 8,
    name: 'Hybrid Theory',
    deleted: true,
    year: 2000,
  },
  {
    id: 9,
    name: 'Minutes to Midnight',
    deleted: false,
    year: 2007,
  },
  {
    id: 10,
    name: 'A Thousand Suns',
    deleted: false,
    year: 2010,
  },
  {
    id: 11,
    name: 'Living Things',
    deleted: false,
    year: 2012,
  },
  {
    id: 12,
    name: 'The Hunting Party',
    deleted: false,
    year: 2014,
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

const withTagColumns = [
  ...columns,
  {
    key: 'year',
    label: 'Year',
    sort: true,
    type: 'tag',
    tag: {
      icon: 'check',
      status: 'success',
      tooltipKey: 'tooltip',
    },
  },
];

const withTagByRowColumns = [
  ...columns,
  {
    key: 'year',
    label: 'Year',
    sort: true,
    type: 'tag',
    tag: {
      iconKey: 'icon',
      statusKey: 'status',
    },
  },
];

const columnsWithWidth = [
  {
    key: 'id',
    label: 'Código',
    sort: true,
    width: 25,
  },
  {
    key: 'name',
    label: 'Nome',
    sort: false,
    width: 50,
  },
  {
    key: 'year',
    label: 'Ano',
    sort: true,
    width: 25,
  },
];

const columnsWithMultipleText = [
  {
    key: 'id',
    label: 'Código',
    sort: true,
    width: 5,
  },
  {
    key: 'name',
    label: 'Nome',
    sort: false,
    width: 30,
  },
  {
    key: 'year',
    label: 'Ano',
    sort: true,
    width: 5,
  },
  {
    key: 'desc',
    label: 'desc',
    sort: true,
    width: 60,
    hideLongData: true,
  },
];

const columnsWithLink = [
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
  {
    key: 'link',
    label: 'URL',
    sort: true,
    type: 'link',
    link: {
      icon: 'access2',
      bold: true,
      label: (row): string => row.name,
      tooltipConfig: {
        text: (row): string => row.name,
      },
    },
  },
];

const actions = [
  {
    label: 'Excluir',
    icon: 'trash',
    disabled: (row: SafeAny): boolean => {
      return !row.deleted;
    },
    call: (row: SafeAny): void => {
      row.name = 'ITEM DELETED';
      row.deleted = true;
    },
    confirm: {
      title: 'Você realmente deseja deletar?',
      description: 'você estará excluindo um disco da sua base de dados!',
      type: 'negative',
    },
  },
  {
    label: 'Editar',
    icon: 'pencil',
    show: (row: SafeAny): boolean => {
      return !row.name;
    },
    call: (row: SafeAny): void => {
      row.name = '';
    },
    confirm: {
      title: 'Você realmente deseja deletar?',
      description: 'Você estará excluindo um disco da sua base de dados!',
      type: 'negative',
    },
  },
  {
    label: 'Teste',
    icon: 'pencil',
    show: (row: SafeAny): boolean => {
      return !row.year;
    },
    call: (row: SafeAny): void => {
      row.year = '';
    },
    confirm: {
      title: 'Você realmente deseja deletar?',
      description: 'Você estará excluindo um disco da sua base de dados!',
      type: 'negative',
    },
    tooltipConfig: {
      ionTooltipTitle: 'Tooltip customizada',
    },
  },
];

function returnTableConfig(
  tableData,
  tableColumns,
  tableActions,
  paginationTotal,
  debounceOnSort = 0,
  pageSizeOptions = LIST_OF_PAGE_OPTIONS,
  hideLongData?
): { config: ConfigSmartTable<SafeAny> } {
  return {
    config: {
      check: true,
      data: tableData,
      columns: tableColumns,
      actions: tableActions,
      pagination: {
        total: paginationTotal,
        pageSizeOptions,
      },
      debounceOnSort,
      hideLongData,
    },
  };
}

export const Basic = Template.bind({});
Basic.args = returnTableConfig(data, columns, actions, 2);

export const Loading = Template.bind({});
Loading.args = {
  config: {
    loading: true,
    check: true,
    data: [],
    columns: columns,
    pagination: {
      total: 2,
      LIST_OF_PAGE_OPTIONS,
    },
  },
};

export const NoData = Template.bind({});
NoData.args = returnTableConfig([], columns, actions, 0);

export const ItemsPerPageOpenAboveButton = Template.bind({});
ItemsPerPageOpenAboveButton.args = {
  config: {
    check: true,
    data,
    columns,
    actions,
    pagination: {
      total: 2,
      pageSizeOptions: LIST_OF_PAGE_OPTIONS,
      openItemsPerPageAbove: true,
    },
  },
};

export const SelectableCells = Template.bind({});
SelectableCells.args = returnTableConfig(data, selectableColumns, actions, 2);

export const SortWithDebounce = Template.bind({});
SortWithDebounce.args = returnTableConfig(data, columns, actions, 2, 2000);

export const WithTagByColumn = Template.bind({});
WithTagByColumn.args = returnTableConfig(
  dataWithTag,
  withTagColumns,
  actions,
  2
);

const columnsWithTooltip = [
  {
    key: 'id',
    label: 'Código',
    sort: true,
    configTooltip: {
      ionTooltipTitle: 'Saiba mais sobre esta coluna e suas funcionalidades.',
    },
  },
  {
    key: 'name',
    label: 'Nome',
    sort: false,
    configTooltip: {
      ionTooltipTitle: 'Saiba mais sobre esta coluna e suas funcionalidades.',
    },
  },
];

export const ColumnHeaderWithTooltip = Template.bind({});
ColumnHeaderWithTooltip.args = returnTableConfig(
  data,
  columnsWithTooltip,
  actions,
  2
);

export const WithTagByRow = Template.bind({});
WithTagByRow.args = returnTableConfig(
  dataWithTag,
  withTagByRowColumns,
  actions,
  2
);

export const LargePagination = Template.bind({});
LargePagination.args = returnTableConfig(data, columns, actions, 110);

export const CustomPageSizeOptions = Template.bind({});
CustomPageSizeOptions.args = returnTableConfig(
  data,
  columns,
  actions,
  2000,
  0,
  [10, 15, 30, 50, 100]
);

export const ActionWithDanger = Template.bind({});
ActionWithDanger.args = returnTableConfig(
  data,
  columns,
  [{ ...actions[0], danger: true }],
  2
);

export const PopConfirmDynamicDescription = Template.bind({});
PopConfirmDynamicDescription.args = returnTableConfig(
  data,
  columns,
  [
    {
      ...actions[0],
      confirm: {
        ...actions[0].confirm,
        description: undefined,
        dynamicDescription: (row: SafeAny): string => {
          return `Você estará excluindo o disco ${row.name} da sua base de dados!`;
        },
        type: 'info',
      },
      disabled: (): boolean => {
        return false;
      },
    },
  ],
  2
);

export const WithEllipsisOnCell = Template.bind({});
WithEllipsisOnCell.args = returnTableConfig(
  longData,
  columnsWithWidth,
  actions,
  2,
  2000,
  [10, 15, 30, 50, 100],
  true
);

export const WithEllipsisInSpecificColumns = Template.bind({});
WithEllipsisInSpecificColumns.args = returnTableConfig(
  doubleLongData,
  columnsWithMultipleText,
  actions,
  2,
  2000,
  [10, 15, 30, 50, 100],
  false
);

export const WithTooltipInActions = Template.bind({});
WithTooltipInActions.args = returnTableConfig(
  data,
  columns,
  actions,
  2,
  2000,
  [10, 15, 30, 50, 100]
);

export const WithLinkInCell = Template.bind({});
WithLinkInCell.args = returnTableConfig(
  dataWithLink,
  columnsWithLink,
  actions,
  2,
  2000,
  [10, 15, 30, 50, 100],
  false
);

export const DataWithPipe = Template.bind({});
DataWithPipe.args = returnTableConfig(
  [
    {
      id: 1,
      name: 'The name of the wind',
      deleted: false,
      year: 2003,
      release_date: '2007-03-27',
      value: 53.8,
      empty: '',
    },
    {
      id: 2,
      name: 'The Wise Mans Fear',
      deleted: false,
      year: 2003,
      release_date: '2011-03-01',
      value: 1016,
      empty: '',
    },
    {
      id: 3,
      name: 'Today book',
      deleted: false,
      year: 2003,
      release_date: new Date(),
      value: 0.9,
      empty: '',
    },
  ],
  [
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
    {
      key: 'release_date',
      label: 'Lançamento',
      pipe: {
        apply: 'date',
        format: 'dd/MM/yyyy',
      },
      sort: false,
    },
    {
      key: 'value',
      label: 'Valor',
      pipe: {
        apply: 'currency',
      },
      sort: false,
    },
    {
      key: 'empty',
      label: 'empty',
      sort: false,
    },
  ],
  actions,
  2
);
