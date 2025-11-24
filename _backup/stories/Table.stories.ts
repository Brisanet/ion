import { Meta, Story } from '@storybook/angular';

import { IonTableComponent } from '../projects/ion/src/lib/table/table.component';
import { SafeAny } from '../projects/ion/src/lib/utils/safe-any';
import {
  ColumnType,
  IonTableModule,
  TooltipPosition,
  TooltipTrigger,
} from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Display/Table',
  component: IonTableComponent,
} as Meta;

const Template: Story<IonTableComponent<unknown>> = (
  args: IonTableComponent<unknown>
) => ({
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
  {
    id: 5,
    name: 'A Thousand Suns',
    deleted: false,
    year: 2010,
    icon: 'union',
    status: 'info',
  },
  {
    id: 6,
    name: 'Living Things',
    deleted: false,
    year: 2012,
    icon: 'union',
    status: 'info',
  },
  {
    id: 7,
    name: 'The Hunting Party',
    deleted: false,
    year: 2014,
    icon: 'union',
    status: 'info',
  },
  {
    id: 8,
    name: 'Hybrid Theory',
    deleted: true,
    year: 2000,
    icon: 'star-solid',
    status: 'warning',
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
    label: 'Name',
    sort: true,
  },
];

const dataWithColumnBoolean = [
  { id: 1, name: 'Meteora', available: true },
  { id: 2, name: 'One More Light', available: false },
  {
    id: 3,
    name: 'Hybrid Theory',
    available: true,
    icon: 'star-solid',
    status: 'warning',
  },
  {
    id: 4,
    name: 'Minutes to Midnight',
    available: false,
    icon: 'union',
    status: 'info',
  },
  {
    id: 5,
    name: 'A Thousand Suns',
    available: true,
    icon: 'union',
    status: 'info',
  },
  {
    id: 6,
    name: 'Living Things',
    available: false,
    icon: 'union',
    status: 'info',
  },
  {
    id: 7,
    name: 'The Hunting Party',
    available: false,
    icon: 'union',
    status: 'info',
  },
  {
    id: 8,
    name: 'Hybrid Theory',
    available: false,
    icon: 'star-solid',
    status: 'warning',
  },
  {
    id: 9,
    name: 'Minutes to Midnight',
    available: true,
  },
  {
    id: 10,
    name: 'A Thousand Suns',
    available: true,
  },
  {
    id: 11,
    name: 'Living Things',
    available: false,
  },
  {
    id: 12,
    name: 'The Hunting Party',
    available: true,
  },
];

const columnsWithBooleanDefault = [
  {
    key: 'id',
    label: 'Código',
    sort: true,
  },
  {
    key: 'name',
    label: 'Nome',
    sort: true,
  },
  {
    key: 'available',
    label: 'Disponível',
    sort: true,
    type: ColumnType.BOOLEAN,
  },
];

const columnsWithBooleanCustom = [
  {
    key: 'id',
    label: 'Código',
    sort: true,
  },
  {
    key: 'name',
    label: 'Nome',
    sort: true,
  },
  {
    key: 'available',
    label: 'Disponível',
    sort: true,
    type: ColumnType.BOOLEAN,
    booleanText: {
      truthy: 'disponível',
      falsy: 'indisponível',
    },
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
      label: (row): string => row.name,
      icon: 'access2',
      iconKey: 'icon',
      bold: true,
      disabled: (): boolean => false,
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

const actionsWithLabel = [
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
    showLabel: true,
    rightSideIcon: false,
  },
  {
    label: 'Editar',
    icon: 'pencil',
    showLabel: true,
    rightSideIcon: false,
  },
];

const mockTooltip = {
  ionTooltipTitle: 'Eu sou um tooltip',
  ionTooltipPosition: TooltipPosition.DEFAULT,
  ionTooltipTrigger: TooltipTrigger.DEFAULT,
  ionTooltipColorScheme: 'dark',
  ionTooltipShowDelay: 1000,
  ionTooltipArrowPointAtCenter: true,
};

const columnsWithTooltip = [
  {
    key: 'id',
    label: 'Código',
    sort: true,
    configTooltip: { ...mockTooltip },
  },
  {
    key: 'name',
    label: 'Nome',
    sort: false,
    configTooltip: { ...mockTooltip },
  },
];

export const Basic = Template.bind({});
Basic.args = {
  config: {
    data,
    columns,
  },
};

export const NoData = Template.bind({});
NoData.args = {
  config: {
    data: [],
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

export const WithActionsWithLabel = Template.bind({});
WithActionsWithLabel.args = {
  config: {
    data,
    columns,
    actions: actionsWithLabel,
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

export const ColumnWithBoolean = Template.bind({});
ColumnWithBoolean.args = {
  config: {
    data: dataWithColumnBoolean,
    columns: columnsWithBooleanDefault,
  },
};

export const ColumnWithBooleanCustom = Template.bind({});
ColumnWithBooleanCustom.args = {
  config: {
    data: dataWithColumnBoolean,
    columns: columnsWithBooleanCustom,
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
          status: 'success',
        },
      },
    ],
  },
};

export const ColumnHeaderWithTooltip = Template.bind({});
ColumnHeaderWithTooltip.args = {
  config: {
    data,
    columns: columnsWithTooltip,
    actions,
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
          statusKey: 'status',
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

export const ActionWithDanger = Template.bind({});
ActionWithDanger.args = {
  config: {
    data,
    columns,
    actions: [{ ...actions[0], danger: true }],
    pagination: { total: 2, itemsPerPage: 2 },
  },
};

export const PopConfirmDynamicDescription = Template.bind({});
PopConfirmDynamicDescription.args = {
  config: {
    data,
    columns,
    actions: [
      {
        ...actions[0],
        confirm: {
          ...actions[0].confirm,
          description: undefined,
          dynamicDescription: (row: SafeAny): string => {
            return `Você estará excluindo o disco ${row.name} da sua base de dados!`;
          },
        },
      },
    ],
    pagination: { total: 2, itemsPerPage: 2 },
  },
};

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

export const TableWithLinkInCell = Template.bind({});
TableWithLinkInCell.args = {
  config: {
    data: dataWithLink,
    columns: columnsWithLink,
  },
};
