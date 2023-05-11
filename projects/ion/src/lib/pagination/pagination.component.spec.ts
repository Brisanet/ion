import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { IonButtonModule } from '../button/button.module';
import { IonPaginationProps } from '../core/types/pagination';
import { SafeAny } from '../utils/safe-any';
import {
  IonPaginationComponent,
  LIST_OF_PAGE_OPTIONS,
} from './pagination.component';

const pageEvent = jest.fn();
const defaultComponent: IonPaginationProps = {
  total: 46,
  events: {
    emit: pageEvent,
  } as SafeAny,
  page: 1,
};

const LOADING_STATUS = [true, false];

const sut = async (
  customProps: IonPaginationProps = defaultComponent
): Promise<void> => {
  await render(IonPaginationComponent, {
    componentProperties: customProps,
    declarations: [],
    imports: [FormsModule, IonButtonModule],
  });
};

describe('IonPaginationComponent', () => {
  beforeEach(async () => {
    await sut();
  });

  it.each(['1', '2', '3', '4'])(
    'should render page %s',
    async (page: string) => {
      expect(screen.getByText(page)).toBeInTheDocument();
    }
  );

  it('should be selected in first page by default', async () => {
    expect(screen.getByTestId('page-1')).toHaveClass('selected');
  });

  it.each(['left', 'right'])(
    'should render arrow %s',
    async (direction: string) => {
      expect(screen.getByTestId(`arrow-${direction}`)).toBeInTheDocument();
    }
  );

  it('should select a other page', async () => {
    const pageTwo = screen.getByTestId('page-2');
    fireEvent.click(pageTwo);
    expect(pageTwo).toHaveClass('selected');
    expect(screen.getByTestId('page-1')).not.toHaveClass('selected');
  });

  it('should render arrow right enabled when have more pages', async () => {
    expect(screen.getByTestId('arrow-right')).toBeEnabled();
  });

  it('should render arrow left enabled when has previous page', async () => {
    fireEvent.click(screen.getByTestId('page-2'));
    expect(screen.getByTestId('arrow-left')).toBeEnabled();
  });

  it('should go to the previous page when click in arrow left', async () => {
    fireEvent.click(screen.getByTestId('page-3'));
    fireEvent.click(screen.getByTestId('arrow-left'));
    expect(screen.getByTestId('page-2')).toHaveClass('selected');
  });

  it('should go to the next page when click in arrow right', async () => {
    fireEvent.click(screen.getByTestId('arrow-right'));
    expect(screen.getByTestId('page-2')).toHaveClass('selected');
  });

  it('should not show items per page by default', async () => {
    expect(screen.queryAllByText('10 / página')).toHaveLength(0);
  });

  afterEach(() => {
    pageEvent.mockClear();
  });
});

describe('Pagination > Page', () => {
  it.each([1, 2, 3, 4])(
    'should select a page %s from the table',
    async (page) => {
      await sut({
        total: page * 10,
        page: page,
      });
      expect(screen.getByTestId(`page-${page}`)).toHaveClass('selected');
    }
  );
});

describe('Pagination > Page sizes', () => {
  describe('Default', () => {
    it.each(LIST_OF_PAGE_OPTIONS)(
      'should show items per page %d',
      async (label) => {
        await sut({ ...defaultComponent, allowChangeQtdItems: true });
        userEvent.click(
          screen.getByRole('button', {
            name: /10 \/ página/i,
          })
        );
        const view = screen.getByTestId('ion-dropdown');
        expect(within(view).getByText(`${label} / página`)).toBeVisible();
      }
    );

    it.each(LOADING_STATUS)(
      'should show items per page disabled as %b when loading is %b',
      async (loadingValue) => {
        await sut({
          ...defaultComponent,
          loading: loadingValue,
          allowChangeQtdItems: true,
        });
        const itemsPerPage = screen.getByTestId('itemsPerPage');
        expect(itemsPerPage).toHaveAttribute(
          'ng-reflect-disabled',
          `${loadingValue}`
        );
      }
    );
  });

  const customPageSizeOptions = [5, 10, 15, 20];
  describe('Custom', () => {
    it.each(customPageSizeOptions)(
      'should show items per page %d',
      async (label) => {
        await sut({
          ...defaultComponent,
          pageSizeOptions: customPageSizeOptions,
          allowChangeQtdItems: true,
        });
        userEvent.click(
          screen.getByRole('button', {
            name: /10 \/ página/i,
          })
        );
        const view = screen.getByTestId('ion-dropdown');
        expect(within(view).getByText(`${label} / página`)).toBeVisible();
      }
    );
  });
});

describe('Pagination > Events', () => {
  it('should emit the page selected when selected page', async () => {
    const event = jest.fn();
    await sut({
      total: 16,
      events: {
        emit: event,
      } as SafeAny,
    });
    fireEvent.click(screen.getByTestId('page-2'));
    expect(event).toBeCalledTimes(2);
  });

  it('should show items per page 10 when params is informed', async () => {
    await sut({
      total: 16,
      allowChangeQtdItems: true,
    });
    expect(screen.queryAllByText('10 / página')).toHaveLength(1);
  });

  it('should change total pages when change items per page', async () => {
    await sut({
      total: 46,
      allowChangeQtdItems: true,
    });
    const label = '10 / página';
    fireEvent.click(await screen.getByTestId(`btn-${label}`));
    fireEvent.click(screen.getByText('20 / página'));
    expect(screen.queryAllByTestId('page-4')).toHaveLength(0);
  });

  it('should show items per page 20 when set initial itemsPerPage = 20', async () => {
    await sut({
      total: 16,
      allowChangeQtdItems: true,
      itemsPerPage: 20,
    });
    expect(screen.queryAllByText('20 / página')).toHaveLength(1);
  });
});
