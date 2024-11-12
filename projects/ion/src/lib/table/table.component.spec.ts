import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import {
  AfterViewInit,
  Component,
  LOCALE_ID,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen, within } from '@testing-library/angular';
import { cloneDeep } from 'lodash';

import { IonButtonModule } from '../button/button.module';
import { IonCheckboxModule } from '../checkbox/checkbox.module';
import { IonTableProps, PopoverProps } from '../core/types';
import { IonIconModule } from '../icon/icon.module';
import { IonPaginationModule } from '../pagination/pagination.module';
import { IonPopConfirmModule } from '../popconfirm/popconfirm.module';
import { IonPopoverModule } from '../popover/popover.module';
import { IonTagModule } from '../tag/tag.module';
import { IonTooltipModule } from '../tooltip/tooltip.module';
import { SafeAny } from '../utils/safe-any';
import { StatusType } from './../core/types/status';
import { IonLinkModule } from './../link/link.module';
import { IonSpinnerModule } from './../spinner/spinner.module';
import { IonTableComponent } from './table.component';
import { IonTableModule } from './table.module';
import {
  ActionTable,
  Column,
  ColumnBooleanText,
  ColumnType,
  ConfigTable,
} from './utilsTable';
import { IonFormattedThemes, IonThemeService } from '../theme';
import {
  DARK_DISABLED_COLOR,
  DARK_ENABLED_COLOR,
  DISABLED_COLOR,
  ENABLED_COLOR,
} from '../utils/baseTable';

registerLocaleData(localePT, 'pt-BR');

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

interface Disco {
  id: number;
  name: string;
  deleted: boolean;
  release_date?: string;
  value?: number;
  year?: number;
  icon?: string;
  status?: StatusType;
  active?: boolean;
}

const data: Disco[] = [
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
];

const defaultProps: IonTableProps<Disco> = {
  config: {
    data,
    columns,
  },
};

const events = jest.fn();

const propsWithPopover: IonTableProps<Disco> = {
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
  customProps: IonTableProps<Disco> = defaultProps
): Promise<SafeAny> => {
  await render(IonTableComponent, {
    componentProperties: customProps,
    imports: [
      FormsModule,
      IonButtonModule,
      IonIconModule,
      IonCheckboxModule,
      IonPaginationModule,
      IonTagModule,
      IonPopConfirmModule,
      IonPopoverModule,
      IonTooltipModule,
      IonSpinnerModule,
      IonLinkModule,
    ],
    providers: [{ provide: IonThemeService, useValue: ionThemeServiceMock }],
  });
};

describe('IonTableComponent', () => {
  beforeEach(async () => {
    await sut();
  });

  it('should render table', async () => {
    expect(screen.getByTestId('ion-table'));
  });

  it('should not render pagination by default', async () => {
    expect(screen.queryAllByTestId('pagination-container')).toHaveLength(0);
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

describe('Table > columns header with tooltip', () => {
  const events = jest.fn();
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

  const propsColumnWithTooltip: IonTableProps<Disco> = {
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

describe('Table > Changes', () => {
  const propsToChange: IonTableProps<Disco> = {
    config: {
      data: [{ name: 'Blink 182', deleted: false, id: 2 }],
      columns,
    },
  };

  it('should change data in table', async () => {
    const { rerender } = await render(IonTableComponent, {
      componentProperties: propsToChange,
      imports: [
        FormsModule,
        IonButtonModule,
        IonIconModule,
        IonCheckboxModule,
        IonPaginationModule,
        IonTagModule,
        IonPopConfirmModule,
        IonPopoverModule,
        IonTooltipModule,
        IonSpinnerModule,
        IonLinkModule,
      ],
      providers: [{ provide: IonThemeService, useValue: ionThemeServiceMock }],
    });
    const newData = [{ name: 'Meteora', deleted: false, id: 2 }];
    propsToChange.config.data = [...newData];

    rerender(propsToChange);
    expect(screen.queryAllByText(newData[0].name)).toHaveLength(1);
  });

  it('should change data to empty and render no data', async () => {
    const { rerender } = await render(IonTableComponent, {
      componentProperties: propsToChange,
      imports: [
        FormsModule,
        IonButtonModule,
        IonIconModule,
        IonCheckboxModule,
        IonPaginationModule,
        IonTagModule,
        IonPopConfirmModule,
        IonPopoverModule,
        IonTooltipModule,
        IonSpinnerModule,
        IonLinkModule,
      ],
      providers: [{ provide: IonThemeService, useValue: ionThemeServiceMock }],
    });
    propsToChange.config.data = [];
    rerender(propsToChange);
    expect(screen.queryAllByText('Não há dados')).toHaveLength(1);
  });
});

describe('Table > Actions', () => {
  const actions: ActionTable[] = [
    {
      label: 'Desabilitar',
      icon: 'block',
      disabled: (row: SafeAny): boolean => {
        return row.deleted;
      },
    },
    {
      label: 'Excluir',
      icon: 'trash',
      show: (row: SafeAny): boolean => {
        return !row.name;
      },
    },
    {
      label: 'Editar',
      icon: 'pencil',
      call: (row: SafeAny): void => {
        row.name = 'editado!';
      },
      showLabel: true,
    },
  ];
  const tableWithActions = {
    ...defaultProps,
    config: {
      ...defaultProps.config,
      actions,
    },
  } as IonTableProps<Disco>;

  it('should show actions column when has action', async () => {
    await sut(tableWithActions);
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });

  it.each(actions)('should render icon action', async ({ icon }) => {
    await sut(tableWithActions);
    expect(document.getElementById(`ion-icon-${icon}`)).toBeInTheDocument();
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
    } as IonTableProps<Disco>;
    await sut(tableItemDeleted);
    const rowAction = screen.getByTestId(`row-0-${actions[0].label}`);
    expect(rowAction).toHaveAttribute('ng-reflect-danger', 'true');
    expect(within(rowAction).getByRole('button')).toHaveClass('danger');
  });

  it('should render trash button enabled when the item is not deleted', async () => {
    const tableItemDeleted = cloneDeep(tableWithActions);

    tableItemDeleted.config.data = [
      { id: 1, name: 'Item Deleted', deleted: false },
    ];

    await sut(tableItemDeleted);
    expect(screen.getByTestId('row-0-Desabilitar')).toHaveAttribute(
      'ng-reflect-disabled',
      'false'
    );
  });

  it('should render trash button disabled when the item is deleted', async () => {
    const tableItemDeleted = cloneDeep(tableWithActions);

    tableItemDeleted.config.data = [
      { id: 1, name: 'Item Deleted', deleted: true },
    ];

    await sut(tableItemDeleted);
    expect(screen.getByTestId('row-0-Desabilitar')).toHaveAttribute(
      'ng-reflect-disabled',
      'true'
    );
  });

  it('should not render when the show is false', async () => {
    const tableItemDeleted = cloneDeep(tableWithActions);

    tableItemDeleted.config.data = [{ id: 1, name: '', deleted: true }];

    await sut(tableItemDeleted);
    expect(screen.queryByTestId('row-0-Excluir')).not.toBeInTheDocument();
  });

  it('should call action when clicked in action', async () => {
    await sut(tableWithActions);
    const removeOption = document.getElementById('ion-icon-pencil');
    fireEvent.click(removeOption);
    expect(screen.getByText('editado!')).toBeInTheDocument();
  });

  it('should not render popconfirm when action dont has confirm config', async () => {
    await sut(tableWithActions);
    expect(screen.getByTestId(`row-0-${actions[0].label}`)).not.toHaveAttribute(
      'ng-reflect-ion-pop-confirm-title'
    );
  });

  it('should render action with label when showLabel is true', async () => {
    await sut(tableWithActions);
    const action = actions.find((action) => action.showLabel);
    expect(screen.getAllByText(action.label)).toHaveLength(data.length);
  });
});

describe('Table > Checkbox', () => {
  const eventSelect = jest.fn();
  const tableWithSelect: IonTableProps<Disco> = {
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

  afterEach(() => {
    eventSelect.mockClear();
  });
});

describe('Table > Differents columns data type', () => {
  const eventSelect = jest.fn();
  const columnIcon = 'check';
  const columnStatus = 'success';
  const tableDifferentColumns: IonTableProps<Disco> = {
    config: {
      columns: [
        ...JSON.parse(JSON.stringify(columns)),
        {
          key: 'year',
          label: 'Year',
          type: ColumnType.TAG,
          sort: false,
          tag: {
            icon: columnIcon,
            status: columnStatus,
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

    it('should set a status type in tag by column', async () => {
      await sut(tableDifferentColumns);
      expect(
        document.getElementsByClassName(`ion-tag outline ${columnStatus}`)
      ).toHaveLength(4);
    });

    it.each(['union', 'star-solid'])(
      'should show %s icon in tag by row data',
      async (iconRow: string) => {
        const tableWithCustomIconInTag = JSON.parse(
          JSON.stringify(tableDifferentColumns)
        ) as IonTableProps<Disco>;

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

    it.each(['warning', 'info'])(
      'should set %s status in tag by row data',
      async (statusType: string) => {
        const tableWithCustomStatusInTag = JSON.parse(
          JSON.stringify(tableDifferentColumns)
        ) as IonTableProps<Disco>;

        const columns = tableWithCustomStatusInTag.config.columns;
        const lastColumn = columns.length - 1;
        columns[lastColumn].tag = {
          statusKey: 'status',
        };

        await sut(tableWithCustomStatusInTag);
        expect(
          document.getElementsByClassName(`ion-tag outline ${statusType}`)
        ).toHaveLength(1);
      }
    );

    it.each(['#be531c', '#ab2328', '#572d2d', '#6666ff', '#cc66ff'])(
      'should set %s color in tag by row data',
      async (color: string) => {
        const tableWithCustomColorInTag = JSON.parse(
          JSON.stringify(tableDifferentColumns)
        ) as IonTableProps<Disco>;

        const columns = tableWithCustomColorInTag.config.columns;
        const lastColumn = columns.length - 1;
        columns[lastColumn].tag = {
          color,
        };

        await sut(tableWithCustomColorInTag);
        const tags = document.getElementsByClassName('ion-tag');
        for (let i = 0; i < tags.length; i++) {
          expect(tags[i]).toHaveStyle(`color: ${color};`);
        }
      }
    );
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
              deleted: false,
            },
            {
              id: 2,
              name: 'The Wise Mans Fear',
              release_date: '2011-03-01',
              value: 1016,
              deleted: false,
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
  });

  describe('Sort', () => {
    it('should not show icon sort when column not is sortable', async () => {
      await sut(tableDifferentColumns);
      expect(screen.queryAllByTestId('sort-by-year')).toHaveLength(0);
    });

    it('should not show sort button when column is not sortable', async () => {
      await sut(tableDifferentColumns);
      expect(screen.queryAllByTestId('btn-sort-by-year')).toHaveLength(0);
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
  });
});

describe('Table > Pagination', () => {
  const totalItems = 46;
  const tableWithPagination: IonTableProps<Disco> = {
    config: {
      columns: [...JSON.parse(JSON.stringify(columns))],
      data: JSON.parse(JSON.stringify(data)),
      pagination: {
        total: totalItems,
      },
    },
  };

  it('should render loading when table is loading', async () => {
    const tableWithLoading = JSON.parse(
      JSON.stringify(tableWithPagination)
    ) as IonTableProps<Disco>;
    const totalPagination = screen.queryByTestId('total-pagination');
    tableWithLoading.config.loading = true;
    await sut(tableWithLoading);
    expect(screen.getByTestId('loading-pagination')).toBeInTheDocument();
    expect(totalPagination).not.toBeInTheDocument();
  });

  it('should render loading when dont have data and table is loading', async () => {
    const tableWithLoading = JSON.parse(
      JSON.stringify(tableWithPagination)
    ) as IonTableProps<Disco>;
    tableWithLoading.config.loading = true;
    tableWithLoading.config.data = [];

    await sut(tableWithLoading);
    expect(screen.getByTestId('ion-spinner')).toBeInTheDocument();
  });

  it('should render the pagination', async () => {
    await sut(tableWithPagination);
    expect(screen.getByTestId('pagination-container')).toBeInTheDocument();
  });

  it('should render items total in table', async () => {
    await sut(tableWithPagination);
    expect(screen.queryAllByText(totalItems)).toHaveLength(1);
  });

  it('should render 7 pages when itemsPerPage is 7', async () => {
    const customPerPage = { ...tableWithPagination };
    customPerPage.config.pagination.itemsPerPage = 7;
    await sut(customPerPage);
    expect(screen.getByTestId('page-7')).toBeInTheDocument();
    expect(screen.queryAllByTestId('page-8')).toHaveLength(0);
  });

  it('should render a page selected when its passed on configuration', async () => {
    const customInitialPage = { ...tableWithPagination };
    customInitialPage.config.pagination.page = 3;
    await sut(customInitialPage);
    expect(screen.getByTestId('page-3')).toBeInTheDocument();
    expect(screen.getByTestId('page-3')).toHaveClass('selected');
  });

  it('should return to first page when sort is activated on a column', async () => {
    await sut(tableWithPagination);

    fireEvent.click(screen.getByTestId('page-2'));
    expect(screen.getByTestId('page-2')).toHaveClass('selected');

    fireEvent.click(screen.getByTestId('sort-by-name'));
    expect(screen.getByTestId('page-1')).toHaveClass('selected');
  });
});

describe('Table > Action with confirm', () => {
  it('should render popconfirm with title in action', async () => {
    const withPopconfirm = JSON.parse(
      JSON.stringify(defaultProps)
    ) as IonTableProps<Disco>;

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
    ) as IonTableProps<Disco>;

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
    ) as IonTableProps<Disco>;
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
});

describe('Table > Action with popover', () => {
  it('should render popover with title in action', async () => {
    const withPopover = JSON.parse(
      JSON.stringify(propsWithPopover)
    ) as IonTableProps<Disco>;
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
    ) as IonTableProps<Disco>;
    withPopover.events = { emit: jest.fn() } as SafeAny;
    const cancelTextOnPopover = 'Cancel action';

    const actionConfig = {
      label: 'Excluir',
      icon: 'trash',
      call: (): void => {
        return;
      },
      secondCall: (): void => {
        return;
      },
      popover: (): Partial<PopoverProps> => ({
        ionPopoverTitle: 'Você tem certeza?',
        ionPopoverActions: [{ label: cancelTextOnPopover }],
      }),
    };
    withPopover.config.actions = [actionConfig] as ActionTable[];

    await sut(withPopover);

    fireEvent.click(screen.getByTestId('row-0-Excluir'));
    expect(screen.getByText(cancelTextOnPopover)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('column-name'));
    expect(screen.queryAllByText(cancelTextOnPopover)).toHaveLength(0);
  });
});

describe('Table without Data', () => {
  const tableWithoutData: IonTableProps<Disco> = {
    config: {
      data: [],
      columns,
    },
  };

  it('should render a no data message', async () => {
    await sut(tableWithoutData);
    expect(screen.getByText('Não há dados')).toBeInTheDocument();
  });
});

describe('Table without Data and with checkBox', () => {
  const tableWithoutData: IonTableProps<Disco> = {
    config: {
      data: [],
      columns,
      check: true,
    },
  };

  it('checkbox should be disabled when there is no data', async () => {
    await sut(tableWithoutData);
    expect(screen.getByTestId('ion-checkbox')).toBeDisabled();
  });
});

@Component({
  selector: 'app',
  template: ` <div>
    <ion-table [config]="config"> </ion-table>
    <ng-template #customTemplate let-row>
      <td data-testid="custom-id-column">{{ row.id }}</td>
      <td>
        <div data-testid="custom-name-column">
          <ion-icon type="user"></ion-icon>
          <span> {{ row.name }} </span>
        </div>
      </td>
    </ng-template>
  </div>`,
})
export class WrapperCustomRowTemplateComponent implements AfterViewInit {
  @ViewChild('customTemplate', { static: false })
  customTemplate: TemplateRef<HTMLElement>;
  config: ConfigTable<Disco>;

  ngAfterViewInit(): void {
    this.config = {
      data,
      columns,
      customRowTemplate: this.customTemplate,
    };
  }
}

const sutCustomRowTemplate = async (
  customProps: IonTableProps<Disco> = defaultProps
): Promise<SafeAny> => {
  await render(WrapperCustomRowTemplateComponent, {
    componentProperties: customProps,
    imports: [
      FormsModule,
      IonButtonModule,
      IonIconModule,
      IonCheckboxModule,
      IonPaginationModule,
      IonTagModule,
      IonPopConfirmModule,
      IonPopoverModule,
      IonTableModule,
      IonSpinnerModule,
      IonLinkModule,
    ],
    providers: [{ provide: IonThemeService, useValue: ionThemeServiceMock }],
  });
};

describe('Table with custom row template', () => {
  it('should render table with custom template', async () => {
    await sutCustomRowTemplate();
    expect(
      await screen.getAllByTestId('custom-id-column').length
    ).toBeGreaterThan(0);
  });

  it('should render table with custom template', async () => {
    await sutCustomRowTemplate();
    expect(
      await screen.getAllByTestId('custom-name-column').length
    ).toBeGreaterThan(0);
  });
});

describe('Table > Link in cells', () => {
  const linkClickAction = jest.fn();

  const dataWithLink: Disco[] = [
    { id: 1, name: 'Meteora', deleted: false, year: 2003 },
  ];

  const columnsWithLink: Column[] = [
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
      key: 'url',
      label: 'URL',
      type: ColumnType.LINK,
      link: {
        action: linkClickAction,
        label: () => 'link label',
      },
    },
  ];

  afterEach(() => {
    linkClickAction.mockClear();
  });

  it('should render the link component', async () => {
    await sut({
      config: {
        data: dataWithLink,
        columns: columnsWithLink,
      },
    });
    expect(screen.getByText('link label')).toBeVisible();
  });

  it('should call the action when clicking the link', async () => {
    await sut({
      config: {
        data: dataWithLink,
        columns: columnsWithLink,
      },
    });

    fireEvent.click(screen.getByText('link label'));
    expect(linkClickAction).toHaveBeenCalled();
  });
});

describe('Table > Boolean in cells', () => {
  const dataWithBoolean: Disco[] = [
    { id: 1, name: 'Meteora', deleted: false, active: true },
    { id: 2, name: 'Living Things', deleted: false, active: false },
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
      label: 'boolean',
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
      },
    });
    expect(screen.queryByText('false')).not.toBeInTheDocument();
    expect(screen.getByText('inactivated')).toBeInTheDocument();
  });
});
