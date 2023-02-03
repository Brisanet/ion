import { fireEvent, render, screen } from '@testing-library/angular';
import { SafeAny } from '../utils/safe-any';
import { FormsModule } from '@angular/forms';
import {
  IonSmartTableProps,
  IonSmartIonTableComponent,
} from './smart-table.component';
import { ActionTable, Column, EventTable } from '../table/utilsTable';
import { PopConfirmDirective } from '../popconfirm/popconfirm.directive';
import { IonSharedModule } from '../shared.module';
import { IonCheckboxModule } from '../checkbox/checkbox.module';
import { IonPaginationModule } from '../pagination/pagination.module';
import { IonTagModule } from '../tag/tag.module';

const disabledArrowColor = '#CED2DB';
const enabledArrowColor = '#0858CE';

const columnTrigger = 'click';

const columns: Column[] = [
  {
    key: 'name',
    label: 'Nome',
    sort: true,
  },
  {
    key: 'height',
    label: 'Altura',
    sort: true,
  },
];

const pagination = {
  actual: 1,
  itemsPerPage: 10,
  offset: 0,
};
interface Character {
  name: string;
  height: number;
  mass: number;
}
const data: Character[] = [
  {
    name: 'Luke Skywalker',
    height: 172,
    mass: 96,
  },
  {
    name: 'C-3PO',
    height: 167,
    mass: 96,
  },
];

const events = jest.fn();

const defaultProps: IonSmartTableProps<Character> = {
  config: {
    data,
    columns,
    pagination: {
      total: 32,
      itemsPerPage: 10,
      page: 1,
    },
    loading: false,
  },
  events: {
    emit: events,
  } as SafeAny,
};

const sut = async (
  customProps: IonSmartTableProps<Character> = defaultProps
): Promise<SafeAny> => {
  await render(IonSmartIonTableComponent, {
    componentProperties: customProps,
    declarations: [PopConfirmDirective],
    imports: [
      FormsModule,
      IonSharedModule,
      IonCheckboxModule,
      IonPaginationModule,
      IonTagModule,
    ],
  });
};

describe('IonTableComponent', () => {
  beforeEach(async () => {
    await sut();
  });

  it('should render table', async () => {
    expect(screen.getByTestId('ion-table'));
  });

  it('should render pagination by default', async () => {
    expect(screen.queryAllByTestId('pagination-container')).toHaveLength(1);
    expect(screen.getByTestId('page-1')).toBeInTheDocument();
  });

  it('should render total of items', async () => {
    expect(screen.getByTestId('pagination-container')).toContainHTML(
      String(defaultProps.config.pagination.total)
    );
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

  it('should not render a no data message', async () => {
    expect(screen.queryAllByText('Não há dados')).toHaveLength(0);
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
    expect(screen.queryAllByTestId('sort-by-' + columns[0].key)).toHaveLength(
      1
    );
  });

  it('should emit event sort with desc false when click in sort icon', async () => {
    const orderBy = columns[0].key;
    fireEvent.click(screen.getByTestId('sort-by-' + orderBy));
    expect(events).toHaveBeenCalledWith({
      change_page: pagination,
      event: EventTable.SORT,
      order: {
        column: orderBy,
        desc: false,
      },
    });
  });

  it('should be defined the value of order when sort column', async () => {
    const orderBy = columns[0].key;
    fireEvent.click(screen.getByTestId('sort-by-' + orderBy));
    expect(defaultProps.config.order).toStrictEqual({
      column: orderBy,
      desc: true,
    });
  });

  it('should emit event sort with desc true when click in sort icon two times', async () => {
    const orderBy = columns[0].key;
    fireEvent.click(screen.getByTestId('sort-by-' + orderBy));
    fireEvent.click(screen.getByTestId('sort-by-' + orderBy));
    expect(events).toHaveBeenCalledWith({
      change_page: pagination,
      event: EventTable.SORT,
      order: {
        column: orderBy,
        desc: true,
      },
    });
  });

  it('should emit event change_page when select other page', async () => {
    const pageToSelect = 2;
    fireEvent.click(screen.getByTestId('page-' + pageToSelect));
    expect(events).toHaveBeenCalledWith({
      change_page: {
        actual: pageToSelect,
        itemsPerPage: 10,
        offset: 10,
      },
      event: EventTable.CHANGE_PAGE,
    });
  });

  afterEach(() => {
    defaultProps.config.data = JSON.parse(JSON.stringify(data));
    events.mockClear();
  });
});

describe('Table > Actions', () => {
  const actions: ActionTable[] = [
    {
      label: 'Excluir',
      icon: 'trash',
      show: (row: Character): boolean => {
        return row.height > 160;
      },
    },
    {
      label: 'Editar',
      icon: 'pencil',
      call: (row: Character): void => {
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
  } as IonSmartTableProps<Character>;

  it('should show actions column when has action', async () => {
    await sut(tableWithActions);
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });

  it.each(actions)('should render icon action', async ({ icon }) => {
    await sut(tableWithActions);
    expect(document.getElementById(`ion-icon-${icon}`)).toBeInTheDocument();
  });

  it('should not render popconfirm when action dont has confirm config', async () => {
    await sut(tableWithActions);
    expect(screen.getByTestId(`row-0-${actions[0].label}`)).not.toHaveAttribute(
      'ng-reflect-ion-pop-confirm-title'
    );
  });

  it('should render trash button disabled when he caracther is less than 160cm', async () => {
    const tableItemDeleted = {
      ...tableWithActions,
    } as IonSmartTableProps<Character>;

    tableItemDeleted.config.data = [{ height: 96, name: 'RS-D2', mass: 96 }];

    await sut(tableItemDeleted);
    expect(screen.getByTestId('row-0-Excluir')).toHaveAttribute(
      'ng-reflect-disabled',
      'true'
    );
  });

  it('should call action when clicked in action', async () => {
    await sut(tableWithActions);
    const removeOption = document.getElementById('ion-icon-pencil');
    fireEvent.click(removeOption);
    expect(screen.getByText('editado!')).toBeInTheDocument();
  });

  afterEach(() => {
    events.mockClear();
  });
});

describe('Table > Checkbox', () => {
  const eventSelect = jest.fn();
  const tableWithSelect: IonSmartTableProps<Character> = {
    config: {
      columns: JSON.parse(JSON.stringify(columns)),
      data: JSON.parse(JSON.stringify(data)),
      check: true,
      pagination: {
        total: 82,
        itemsPerPage: 10,
        page: 1,
      },
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
      change_page: pagination,
      event: EventTable.ROW_SELECT,
      rows_selected: tableWithSelect.config.data,
    });
  });

  it('should select a row', async () => {
    const indexToSelect = 0;
    const checkFirstRow = screen.getByTestId(`row-${indexToSelect}-check`);
    fireEvent.click(checkFirstRow);

    expect(eventSelect).toBeCalledWith({
      change_page: pagination,
      event: EventTable.ROW_SELECT,
      rows_selected: [{ ...data[indexToSelect], selected: true }],
    });
  });

  it('should unchecked all rows when click and check all and has a or more rows selected', async () => {
    fireEvent.click(screen.getByTestId('row-0-check'));
    expect(screen.getByTestId(`table-check-all`)).toHaveAttribute(
      'ng-reflect-state',
      'indeterminate'
    );
    fireEvent.click(screen.getByTestId('table-check-all'));
    tableWithSelect.config.data.forEach((row, index) => {
      expect(screen.getByTestId(`row-${index}-check`)).not.toBeChecked();
      expect(screen.getByTestId(`row-${index}-check`)).toHaveAttribute(
        'ng-reflect-state',
        'enabled'
      );
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

  it('should add the enabled state in checkbox that marks all options', async () => {
    fireEvent.click(screen.getByTestId('table-check-all'));
    expect(screen.getByTestId(`table-check-all`)).toHaveAttribute(
      'ng-reflect-state',
      'checked'
    );

    fireEvent.click(screen.getByTestId('table-check-all'));
    expect(screen.getByTestId(`table-check-all`)).toHaveAttribute(
      'ng-reflect-state',
      'enabled'
    );
  });

  it('should add enabled state to all options', async () => {
    fireEvent.click(screen.getByTestId('table-check-all'));

    tableWithSelect.config.data.forEach((row, index) => {
      expect(screen.getByTestId(`row-${index}-check`)).toHaveAttribute(
        'ng-reflect-state',
        'checked'
      );
    });

    fireEvent.click(screen.getByTestId('table-check-all'));

    tableWithSelect.config.data.forEach((row, index) => {
      expect(screen.getByTestId(`row-${index}-check`)).toHaveAttribute(
        'ng-reflect-state',
        'enabled'
      );
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

  it('should add enabled state in the checkbox that marks all options', async () => {
    tableWithSelect.config.data.forEach((row, index) => {
      fireEvent.click(screen.getByTestId(`row-${index}-check`));
    });

    expect(screen.getByTestId(`table-check-all`)).toHaveAttribute(
      'ng-reflect-state',
      'checked'
    );

    tableWithSelect.config.data.forEach((row, index) => {
      fireEvent.click(screen.getByTestId(`row-${index}-check`));
    });

    expect(screen.getByTestId(`table-check-all`)).toHaveAttribute(
      'ng-reflect-state',
      'enabled'
    );
  });

  afterEach(() => {
    eventSelect.mockClear();
  });
});

describe('Table > Differents columns data type', () => {
  const eventSelect = jest.fn();
  const columnIcon = 'check';
  const tableDifferentColumns: IonSmartTableProps<Character> = {
    config: {
      columns: [
        ...JSON.parse(JSON.stringify(columns)),
        {
          key: 'mass',
          label: 'Mass',
          type: 'tag',
          sort: false,
          tag: {
            icon: columnIcon,
          },
        },
      ],
      data: JSON.parse(JSON.stringify(data)),
      pagination: {
        total: 82,
        itemsPerPage: 10,
        page: 1,
      },
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
  });

  describe('Sort', () => {
    it('should not show button sort when column not is sortable', async () => {
      await sut(tableDifferentColumns);
      expect(screen.queryAllByTestId('sort-by-year')).toHaveLength(0);
    });

    it('should render arrow down blue when sort desc', async () => {
      const orderBy = columns[0].key;
      await sut(tableDifferentColumns);
      fireEvent.click(screen.getByTestId('sort-by-' + orderBy));
      const arrowUp = screen.getByTestId('sort-by-' + orderBy).children[0];
      const arrowDown = screen.getByTestId('sort-by-' + orderBy).children[1];
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
      await sut(tableDifferentColumns);
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
      await sut(tableDifferentColumns);
      const arrowUp = screen.getByTestId('sort-by-albuns').children[0];
      const arrowDown = screen.getByTestId('sort-by-albuns').children[1];
      expect(arrowUp).toHaveAttribute('fill', disabledArrowColor);
      expect(arrowDown).toHaveAttribute('fill', disabledArrowColor);
    });
  });

  afterAll(() => {
    eventSelect.mockClear();
  });
});

describe('Table > Pagination', () => {
  it('should render page without config of items per page', async () => {
    const withoutConfigItemsPerPage = JSON.parse(
      JSON.stringify(defaultProps)
    ) as IonSmartTableProps<Character>;
    withoutConfigItemsPerPage.config.pagination = {
      total: 32,
      page: 1,
    };

    await sut(withoutConfigItemsPerPage);
    expect(screen.getByTestId('page-4')).toBeInTheDocument();
  });

  it('should render loading when table is loading', async () => {
    const tableWithLoading = JSON.parse(
      JSON.stringify(defaultProps)
    ) as IonSmartTableProps<Character>;
    tableWithLoading.config.loading = true;

    await sut(tableWithLoading);
    expect(screen.getByTestId('loading-pagination')).toBeInTheDocument();
  });
});

describe('Table > Action with confirm', () => {
  it('should render popconfirm in action', async () => {
    const withPopconfirm = JSON.parse(
      JSON.stringify(defaultProps)
    ) as IonSmartTableProps<Character>;

    const actionConfig = {
      label: 'Excluir',
      icon: 'trash',
      confirm: {
        title: 'Você tem certeza?',
      },
    };
    withPopconfirm.config.actions = [actionConfig];

    await sut(withPopconfirm);
    const actionBtn = screen.getByTestId(`row-0-${actionConfig.label}`);

    expect(actionBtn).not.toHaveAttribute('ng-reflect-ion-pop-confirm-desc');
    expect(actionBtn).toHaveAttribute(
      'ng-reflect-ion-pop-confirm-title',
      actionConfig.confirm.title
    );
  });

  it('should render popconfirm in action', async () => {
    const withPopconfirm = JSON.parse(
      JSON.stringify(defaultProps)
    ) as IonSmartTableProps<Character>;

    const actionConfig = {
      label: 'Excluir',
      icon: 'trash',
      confirm: {
        title: 'Você tem certeza?',
        description: 'você estará excluindo um disco',
      },
    };
    withPopconfirm.config.actions = [actionConfig];

    await sut(withPopconfirm);
    const actionBtn = screen.getByTestId(`row-0-${actionConfig.label}`);

    expect(actionBtn).toHaveAttribute(
      'ng-reflect-ion-pop-confirm-desc',
      actionConfig.confirm.description
    );
  });
});

describe('Table without Data', () => {
  const tableWithoutData: IonSmartTableProps<Character> = {
    config: {
      columns: JSON.parse(JSON.stringify(columns)),
      data: [],
      check: true,
      pagination: {
        total: 0,
        itemsPerPage: 10,
      },
    },
  };

  it('should render a no data message', async () => {
    await sut(tableWithoutData);
    expect(screen.getByText('Não há dados')).toBeInTheDocument();
  });

  it('checkbox should be disabled when there is no data', async () => {
    await sut(tableWithoutData);
    expect(screen.getByTestId('ion-checkbox')).toBeDisabled();
  });
});

describe('Table with cell events', () => {
  const columnsWithCellEvent: Column[] = [
    {
      key: 'name',
      label: 'Nome',
      sort: true,
    },
    {
      key: 'height',
      label: 'Altura',
      sort: true,
      actions: {
        trigger: columnTrigger,
      },
    },
  ];

  const tableWithCellEvents = {
    config: {
      data: data,
      columns: columnsWithCellEvent,
      pagination: {
        total: 2,
        itemsPerPage: 10,
        page: 1,
      },
      loading: false,
    },
    events: {
      emit: events,
    } as SafeAny,
  };

  beforeEach(async () => {
    await sut(tableWithCellEvents);
  });

  it.each([0, 1])(
    'should render table with clickable cell style',
    async (index) => {
      const selectableCellID = `row-${index}-height`;
      expect(screen.getByTestId(selectableCellID)).toHaveStyle(
        'cursor: pointer;'
      );
    }
  );

  it.each([0, 1])(
    'should render default column even with a clickable cell',
    async (index) => {
      const selectableCellID = `row-${index}-name`;
      expect(screen.getByTestId(selectableCellID)).not.toHaveStyle(
        'cursor: pointer;'
      );
    }
  );

  it('should emit event when selectable cell is clicked', async () => {
    const selectableCellID = 'row-0-height';
    fireEvent.click(screen.getByTestId(selectableCellID));
    expect(events).toHaveBeenCalledWith({
      change_page: pagination,
      event: EventTable.CELL_SELECT,
      data: {
        selected_row: data[0],
        cell_data: {
          value: 172,
          column: 'height',
        },
      },
    });
  });

  it('should not emit event when not selectable cell is clicked', async () => {
    const selectableCellID = 'row-0-name';
    fireEvent.click(screen.getByTestId(selectableCellID));
    expect(events).not.toHaveBeenCalledWith({
      change_page: pagination,
      event: EventTable.CELL_SELECT,
      data: {
        selected_row: data[0],
        cell_data: {
          value: 'Luke Skywalker',
          column: 'name',
        },
      },
    });
  });
});
