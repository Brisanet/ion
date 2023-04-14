import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular';
import { IonSmartTableModule } from '../projects/ion/src/public-api';
import { IonSmartTableComponent } from '../projects/ion/src/lib/smart-table/smart-table.component';
import { SafeAny } from '../projects/ion/src/lib/utils/safe-any';

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
  debounceOnSort = 0
): SafeAny {
  return {
    config: {
      check: true,
      data: tableData,
      columns: tableColumns,
      actions: tableActions,
      pagination: {
        total: paginationTotal,
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
