import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular';
import { LIST_OF_PAGE_OPTIONS } from '../projects/ion/src/lib/pagination/pagination.component';
import { IonSmartTableComponent } from '../projects/ion/src/lib/smart-table/smart-table.component';
import { SafeAny } from '../projects/ion/src/lib/utils/safe-any';
import { IonSmartTableModule } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Display/SmartTable',
  component: IonSmartTableComponent,
} as Meta;

const Template: Story<IonSmartTableComponent> = (
  args: IonSmartTableComponent
) => ({
  component: IonSmartTableComponent,
  props: { ...args, events: action('events') },
  moduleMetadata: {
    imports: [IonSmartTableModule],
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
      type: 'negative',
    },
  },
  {
    label: 'Editar',
    icon: 'pencil',
  },
];

function returnTableConfig(
  tableData,
  tableColumns,
  tableActions,
  paginationTotal,
  debounceOnSort = 0,
  pageSizeOptions = LIST_OF_PAGE_OPTIONS
): SafeAny {
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
    },
  };
}

export const Basic = Template.bind({});
Basic.args = returnTableConfig(data, columns, actions, 2);

export const NoData = Template.bind({});
NoData.args = returnTableConfig([], columns, actions, 0);

export const SelectableCells = Template.bind({});
SelectableCells.args = returnTableConfig(data, selectableColumns, actions, 2);

export const SortWithDebounce = Template.bind({});
SortWithDebounce.args = returnTableConfig(data, columns, actions, 2, 2000);

export const LargePagination = Template.bind({});
LargePagination.args = returnTableConfig(data, columns, actions, 2000);

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
    },
  ],
  2
);
