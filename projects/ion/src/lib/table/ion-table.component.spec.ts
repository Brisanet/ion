import { fireEvent, render, screen } from '@testing-library/angular';
import { IonTableComponent } from './ion-table.component';
import { ConfigTable } from './utils';
import { SafeAny } from '../utils/safe-any';
import { IonButtonComponent } from '../button/button.component';
import { IonTagComponent } from '../tag/ion-tag.component';
import { IonIconComponent } from '../icon/icon.component';
import { IonPaginationComponent } from '../pagination/pagination.component';
import { IonCheckboxComponent } from '../checkbox/checkbox.component';
import { IonTooltipDirective } from '../tooltip/tooltip.directive';
import { IonPopConfirmDirective } from '../popconfirm/popconfirm.directive';

const columns = [
  { label: 'Column 1', key: 'col1' },
  { label: 'Column 2', key: 'col2' },
];

const data = [
  { col1: 'Data 1', col2: 'Data 2' },
  { col1: 'Data 3', col2: 'Data 4' },
];

const defaultProps: ConfigTable<SafeAny> = {
  data,
  columns,
};

const sut = async (
  customProps: ConfigTable<SafeAny> = defaultProps,
): Promise<void> => {
  await render(IonTableComponent, {
    componentInputs: { config: customProps },
    imports: [
      IonButtonComponent,
      IonTagComponent,
      IonIconComponent,
      IonPaginationComponent,
      IonCheckboxComponent,
      IonTooltipDirective,
      IonPopConfirmDirective,
    ],
  });
};

describe('IonTableComponent', () => {
  it('should render the table', async () => {
    await sut();
    expect(screen.getByTestId('ion-table')).toBeVisible();
  });

  it('should render columns', async () => {
    await sut();
    expect(screen.getByText('Column 1')).toBeVisible();
    expect(screen.getByText('Column 2')).toBeVisible();
  });

  it('should render data', async () => {
    await sut();
    expect(screen.getByText('Data 1')).toBeVisible();
    expect(screen.getByText('Data 2')).toBeVisible();
  });

  it('should render no data message when data is empty', async () => {
    await sut({ ...defaultProps, data: [] });
    expect(screen.getByText('Não há dados')).toBeVisible();
  });

  it('should render checkbox when check is true', async () => {
    await sut({ ...defaultProps, check: true });
    expect(screen.getByTestId('table-check-all')).toBeVisible();
  });

  it('should render pagination when configured', async () => {
    await sut({
      ...defaultProps,
      pagination: { total: 10, itemsPerPage: 5, page: 1 },
    });
    expect(screen.getByTestId('pagination-container')).toBeVisible();
  });
});
