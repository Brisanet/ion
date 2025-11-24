import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { LOCALE_ID, SimpleChange } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { fireEvent, render, screen, within } from '@testing-library/angular';
import { cloneDeep } from 'lodash';

import { IonButtonModule } from '../button/button.module';
import { IonCheckboxModule } from '../checkbox/checkbox.module';
import { PopoverProps } from '../core/types';
import { IonIconModule } from '../icon/icon.module';
import { IonPaginationModule } from '../pagination/pagination.module';
import { IonPopConfirmModule } from '../popconfirm/popconfirm.module';
import { IonPopoverModule } from '../popover/popover.module';
import { IonSpinnerModule } from '../spinner/spinner.module';
import {
  ActionTable,
  Column,
  ColumnBooleanText,
  ColumnType,
  EventTable,
} from '../table/utilsTable';
import { IonTagModule } from '../tag/tag.module';
import { IonFormattedThemes, IonThemeService } from '../theme';
import { IonTooltipModule } from '../tooltip/tooltip.module';
import { PipesModule } from '../utils/pipes/pipes.module';
import { SafeAny } from '../utils/safe-any';
import { IonSmartTableProps } from './../core/types/smart-table';
import { StatusType } from './../core/types/status';
import { IonLinkModule } from './../link/link.module';
import { IonSmartTableComponent } from './smart-table.component';
import {
  DARK_DISABLED_COLOR,
  DARK_ENABLED_COLOR,
  DISABLED_COLOR,
  ENABLED_COLOR,
} from '../utils/baseTable';

registerLocaleData(localePT, 'pt-BR');

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
  icon?: string;
  status?: StatusType;
  tooltip?: string;
}

interface Book {
  id: number;
  name: string;
  value: number;
  release_date: string;
}

interface Disco {
  id: number;
  name: string;
  active?: boolean;
}

const data: Character[] = [
  {
    name: 'Luke Skywalker',
    height: 172,
    mass: 96,
    icon: 'user',
    status: 'success',
  },
  {
    name: 'C-3PO',
    height: 167,
    mass: 96,
    icon: 'technical',
    status: 'negative',
  },
];

const singleData: Character[] = [
  {
    name: 'Luke Skywalker',
    height: 172,
    mass: 96,
    icon: 'user',
    status: 'success',
    tooltip: 'Tooltip personalizado 1',
  },
];

const longData: Character[] = [
  {
    name: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, voluptatibus veniam reiciendis repellendus laborum nam laboriosam est natus ut, delectus iure quis consequuntur eligendi aspernatur, corporis voluptates nulla assumenda adipisci. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, voluptatibus veniam reiciendis repellendus laborum nam laboriosam est natus ut, delectus iure quis consequuntur eligendi aspernatur, corporis voluptates nulla assumenda adipisci. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, voluptatibus veniam reiciendis repellendus laborum nam laboriosam est natus ut, delectus iure quis consequuntur eligendi aspernatur, corporis voluptates nulla assumenda adipisci.',
    height: 0,
    mass: 0,
    icon: 'box',
    status: 'negative',
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

const propsWithPopover: IonSmartTableProps<Character> = {
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

const DEFAULT_THEME_CONFIG = {
  key: 'light',
} as IonFormattedThemes;

const DARK_THEME_CONFIG = {
  key: 'dark',
} as IonFormattedThemes;

const ionThemeServiceMock: Partial<IonThemeService> = {
  theme: DEFAULT_THEME_CONFIG,
};

const sut = async (
  customProps: IonSmartTableProps<Character | Book | Disco> = defaultProps
): Promise<SafeAny> => {
  return await render(IonSmartTableComponent, {
    componentProperties: customProps,
    imports: [
      IonCheckboxModule,
      IonTagModule,
      IonPopConfirmModule,
      IonPopoverModule,
      IonButtonModule,
      IonIconModule,
      IonPaginationModule,
      PipesModule,
      IonTooltipModule,
      IonSpinnerModule,
      IonLinkModule,
    ],
    providers: [{ provide: IonThemeService, useValue: ionThemeServiceMock }],
  });
};

describe('IonSmartTableComponent', () => {
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

  it('should emit event sort with desc true when click in sort icon', async () => {
    const orderBy = columns[0].key;
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

  it('should be defined the value of order when sort column', async () => {
    const orderBy = columns[0].key;
    fireEvent.click(screen.getByTestId('sort-by-' + orderBy));
    expect(defaultProps.config.order).toStrictEqual({
      column: orderBy,
      desc: false,
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

describe('Table > columns header with tooltip', () => {
  let columnHead: HTMLElement;
  const columnsWithTooltip: Column[] = [
    {
      key: 'name',
      label: 'Nome',
      sort: true,
      configTooltip: {
        ionTooltipTitle: 'Eu sou um tooltip',
      },
    },
    {
      key: 'height',
      label: 'Altura',
      sort: true,
    },
  ];

  const propsColumnWithTooltip: IonSmartTableProps<Character> = {
    config: {
      data,
      columns: columnsWithTooltip,
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

  beforeEach(async () => {
    await sut(propsColumnWithTooltip);
  });

  afterEach(() => {
    fireEvent.mouseLeave(columnHead);
  });

  it('should render tooltip when it have a configTooltip', () => {
    columnHead = screen.getByTestId('th-span-' + columnsWithTooltip[0].key);
    fireEvent.mouseEnter(columnHead);
    expect(screen.getByTestId('ion-tooltip')).toBeVisible();
  });

  it('should not render tooltip when it doesnt have a configTooltip', () => {
    columnHead = screen.getByTestId('th-span-' + columnsWithTooltip[1].key);
    fireEvent.mouseEnter(columnHead);
    expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
  });
});

describe('Table > Actions', () => {
  const actions: ActionTable[] = [
    {
      label: 'Excluir',
      icon: 'trash',
      show: (row: Character): boolean => {
        return !row.name;
      },
    },
    {
      label: 'Desabilitar',
      icon: 'block',
      disabled: (row: Character): boolean => {
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

  it('should render action with label when showLabel is true', async () => {
    const tableItemDeleted = cloneDeep(tableWithActions);
    tableItemDeleted.config.actions = [
      {
        ...actions[0],
        showLabel: true,
      },
    ];
    const action = tableItemDeleted.config.actions.find(
      (action) => action.showLabel
    );
    await sut(tableItemDeleted);
    expect(screen.getAllByText(action.label)).toHaveLength(data.length);
  });

  it('should render action with danger class when action has danger config', async () => {
    const tableItemDeleted = {
      ...tableWithActions,
      config: {
        ...tableWithActions.config,
        actions: [
          {
            ...actions[0],
            danger: true,
          },
        ],
      },
    } as IonSmartTableProps<Character>;
    await sut(tableItemDeleted);
    const rowAction = screen.getByTestId(`row-0-${actions[0].label}`);
    expect(rowAction).toHaveAttribute('ng-reflect-danger', 'true');
    expect(within(rowAction).getByRole('button')).toHaveClass('danger');
  });

  it('should not render popconfirm when action dont has confirm config', async () => {
    await sut(tableWithActions);
    expect(screen.getByTestId(`row-0-${actions[0].label}`)).not.toHaveAttribute(
      'ng-reflect-ion-pop-confirm-title'
    );
  });

  it('should render trash button enable when he character is less than 160cm', async () => {
    const tableItemDeleted = {
      ...tableWithActions,
    } as IonSmartTableProps<Character>;

    tableItemDeleted.config.data = [{ height: 96, name: 'RS-D2', mass: 96 }];

    await sut(tableItemDeleted);
    expect(screen.getByTestId('row-0-Desabilitar')).toHaveAttribute(
      'ng-reflect-disabled',
      'false'
    );
  });

  it('should render trash button disabled when he character is taller than 160cm', async () => {
    const tableItemDeleted = {
      ...tableWithActions,
    } as IonSmartTableProps<Character>;

    tableItemDeleted.config.data = [{ height: 196, name: 'RS-D2', mass: 96 }];

    await sut(tableItemDeleted);
    expect(screen.getByTestId('row-0-Desabilitar')).toHaveAttribute(
      'ng-reflect-disabled',
      'true'
    );
  });

  it('should not render when the show is false', async () => {
    const tableItemDeleted = {
      ...tableWithActions,
    } as IonSmartTableProps<Character>;

    tableItemDeleted.config.data = [{ height: 96, name: '', mass: 96 }];

    await sut(tableItemDeleted);
    expect(screen.queryByTestId('row-0-Excluir')).not.toBeInTheDocument();
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
  const columnStatus = 'success';
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
            status: columnStatus,
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
  const tableTagTooltip: IonSmartTableProps<Character> = {
    config: {
      columns: [
        {
          key: 'mass',
          label: 'Mass',
          type: ColumnType.TAG,
          sort: false,
          tag: {
            icon: columnIcon,
            status: columnStatus,
          },
        },
      ],
      data: JSON.parse(JSON.stringify(singleData)),
      pagination: {
        total: 1,
        itemsPerPage: 10,
        page: 1,
      },
    },
  };

  describe('Tag', () => {
    it('should show tooltip in tag cell', async () => {
      await sut(tableTagTooltip);
      fireEvent.mouseEnter(screen.getByTestId('tag-cell'));
      expect(document.getElementsByTagName('ion-tooltip')).toHaveLength(1);
      fireEvent.mouseLeave(screen.getByTestId('tag-cell'));
      expect(document.getElementsByTagName('ion-tooltip')).toHaveLength(0);
    });

    it('should show icon in tag by column icon', async () => {
      await sut(tableDifferentColumns);
      expect(
        document.getElementById(`ion-icon-${columnIcon}`)
      ).toBeInTheDocument();
      expect(document.getElementById('ion-icon-union')).not.toBeInTheDocument();
    });

    it('should set a status type in tag by column', async () => {
      await sut(tableDifferentColumns);
      expect(
        document.getElementsByClassName(`ion-tag outline ${columnStatus}`)
      ).toHaveLength(2);
    });

    it.each(['user', 'technical'])(
      'should show %s icon in tag by row data',
      async (iconRow: string) => {
        const columns = tableDifferentColumns.config.columns;
        const lastColumn = columns.length - 1;
        columns[lastColumn].tag = {
          iconKey: 'icon',
        };

        await sut(tableDifferentColumns);
        expect(
          document.getElementById(`ion-icon-${iconRow}`)
        ).toBeInTheDocument();
      }
    );

    it.each(['success', 'negative'])(
      'should set %s status in tag by row data',
      async (statusType: string) => {
        const columns = tableDifferentColumns.config.columns;
        const lastColumn = columns.length - 1;
        columns[lastColumn].tag = {
          statusKey: 'status',
        };

        await sut(tableDifferentColumns);
        expect(
          document.getElementsByClassName(`ion-tag outline ${statusType}`)
        ).toHaveLength(1);
      }
    );

    it.each(['#be531c', '#ab2328', '#572d2d', '#6666ff', '#cc66ff'])(
      'should render tag with custom color: %s',
      async (color) => {
        const columns = tableDifferentColumns.config.columns;
        const lastColumn = columns.length - 1;
        columns[lastColumn].tag = {
          color,
        };

        await sut(tableDifferentColumns);
        const tags = document.getElementsByClassName('ion-tag');
        for (let i = 0; i < tags.length; i++) {
          expect(tags[i]).toHaveStyle(`color: ${color};`);
        }
      }
    );

    it('should show an empty cell when the data is undefined on a tag column', async () => {
      const columns = tableDifferentColumns.config.columns;
      const lastColumn = columns.length - 1;
      const tagKey = 'notFound';
      columns[lastColumn] = {
        ...columns[lastColumn],
        key: tagKey,
      };
      await sut(tableDifferentColumns);
      const cell = screen.getByTestId(`row-0-${tagKey}`);
      expect(cell).toHaveTextContent('-');
    });
  });

  describe('Pipes', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: LOCALE_ID,
            useValue: 'pt-BR',
          },
        ],
      });
    });

    it('should show values formatteds by pipe', async () => {
      await sut({
        ...defaultProps,
        config: {
          ...defaultProps.config,
          data: [
            {
              id: 1,
              name: 'The name of the wind',
              release_date: '2007-03-27',
              value: 53.8,
            },
            {
              id: 2,
              name: 'The Wise Mans Fear',
              release_date: '2011-03-01',
              value: 1016,
            },
          ],
          columns: [
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
          ],
        },
      });
      const dateFormatted = '27/03/2007';
      expect(screen.getByText(dateFormatted)).toBeInTheDocument();

      const currencyFormatted = 'R$53.80';
      expect(screen.getByText(currencyFormatted)).toBeInTheDocument();
    });

    it('should keep the orignal value when not found pipe', async () => {
      await sut({
        ...defaultProps,
        config: {
          ...defaultProps.config,
          data: [
            {
              id: 1,
              name: 'The name of the wind',
              release_date: '2007-03-27',
              value: 53.8,
            },
            {
              id: 2,
              name: 'The Wise Mans Fear',
              release_date: '2011-03-01',
              value: 1016,
            },
          ],
          columns: [
            {
              key: 'name',
              label: 'Nome',
              sort: false,
            },
            {
              key: 'value',
              label: 'Valor',
              pipe: {
                apply: 'wrongpipe',
              },
              sort: false,
            },
          ],
        },
      });
      expect(screen.getByText('53.8')).toBeInTheDocument();
    });

    it('should detect a new change and update the component', async () => {
      const myConfig = {
        config: {
          ...defaultProps.config,
          data: [],
          columns: [
            {
              key: 'name',
              label: 'Nome',
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
          ],
        },
      };

      const { fixture } = await sut(myConfig);
      fixture.componentInstance.ngOnChanges({
        config: new SimpleChange(null, { ...myConfig }, false),
      });
      fixture.detectChanges();

      expect(screen.getByText('Não há dados')).toBeInTheDocument();
    });

    it('should show the month name in pt-BR', async () => {
      const myConfig = {
        config: {
          ...defaultProps.config,
          data: [
            {
              id: 1,
              name: 'The name of the wind',
              release_date: '2007-03-27',
              value: 53.8,
            },
          ],
          columns: [
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
                formart: 'MMMM d, y',
              },
              sort: false,
            },
          ],
        },
      };

      await sut(myConfig);
      expect(screen.getByText('27 de mar de 2007')).toBeInTheDocument();
    });
  });

  describe('Sort', () => {
    it('should not show button sort when column not is sortable', async () => {
      await sut(tableDifferentColumns);
      expect(screen.queryAllByTestId('sort-by-year')).toHaveLength(0);
    });

    describe.each([
      {
        label: 'default',
        themeConfig: DEFAULT_THEME_CONFIG,
        enabledArrowColor: ENABLED_COLOR,
        disabledArrowColor: DISABLED_COLOR,
      },
      {
        label: 'dark',
        themeConfig: DARK_THEME_CONFIG,
        enabledArrowColor: DARK_ENABLED_COLOR,
        disabledArrowColor: DARK_DISABLED_COLOR,
      },
    ])(
      '$label theme',
      ({ themeConfig, enabledArrowColor, disabledArrowColor }) => {
        beforeEach(async () => {
          ionThemeServiceMock.theme = cloneDeep(themeConfig);
          tableDifferentColumns.config.columns = [
            { label: 'Albuns', sort: true, key: 'albuns' },
          ];
          await sut(tableDifferentColumns);
        });

        it('should render arrow down in primary color when sort desc', () => {
          const orderBy = tableDifferentColumns.config.columns[0].key;
          fireEvent.click(screen.getByTestId('sort-by-' + orderBy));
          const arrowUp = screen.getByTestId('sort-by-' + orderBy).children[0];
          const arrowDown = screen.getByTestId('sort-by-' + orderBy)
            .children[1];
          expect(arrowUp).toHaveAttribute('fill', disabledArrowColor);
          expect(arrowDown).toHaveAttribute('fill', enabledArrowColor);
        });

        it('should render arrow up in primary color when sort asc', () => {
          fireEvent.click(screen.getByTestId('sort-by-albuns'));
          fireEvent.click(screen.getByTestId('sort-by-albuns'));
          const arrowUp = screen.getByTestId('sort-by-albuns').children[0];
          const arrowDown = screen.getByTestId('sort-by-albuns').children[1];
          expect(arrowUp).toHaveAttribute('fill', enabledArrowColor);
          expect(arrowDown).toHaveAttribute('fill', disabledArrowColor);
        });

        it('should render arrow up and arrow down in neutral color when not sorted', () => {
          const arrowUp = screen.getByTestId('sort-by-albuns').children[0];
          const arrowDown = screen.getByTestId('sort-by-albuns').children[1];
          expect(arrowUp).toHaveAttribute('fill', disabledArrowColor);
          expect(arrowDown).toHaveAttribute('fill', disabledArrowColor);
        });
      }
    );

    it('should only emit sort action after a given debounce time', async () => {
      const debounceTime = 2000;
      jest.useFakeTimers();

      tableDifferentColumns.config.columns = [
        {
          label: 'Albuns',
          sort: true,
          key: 'albuns',
        },
      ];
      tableDifferentColumns.config.debounceOnSort = debounceTime;

      await sut(tableDifferentColumns);
      eventSelect.mockClear();
      fireEvent.click(screen.getByTestId('sort-by-albuns'));
      expect(tableDifferentColumns.events.emit).not.toHaveBeenCalled();

      jest.advanceTimersByTime(debounceTime);
      expect(tableDifferentColumns.events.emit).toHaveBeenCalled();
    });

    it('should not order while loading', async () => {
      events.mockClear();
      const tableWithLoading = JSON.parse(
        JSON.stringify(defaultProps)
      ) as IonSmartTableProps<Character>;
      tableWithLoading.config.loading = true;
      await sut(tableWithLoading);
      const orderBy = columns[0].key;
      fireEvent.click(screen.getByTestId('sort-by-' + orderBy));
      expect(events).not.toHaveBeenCalled();
    });
  });

  afterAll(() => {
    eventSelect.mockClear();
    jest.useRealTimers();
  });
});

describe('Table > Pagination', () => {
  it('should render page without config of items per page', async () => {
    const withoutConfigItemsPerPage = JSON.parse(
      JSON.stringify(defaultProps)
    ) as IonSmartTableProps<Character>;
    withoutConfigItemsPerPage.events = { emit: jest.fn() } as SafeAny;
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
    const totalPagination = screen.getByTestId('total-pagination');
    tableWithLoading.config.loading = true;

    await sut(tableWithLoading);
    expect(screen.getByTestId('loading-pagination')).toBeInTheDocument();
    expect(totalPagination).not.toBeInTheDocument();
  });

  it('should render loading when dont have data and table is loading', async () => {
    const tableWithLoading = JSON.parse(
      JSON.stringify(defaultProps)
    ) as IonSmartTableProps<Character>;
    tableWithLoading.config.loading = true;
    tableWithLoading.config.data = [];

    await sut(tableWithLoading);
    expect(screen.getByTestId('ion-spinner')).toBeInTheDocument();
  });

  it('should render table in page 2', async () => {
    const myProps = {
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

    myProps.config.pagination.page = 2;

    await sut(myProps);
    expect(screen.getByTestId('page-2')).toHaveClass('selected');
  });
});

describe('Table > Action with confirm', () => {
  it('should render popconfirm with title in action', async () => {
    const withPopconfirm = JSON.parse(
      JSON.stringify(defaultProps)
    ) as IonSmartTableProps<Character>;
    withPopconfirm.events = { emit: jest.fn() } as SafeAny;

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

  it('should render popconfirm with title and description in action', async () => {
    const withPopconfirm = JSON.parse(
      JSON.stringify(defaultProps)
    ) as IonSmartTableProps<Character>;
    withPopconfirm.events = { emit: jest.fn() } as SafeAny;

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

  it('should render popconfirm description with data provided from row', async () => {
    const withPopconfirm = JSON.parse(
      JSON.stringify(defaultProps)
    ) as IonSmartTableProps<Character>;
    withPopconfirm.events = { emit: jest.fn() } as SafeAny;
    const dynamicDescription = jest.fn().mockReturnValue('dynamic description');

    const actionConfig = {
      label: 'Excluir',
      icon: 'trash',
      confirm: {
        title: 'Você tem certeza?',
        dynamicDescription,
      },
    };
    withPopconfirm.config.actions = [actionConfig];

    await sut(withPopconfirm);

    expect(dynamicDescription).toHaveBeenCalled();
    expect(dynamicDescription).toHaveBeenCalledWith(
      defaultProps.config.data[0]
    );
  });

  it('should close popconfirm when click outside', async () => {
    const withPopconfirm = JSON.parse(
      JSON.stringify(defaultProps)
    ) as IonSmartTableProps<Character>;
    withPopconfirm.events = { emit: jest.fn() } as SafeAny;
    const dynamicDescription = jest.fn().mockReturnValue('dynamic description');

    const actionConfig = {
      label: 'Excluir',
      icon: 'trash',
      confirm: {
        title: 'Você tem certeza?',
        dynamicDescription,
      },
    };
    withPopconfirm.config.actions = [actionConfig];

    await sut(withPopconfirm);
    const cancelTextOnPopconfirm = 'Cancelar';

    fireEvent.click(screen.getByTestId('row-0-Excluir'));
    expect(screen.getByText(cancelTextOnPopconfirm)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('column-name'));
    expect(screen.queryAllByText(cancelTextOnPopconfirm)).toHaveLength(0);
  });

  it('should open popconfirm when click in action button 3 times', async () => {
    const withPopconfirm = JSON.parse(
      JSON.stringify(defaultProps)
    ) as IonSmartTableProps<Character>;
    withPopconfirm.events = { emit: jest.fn() } as SafeAny;
    const dynamicDescription = jest.fn().mockReturnValue('dynamic description');

    const actionConfig = {
      label: 'Excluir',
      icon: 'trash',
      confirm: {
        title: 'Você tem certeza?',
        dynamicDescription,
      },
    };
    withPopconfirm.config.actions = [actionConfig];

    await sut(withPopconfirm);
    const cancelTextOnPopconfirm = 'Cancelar';

    fireEvent.click(screen.getByTestId('row-0-Excluir'));
    fireEvent.click(screen.getByTestId('row-0-Excluir'));
    fireEvent.click(screen.getByTestId('row-0-Excluir'));
    expect(screen.getByText(cancelTextOnPopconfirm)).toBeInTheDocument();
  });

  it('should open popconfirm when click in action button 2 times, click outside and click in button again', async () => {
    const withPopconfirm = JSON.parse(
      JSON.stringify(defaultProps)
    ) as IonSmartTableProps<Character>;
    withPopconfirm.events = { emit: jest.fn() } as SafeAny;
    const dynamicDescription = jest.fn().mockReturnValue('dynamic description');

    const actionConfig = {
      label: 'Excluir',
      icon: 'trash',
      confirm: {
        title: 'Você tem certeza?',
        dynamicDescription,
      },
    };
    withPopconfirm.config.actions = [actionConfig];

    await sut(withPopconfirm);
    const cancelTextOnPopconfirm = 'Cancelar';

    fireEvent.click(screen.getByTestId('row-0-Excluir'));
    fireEvent.click(screen.getByTestId('row-0-Excluir'));

    // click outside
    fireEvent.click(screen.getByTestId('column-name'));

    // click in button again
    fireEvent.click(screen.getByTestId('row-0-Excluir'));
    expect(screen.getByText(cancelTextOnPopconfirm)).toBeInTheDocument();
  });
});

describe('Table > Action with popover', () => {
  it('should render popover with title in action', async () => {
    const withPopover = JSON.parse(
      JSON.stringify(propsWithPopover)
    ) as IonSmartTableProps<Character>;
    withPopover.events = { emit: jest.fn() } as SafeAny;

    const actionConfig = {
      label: 'Excluir',
      icon: 'trash',
      popover: (): Partial<PopoverProps> => ({
        ionPopoverTitle: 'Você tem certeza?',
      }),
    };
    withPopover.config.actions = [actionConfig] as ActionTable[];

    await sut(withPopover);
    const actionBtn = screen.getByTestId(`row-0-${actionConfig.label}`);
    expect(actionBtn).toHaveAttribute(
      'ng-reflect-ion-popover-title',
      actionConfig.popover().ionPopoverTitle
    );
  });

  it('should close popover when click outside', async () => {
    const withPopover = JSON.parse(
      JSON.stringify(propsWithPopover)
    ) as IonSmartTableProps<Character>;
    withPopover.events = { emit: jest.fn() } as SafeAny;
    const cancelTextOnPopover = 'Cancel action';

    const actionConfig = {
      label: 'Excluir',
      icon: 'trash',
      popover: (): Partial<PopoverProps> => ({
        ionPopoverTitle: 'Você tem certeza?',
        ionPopoverActions: [{ label: cancelTextOnPopover }],
      }),
    };
    withPopover.config.actions = [actionConfig] as ActionTable[];

    await sut(withPopover);

    fireEvent.click(screen.getByTestId('row-0-Excluir'));
    expect(screen.getByText(cancelTextOnPopover)).toBeInTheDocument();

    fireEvent.click(screen.getByText(cancelTextOnPopover));
    expect(screen.queryAllByText(cancelTextOnPopover)).toHaveLength(0);
  });
});

describe('Table > Action with tooltip', () => {
  const actionsWithCustomTooltip: ActionTable[] = [
    {
      label: 'Excluir',
      icon: 'trash',
      show: (row: Character): boolean => {
        return !row.name;
      },
      confirm: {
        title: 'Você tem certeza?',
      },
      tooltipConfig: {
        ionTooltipTitle: 'Custom title',
      },
    },
    {
      label: 'Desabilitar',
      icon: 'block',
      disabled: (row: Character): boolean => {
        return row.height > 160;
      },
      confirm: {
        title: 'Você tem certeza?',
      },
    },
    {
      label: 'Editar',
      icon: 'pencil',
      call: (row: Character): void => {
        row.name = 'editado!';
      },
      confirm: {
        title: 'Você tem certeza?',
      },
    },
  ];

  const propsWithTooltip: IonSmartTableProps<Character> = {
    ...defaultProps,
    config: {
      ...defaultProps.config,
      actions: actionsWithCustomTooltip,
    },
  };

  let actionButton: HTMLButtonElement;

  beforeEach(async () => {
    await sut(propsWithTooltip);
    actionButton = screen.getByTestId(
      `row-0-${actionsWithCustomTooltip[0].label}`
    );
  });

  it('should render without tooltip', async () => {
    expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
  });

  it('should render the tooltip with the label as default', () => {
    fireEvent.mouseEnter(
      screen.getByTestId(`row-0-${actionsWithCustomTooltip[2].label}`)
    );
    expect(screen.getByText(actionsWithCustomTooltip[2].label)).toBeVisible();
    fireEvent.mouseLeave(
      screen.getByTestId(`row-0-${actionsWithCustomTooltip[2].label}`)
    );
  });

  it('should render the tooltip with its custom title when provided', () => {
    fireEvent.mouseEnter(actionButton);
    expect(
      screen.getByText(
        actionsWithCustomTooltip[0].tooltipConfig.ionTooltipTitle
      )
    ).toBeVisible();
    fireEvent.mouseLeave(actionButton);
  });

  it('should close the tooltip and open the popconfirm when clicked the button', () => {
    fireEvent.mouseEnter(actionButton);
    fireEvent.click(actionButton);
    expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
    expect(screen.queryByTestId('sup-container')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Luke Skywalker'));
    expect(screen.queryByTestId('sup-container')).not.toBeInTheDocument();
  });

  it('should open the tooltip after a hover on the button', () => {
    fireEvent.mouseEnter(actionButton);

    expect(screen.getByTestId('ion-tooltip')).toBeInTheDocument();
    fireEvent.mouseLeave(actionButton);
  });

  it('should close the tooltip after the mouse leave the button', () => {
    fireEvent.mouseEnter(actionButton);
    fireEvent.mouseLeave(actionButton);
    expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
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

  it('should add a (-) when there is no data in the cell', async () => {
    const customData = {
      ...defaultProps,
    };
    customData.config.data = [{ name: '', height: 0, mass: 100 }];
    await sut(customData);
    const cellHeight = screen.getByTestId('row-0-height');
    const cellName = screen.getByTestId('row-0-name');
    expect(cellHeight).toHaveTextContent('0');
    expect(cellName).toHaveTextContent('-');
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

describe('Table > Cell with long data', () => {
  const tableWithLongData = {
    ...defaultProps,
    config: {
      ...defaultProps.config,
      data: longData,
    },
  };

  it('should render without the hidden-content class as default', async () => {
    await sut(tableWithLongData);
    expect(screen.getByTestId('row-0-name')).not.toHaveClass('hidden-content');
  });

  it('should render with the hidden-content class when hideLongData is provided', async () => {
    tableWithLongData.config.hideLongData = true;
    await sut(tableWithLongData);
    expect(screen.getByTestId('row-0-name')).toHaveClass('hidden-content');
  });
});

describe('Table > Link in cells', () => {
  const linkClickAction = jest.fn();

  const dataWithLink = [data[0]];

  const linkConfig = {
    key: 'url',
    label: 'URL',
    type: ColumnType.LINK,
    link: {
      action: linkClickAction,
      label: (): string => 'link label',
    },
  };

  afterEach(() => {
    linkClickAction.mockClear();
  });

  it('should render the link component', async () => {
    await sut({
      config: {
        data: dataWithLink,
        columns: [...columns, linkConfig],
        pagination: {
          total: 82,
          itemsPerPage: 10,
          page: 1,
        },
      },
    });
    expect(screen.getByText('link label')).toBeVisible();
  });

  it('should call the action when clicking the link', async () => {
    await sut({
      config: {
        data: dataWithLink,
        columns: [...columns, linkConfig],
        pagination: {
          total: 82,
          itemsPerPage: 10,
          page: 1,
        },
      },
    });

    fireEvent.click(screen.getByText('link label'));
    expect(linkClickAction).toHaveBeenCalled();
  });

  it('should not open the tooltip if the config is not informed', async () => {
    await sut({
      config: {
        data: dataWithLink,
        columns: [...columns, linkConfig],
        pagination: {
          total: 82,
          itemsPerPage: 10,
          page: 1,
        },
      },
    });

    fireEvent.mouseEnter(screen.getByText('link label'));
    expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByText('link label'));
  });

  it('should open the tooltip when the config is informed', async () => {
    await sut({
      config: {
        data: dataWithLink,
        columns: [
          ...columns,
          {
            ...linkConfig,
            link: {
              ...linkConfig.link,
              tooltipConfig: {
                text: (row): string => row.name,
              },
            },
          },
        ],
        pagination: {
          total: 82,
          itemsPerPage: 10,
          page: 1,
        },
      },
    });

    fireEvent.mouseEnter(screen.getByTestId('link-element'));
    expect(screen.getByTestId('ion-tooltip')).toBeVisible();
  });

  it('should show an empty cell when the show function returns false', async () => {
    await sut({
      config: {
        data: [{ ...dataWithLink[0], name: '' }],
        columns: [
          ...columns,
          {
            ...linkConfig,
            link: {
              ...linkConfig.link,
              hide: (row): boolean => !row.name,
            },
          },
        ],
        pagination: {
          total: 82,
          itemsPerPage: 10,
          page: 1,
        },
      },
    });

    expect(screen.getByTestId('row-0-url')).toHaveTextContent('-');
  });
});

describe('smart-Table > Boolean in cells', () => {
  const dataWithBoolean: Disco[] = [
    { id: 1, name: 'Meteora', active: true },
    { id: 2, name: 'Living Things', active: false },
  ];

  const columnsWithBoolean: Column[] = [
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
      key: 'active',
      label: 'Boolean',
      type: ColumnType.BOOLEAN,
    },
  ];

  const booleanText: ColumnBooleanText = {
    truthy: 'activated',
    falsy: 'inactivated',
  };

  it('should render "Sim" when boolean is true', async () => {
    await sut({
      config: {
        data: dataWithBoolean,
        columns: columnsWithBoolean,
        pagination: {
          total: 82,
          itemsPerPage: 10,
          page: 1,
        },
      },
    });
    expect(screen.queryByText('true')).not.toBeInTheDocument();
    expect(screen.getByText('Sim')).toBeInTheDocument();
  });

  it('should render "Não" when boolean is false', async () => {
    await sut({
      config: {
        data: dataWithBoolean,
        columns: columnsWithBoolean,
        pagination: {
          total: 82,
          itemsPerPage: 10,
          page: 1,
        },
      },
    });
    expect(screen.queryByText('false')).not.toBeInTheDocument();
    expect(screen.getByText('Não')).toBeInTheDocument();
  });

  it('should render custom boolean when boolean is true', async () => {
    await sut({
      config: {
        data: dataWithBoolean,
        columns: columnsWithBoolean.map((column) => ({
          ...column,
          booleanText,
        })),
        pagination: {
          total: 82,
          itemsPerPage: 10,
          page: 1,
        },
      },
    });
    expect(screen.queryByText('true')).not.toBeInTheDocument();
    expect(screen.getByText('activated')).toBeInTheDocument();
  });

  it('should render custom boolean when boolean is false', async () => {
    await sut({
      config: {
        data: dataWithBoolean,
        columns: columnsWithBoolean.map((column) => ({
          ...column,
          booleanText,
        })),
        pagination: {
          total: 82,
          itemsPerPage: 10,
          page: 1,
        },
      },
    });
    expect(screen.queryByText('false')).not.toBeInTheDocument();
    expect(screen.getByText('inactivated')).toBeInTheDocument();
  });
});
