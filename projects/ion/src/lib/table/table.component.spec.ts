import { CheckboxComponent } from './../checkbox/checkbox.component';
import { fireEvent, render, screen } from '@testing-library/angular';
import { IonIconComponent } from '../icon/icon.component';
import { TagComponent } from '../tag/tag.component';
import { SafeAny } from '../utils/safe-any';
import {
  ActionTable,
  Column,
  IonTableProps,
  TableComponent,
} from './table.component';

const disabledArrowColor = '#CED2DB';
const enabledArrowColor = '#0858CE';

const columns: Column[] = [
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

const defaultProps: IonTableProps = {
  config: {
    data,
    columns,
  },
};

const sut = async (customProps: IonTableProps = defaultProps) => {
  await render(TableComponent, {
    componentProperties: customProps,
    declarations: [IonIconComponent, TagComponent, CheckboxComponent],
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

  it('should render with custom width', async () => {
    const columnLg = defaultProps.config.columns[0];
    const customSize = 90;
    columnLg.width = customSize;
    expect(await screen.findByTestId('column-' + columnLg.key)).toHaveStyle(
      `width: ${customSize}%`
    );
  });

  it('should show icon sort when column is sortable', () => {
    expect(screen.queryAllByTestId('sort-by-id')).toHaveLength(1);
  });

  it('should sort asc the data of a column (string)', async () => {
    expect(screen.getByTestId('row-0-name')).toContainHTML('Meteora');
    fireEvent.click(screen.getByTestId('sort-by-name'));
    expect(screen.getByTestId('row-0-name')).toContainHTML('Hybrid Theory');
  });

  it('should sort desc the data of a column (number)', async () => {
    fireEvent.click(screen.getByTestId('sort-by-id'));
    fireEvent.click(screen.getByTestId('sort-by-id'));
    expect(screen.getByTestId('row-0-id')).toContainHTML('4');
  });

  it('should sort asc and desc the data of a column (number)', async () => {
    const columnToClick = 'sort-by-id';
    const cellToCheck = 'row-0-id';

    fireEvent.click(screen.getByTestId(columnToClick));
    expect(screen.getByTestId(cellToCheck)).toContainHTML('1');
    fireEvent.click(screen.getByTestId(columnToClick));
    expect(screen.getByTestId(cellToCheck)).toContainHTML('4');
    fireEvent.click(screen.getByTestId(columnToClick));
    expect(screen.getByTestId(cellToCheck)).toContainHTML('1');
  });

  afterEach(() => {
    defaultProps.config.data = JSON.parse(JSON.stringify(data));
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
});

describe('Table > Checkbox', () => {
  const eventSelect = jest.fn();
  const tableWithSelect: IonTableProps = {
    config: {
      columns: JSON.parse(JSON.stringify(columns)),
      data: JSON.parse(JSON.stringify(data)),
      check: true,
    },
    events: {
      emit: eventSelect,
    } as SafeAny,
  };

  beforeEach(async () => {
    tableWithSelect.config.data = JSON.parse(JSON.stringify(data));
    await sut(tableWithSelect);
  });

  it('should show input check in header', async () => {
    expect(screen.getByTestId('table-check-all')).toBeInTheDocument();
  });

  it('should show input check in all rows', async () => {
    tableWithSelect.config.data.forEach((row, index) => {
      expect(screen.getByTestId(`row-${index}-check`)).toBeInTheDocument();
    });
  });

  it('should select all rows', async () => {
    const checkFirstRow = screen.getByTestId('table-check-all');
    fireEvent.click(checkFirstRow);

    tableWithSelect.config.data.forEach((row, index) => {
      expect(screen.getByTestId(`row-${index}-check`)).toHaveAttribute(
        'ng-reflect-state',
        'checked'
      );
    });

    expect(eventSelect).toBeCalledWith({
      rows_selected: tableWithSelect.config.data,
    });
  });

  it('should select a row', async () => {
    const indexToSelect = 0;
    const checkFirstRow = screen.getByTestId(`row-${indexToSelect}-check`);
    fireEvent.click(checkFirstRow);

    expect(eventSelect).toBeCalledWith({
      rows_selected: [{ ...data[indexToSelect], selected: true }],
    });
  });

  it('should unchecked all rows when click and check all and has a or more rows selected', async () => {
    fireEvent.click(screen.getByTestId('row-0-check'));
    fireEvent.click(screen.getByTestId('row-1-check'));

    fireEvent.click(screen.getByTestId('table-check-all'));

    tableWithSelect.config.data.forEach((row, index) => {
      expect(screen.getByTestId(`row-${index}-check`)).not.toBeChecked();
    });
  });

  it('should add checked class when the selected row', async () => {
    fireEvent.click(screen.getByTestId('row-0-check'));

    expect(screen.getByTestId(`row-0`)).toHaveClass('checked');
  });

  it('should add checked class only on the selected row', async () => {
    fireEvent.click(screen.getByTestId('row-0-check'));

    expect(screen.getByTestId(`row-1`)).not.toHaveClass('checked');
  });

  it('should add the checked class to all rows', async () => {
    fireEvent.click(screen.getByTestId('table-check-all'));

    tableWithSelect.config.data.forEach((row, index) => {
      expect(screen.getByTestId(`row-${index}`)).toHaveClass('checked');
    });
  });

  it('should add undetermined state in the checkbox that marks all options', async () => {
    fireEvent.click(screen.getByTestId('row-0-check'));

    expect(screen.getByTestId(`table-check-all`)).toHaveAttribute(
      'ng-reflect-state',
      'indeterminate'
    );
  });

  it('should add checked state in the checkbox that marks all options', async () => {
    tableWithSelect.config.data.forEach((row, index) => {
      fireEvent.click(screen.getByTestId(`row-${index}-check`));
    });

    expect(screen.getByTestId(`table-check-all`)).toHaveAttribute(
      'ng-reflect-state',
      'checked'
    );
  });

  afterEach(() => {
    eventSelect.mockClear();
  });

  afterEach(() => {
    eventSelect.mockClear();
  });
});

describe('Table > Differents columns data type', () => {
  const eventSelect = jest.fn();
  const columnIcon = 'check';
  const tableDifferentColumns: IonTableProps = {
    config: {
      columns: [
        ...JSON.parse(JSON.stringify(columns)),
        {
          key: 'year',
          label: 'Year',
          type: 'tag',
          sort: false,
          tag: {
            icon: columnIcon,
          },
        },
      ],
      data: JSON.parse(JSON.stringify(data)),
    },
    events: {
      emit: eventSelect,
    } as SafeAny,
  };

  describe('Tag', () => {
    it('should show icon in tag by column icon', async () => {
      await sut(tableDifferentColumns);
      expect(
        document.getElementById(`ion-icon-${columnIcon}`)
      ).toBeInTheDocument();
      expect(document.getElementById('ion-icon-union')).not.toBeInTheDocument();
    });

    it.each(['union', 'star-solid'])(
      'should show %s icon in tag by row data',
      async (iconRow: string) => {
        const tableWithCustomIconInTag = JSON.parse(
          JSON.stringify(tableDifferentColumns)
        ) as IonTableProps;

        const columns = tableWithCustomIconInTag.config.columns;
        const lastColumn = columns.length - 1;
        columns[lastColumn].tag = {
          iconKey: 'icon',
        };

        await sut(tableWithCustomIconInTag);
        expect(
          document.getElementById(`ion-icon-${iconRow}`)
        ).toBeInTheDocument();
      }
    );
  });

  describe('Sort', () => {
    it('should not show icon sort when column not is sortable', async () => {
      await sut(tableDifferentColumns);
      expect(screen.queryAllByTestId('sort-by-year')).toHaveLength(0);
    });

    it('should render arrow down blue when sort desc', async () => {
      await sut(tableDifferentColumns);
      fireEvent.click(screen.getByTestId('sort-by-id'));
      const arrowUp = screen.getByTestId('sort-by-id').children[0];
      const arrowDown = screen.getByTestId('sort-by-id').children[1];
      expect(arrowUp).toHaveAttribute('fill', disabledArrowColor);
      expect(arrowDown).toHaveAttribute('fill', enabledArrowColor);
    });

    it('should render arrow up blue when sort asc', async () => {
      tableDifferentColumns.config.columns = [
        {
          label: 'Albuns',
          sort: true,
          key: 'albuns',
        },
      ];
      await sut(JSON.parse(JSON.stringify(tableDifferentColumns)));
      fireEvent.click(screen.getByTestId('sort-by-albuns'));
      fireEvent.click(screen.getByTestId('sort-by-albuns'));
      const arrowUp = screen.getByTestId('sort-by-albuns').children[0];
      const arrowDown = screen.getByTestId('sort-by-albuns').children[1];
      expect(arrowUp).toHaveAttribute('fill', enabledArrowColor);
      expect(arrowDown).toHaveAttribute('fill', disabledArrowColor);
    });

    it('should render arrow up and arrow down gray when not sorted', async () => {
      tableDifferentColumns.config.columns = [
        {
          label: 'Albuns',
          sort: true,
          key: 'albuns',
        },
      ];
      await sut(JSON.parse(JSON.stringify(tableDifferentColumns)));
      const arrowUp = screen.getByTestId('sort-by-albuns').children[0];
      const arrowDown = screen.getByTestId('sort-by-albuns').children[1];
      expect(arrowUp).toHaveAttribute('fill', disabledArrowColor);
      expect(arrowDown).toHaveAttribute('fill', disabledArrowColor);
    });
  });
});
