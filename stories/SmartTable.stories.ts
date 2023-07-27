import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular';
import { LIST_OF_PAGE_OPTIONS } from '../projects/ion/src/lib/pagination/pagination.component';
import { IonSmartTableComponent } from '../projects/ion/src/lib/smart-table/smart-table.component';
import { SafeAny } from '../projects/ion/src/lib/utils/safe-any';
import {
  IonSmartTableModule,
  ConfigSmartTable,
  IonSpinnerModule,
} from '../projects/ion/src/public-api';

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

const dataWithTag = [
  ...data,
  {
    id: 3,
    name: 'Hybrid Theory',
    deleted: false,
    year: 2000,
    icon: 'star-solid',
    status: 'warning',
  },
  {
    id: 4,
    name: 'Minutes to Midnight',
    deleted: false,
    year: 2007,
    icon: 'union',
    status: 'info',
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
    },
  ],
  2
);

export const TableCustomRow = Template.bind({});
TableCustomRow.args = {
  config: {
    columns,
  },
};

TableCustomRow.parameters = {
  docs: {
    description: {
      story: `Passos para customizar a linha da tabela.
    1. No HTML do seu componente, crie um ng-template com a diretiva 'let-row' e realize as customizações desejadas.
    A diretiva 'let-row' permite acessar os dados da linha através da identificação do objeto passado na configuração
    da tabela. Veja o exemplo abaixo:

    <ng-template #customTemplate let-row>
      <td>{{row.id}}</td>
      <td>{{ row.name }}</td>
      <td><ion-icon [type]="row.active ? 'check' : 'close'"></ion-icon></td>
      <td>
        <ion-icon
          type="info"
          (click)="onDetails(row)"
          style="cursor: pointer"
        ></ion-icon>
      </td>
    </ng-template>

    2. No arquivo .ts do seu componente, utilize o decorator '@ViewChild' para obter a referência do template customizado
    criado no arquivo HTML.

    export class AppComponent implements OnInit {
      @ViewChild("customTemplate", { static: true })
      customTemplate: TemplateRef<HTMLElement>;

      ...
    }

    3. Passe a referência do template customizado para o atributo customRowTemplate da configuração da tabela.

    export class AppComponent implements OnInit {
      ...

      ngOnInit(): void {
        this.config = {
          data,
          columns,
          customRowTemplate:  this.customTemplate,
        }
      }
    }
      `,
    },
  },
};

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
