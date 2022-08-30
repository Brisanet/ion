import { fireEvent, render, screen } from '@testing-library/angular';
import { IonIconComponent } from '../icon/icon.component';
import { SafeAny } from '../utils/safe-any';
import {
  ActionTable,
  Column,
  IonTableProps,
  TableComponent,
} from './table.component';

const columns: Column[] = [
  {
    key: 'id',
    label: 'Código',
  },
  {
    key: 'name',
    label: 'Name',
    sort: true,
  },
];

const data = [
  { id: 1, name: 'Meteora', deleted: false },
  { id: 2, name: 'One More Light', deleted: false },
  { id: 3, name: 'Hybrid Theory', deleted: true },
  { id: 4, name: 'Minutes to Midnight', deleted: false },
];

const defaultProps: IonTableProps = {
  config: {
    data,
    columns,
  },
};

const sut = async (customProps: IonTableProps = defaultProps) => {
  await render(TableComponent, {
    componentProperties: customProps,
    declarations: [IonIconComponent],
  });
};

describe('TableComponent', () => {
  beforeEach(async () => {
    await sut();
  });

  it('should render table', async () => {
    expect(screen.getByTestId('ion-table'));
  });

  it('should not render actions column when not has', async () => {
    expect(screen.queryAllByText('Ações')).toHaveLength(0);
  });

  it('should not render checkbox in header by default', async () => {
    expect(screen.queryAllByTestId('table-check-all')).toHaveLength(0);
  });

  it('should not render checkbox in row by default', async () => {
    expect(screen.queryAllByTestId('row-0-check')).toHaveLength(0);
  });

  it.each(columns)('should render table with column', async ({ label }) => {
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it.each(data)('should render data in table', async ({ name }) => {
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it('should show icon sort when column is sortable', () => {
    expect(screen.queryAllByTestId('sort-by-id')).toHaveLength(0);
    expect(screen.queryAllByTestId('sort-by-name')).toHaveLength(1);
  });

  it('should sort the data of a column (string)', async () => {
    expect(screen.getByTestId('row-0-name')).toContainHTML('Meteora');
    fireEvent.click(screen.getByTestId('sort-by-name'));
    expect(screen.getByTestId('row-0-name')).toContainHTML('Hybrid Theory');
  });
});

describe('Table > Actions', () => {
  const actions: ActionTable[] = [
    {
      label: 'Excluir',
      icon: 'trash',
      show: (row: SafeAny) => {
        return !row.deleted;
      },
    },
    {
      label: 'Editar',
      icon: 'pencil',
      call: (row: SafeAny) => {
        row.name = 'editado!';
      },
    },
  ];
  const tableWithActions = {
    ...defaultProps,
    config: {
      ...defaultProps.config,
      actions,
    },
  } as IonTableProps;

  it('should show actions column when has action', async () => {
    await sut(tableWithActions);
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });

  it.each(actions)('should render icon action', async ({ icon }) => {
    await sut(tableWithActions);
    expect(document.getElementById(`ion-icon-${icon}`)).toBeInTheDocument();
  });

  it('should not render trash icon when the item is deleted', async () => {
    const tableItemDeleted = {
      ...tableWithActions,
    } as IonTableProps;

    tableItemDeleted.config.data = [
      { id: 1, name: 'Item Deleted', deleted: true },
    ];

    await sut(tableItemDeleted);
    expect(document.getElementById('ion-icon-trash')).not.toBeInTheDocument();
  });

  it('should call action when clicked in action', async () => {
    await sut(tableWithActions);
    const removeOption = document.getElementById('ion-icon-pencil');
    fireEvent.click(removeOption);
    expect(screen.getByText('editado!')).toBeInTheDocument();
  });

  it('should show input check in header', async () => {
    const withChecks = { ...tableWithActions };
    withChecks.config.check = true;
    await sut(tableWithActions);
    expect(screen.getByTestId('table-check-all')).toBeInTheDocument();

    tableWithActions.config.data.forEach((row, index) => {
      expect(screen.getByTestId(`row-${index}-check`)).toBeInTheDocument();
    });
  });

  it('should show input check in all rows', async () => {
    const withChecks = { ...tableWithActions };
    withChecks.config.check = true;
    tableWithActions.config.data.push({
      id: 2,
      name: 'iPhone',
      deleted: false,
    });
    await sut(tableWithActions);
    tableWithActions.config.data.forEach((row, index) => {
      expect(screen.getByTestId(`row-${index}-check`)).toBeInTheDocument();
    });
  });

  it.skip('should select a row', async () => {
    const withChecks = { ...tableWithActions };
    withChecks.config.check = true;
    await sut(tableWithActions);
    screen.debug();
  });
});
