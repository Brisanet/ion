import { fireEvent, render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { IonButtonComponent } from '../button/button.component';
import { IonPaginationProps } from '../core/types/pagination';
import { SafeAny } from '../utils/safe-any';
import {
  IonPaginationComponent,
  LIST_OF_PAGE_OPTIONS,
} from './pagination.component';

const pageEvent = jest.fn();
const defaultComponent: IonPaginationProps = {
  total: 46,
  page: 1,
};

const LOADING_STATUS = [true, false];

const sut = async (
  customProps: IonPaginationProps = defaultComponent,
): Promise<void> => {
  const { events, ...componentInputs } = customProps as SafeAny;

  await render(IonPaginationComponent, {
    componentInputs: componentInputs as SafeAny,
    imports: [IonButtonComponent],
    on: {
      events: events?.emit ?? pageEvent,
    },
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
    },
  );

  it('should be selected in first page by default', async () => {
    expect(screen.getByTestId('page-1')).toHaveClass('selected');
  });

  it.each(['left', 'right'])(
    'should render arrow %s',
    async (direction: string) => {
      expect(screen.getByTestId(`arrow-${direction}`)).toBeInTheDocument();
    },
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
    const previousBtn = screen.getByTestId('arrow-left');
    fireEvent.click(screen.getByTestId('page-3'));
    fireEvent.click(within(previousBtn).getByRole('button'));
    expect(screen.getByTestId('page-2')).toHaveClass('selected');
  });

  it('should go to the next page when click in arrow right', async () => {
    const nextBtn = screen.getByTestId('arrow-right');
    fireEvent.click(within(nextBtn).getByRole('button'));
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
    },
  );
});

describe('Pagination > Page sizes', () => {
  describe('Default', () => {
    it.each(LIST_OF_PAGE_OPTIONS)(
      'should show items per page %d',
      async (label) => {
        await sut({ ...defaultComponent, allowChangeQtdItems: true });
        await userEvent.click(
          screen.getByRole('button', {
            name: /10 \/ página/i,
          }),
        );
        const view = screen.getByTestId('ion-dropdown');
        expect(within(view).getByText(`${label} / página`)).toBeVisible();
      },
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
        if (loadingValue) {
          expect(itemsPerPage).toHaveAttribute('disabled');
        } else {
          expect(itemsPerPage).not.toHaveAttribute('disabled');
        }
      },
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
        await userEvent.click(
          screen.getByRole('button', {
            name: /10 \/ página/i,
          }),
        );
        const view = screen.getByTestId('ion-dropdown');
        expect(within(view).getByText(`${label} / página`)).toBeVisible();
      },
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
    expect(event).toHaveBeenCalledTimes(2);
  });

  it('should not emit an event when the selected page is already selected', async () => {
    const event = jest.fn();
    await sut({
      total: 16,
      events: {
        emit: event,
      } as SafeAny,
    });
    event.mockClear();
    expect(screen.getByTestId('page-1')).toHaveClass('selected');
    fireEvent.click(screen.getByTestId('page-1'));
    expect(event).not.toHaveBeenCalled();
  });

  it('should show the itemsPerPage default value when is not provided', async () => {
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
    fireEvent.click(screen.getByTestId(`btn-${label}`));
    fireEvent.click(screen.getByText('25 / página'));
    expect(screen.queryAllByTestId('page-3')).toHaveLength(0);
  });

  it.each(LIST_OF_PAGE_OPTIONS)(
    'should show items per page %d selected as default when value is given',
    async (value) => {
      await sut({
        total: 16,
        allowChangeQtdItems: true,
        itemsPerPage: value,
      });
      expect(screen.queryAllByText(`${value} / página`)).toHaveLength(1);
    },
  );

  it('should select the last page when itemsPerPage changes to a value smaller than the current page selected', async () => {
    await sut({
      total: 26,
      allowChangeQtdItems: true,
    });

    fireEvent.click(screen.getByTestId('page-3'));
    fireEvent.click(screen.getByTestId('btn-10 / página'));
    fireEvent.click(screen.getByText('25 / página'));

    expect(screen.getByTestId('page-2')).toHaveClass('selected');
  });
});

describe('Advanced Pagination', () => {
  it('should show advanced pagination when total pages is more than 10', async () => {
    await sut({ ...defaultComponent, total: 110 });
    expect(screen.getByTestId('advanced-pagination')).toBeVisible();
  });
  describe('basics - more right button', () => {
    beforeEach(async () => {
      await sut({ ...defaultComponent, total: 110 });
      await userEvent.click(screen.getByTestId('page-1'));
    });
    it('should show right more button with more icon', () => {
      expect(screen.getByTestId('more-right')).toBeVisible();
      expect(document.getElementById('ion-icon-more')).toBeVisible();
    });
    it('should not show left more button', () => {
      expect(screen.queryByTestId('more-left')).toBeNull();
    });
    it('should show arrow right icon when hover on more right button', async () => {
      await userEvent.hover(screen.getByTestId('more-right'));
      await userEvent.hover(screen.getByTestId('more-right'));
      expect(document.getElementById('ion-icon-right3')).toBeVisible();
    });
    it('should skip five pages when click on more right button', async () => {
      const moreRightBtn = within(screen.getByTestId('more-right')).getByRole(
        'button',
      );
      await userEvent.click(moreRightBtn);
      expect(screen.getByTestId('page-6')).toHaveClass('selected');
    });
  });
  describe('basics - more left button', () => {
    beforeEach(async () => {
      await sut({ ...defaultComponent, total: 110 });
      await userEvent.click(screen.getByTestId('page-11'));
    });
    it('should show left more button with more icon', () => {
      expect(screen.getByTestId('more-left')).toBeVisible();
      expect(document.getElementById('ion-icon-more')).toBeVisible();
    });
    it('should not show right more button', () => {
      expect(screen.queryByTestId('more-right')).toBeNull();
    });
    it('should show arrow left icon when hover on more left button', async () => {
      await userEvent.hover(screen.getByTestId('more-left'));
      expect(document.getElementById('ion-icon-left3')).toBeVisible();
    });
    it('should go back five pages when click on more left button', async () => {
      const moreLeftBtn = screen.getByTestId('more-left');
      await userEvent.click(within(moreLeftBtn).getByRole('button'));
      expect(screen.getByTestId('page-6')).toHaveClass('selected');
    });
  });
  describe('more left and right button', () => {
    beforeEach(async () => {
      await sut({ ...defaultComponent, total: 110 });
      await userEvent.click(screen.getByTestId('page-5'));
    });
    it('should show left more button with more icon', () => {
      expect(screen.getByTestId('more-left')).toBeVisible();
      expect(document.getElementById('ion-icon-more')).toBeVisible();
    });
    it('should show right more button with more icon', () => {
      expect(screen.getByTestId('more-right')).toBeVisible();
      expect(document.getElementById('ion-icon-more')).toBeVisible();
    });
    it('should go back to first page when its not possible to go back five pages', async () => {
      const moreLeftBtn = screen.getByTestId('more-left');
      await userEvent.click(within(moreLeftBtn).getByRole('button'));
      expect(screen.getByTestId('page-1')).toHaveClass('selected');
    });
    it('should go to last page when its not possible to go forward five pages', async () => {
      const moreRightBtn = screen.getByTestId('more-right');
      await userEvent.click(screen.getByTestId('page-7'));
      await userEvent.click(within(moreRightBtn).getByRole('button'));
      expect(screen.getByTestId('page-11')).toHaveClass('selected');
    });
  });
  describe('buttons visibility', () => {
    describe('first three pages selected', () => {
      beforeEach(async () => {
        await sut({ ...defaultComponent, total: 110 });
        userEvent.click(screen.getByTestId('page-1'));
      });
      it('should show first and last page', () => {
        expect(screen.getByTestId('page-1')).toBeVisible();
        expect(screen.getByTestId('page-11')).toBeVisible();
      });
      it.each(['2', '3', '4', '5'])('should show page %s', (page) => {
        expect(screen.getByTestId(`page-${page}`)).toBeVisible();
      });
      it.each(['6', '7', '8', '9', '10'])('should not show page %s', (page) => {
        expect(screen.queryByTestId(`page-${page}`)).toBeNull();
      });
    });
    describe('when page 4 is selected', () => {
      beforeEach(async () => {
        await sut({ ...defaultComponent, total: 110 });
        await userEvent.click(screen.getByTestId('page-4'));
      });
      it('should show first and last page', () => {
        expect(screen.getByTestId('page-1')).toBeVisible();
        expect(screen.getByTestId('page-11')).toBeVisible();
      });
      it.each(['2', '3', '4', '5', '6'])('should show page %s', (page) => {
        expect(screen.getByTestId(`page-${page}`)).toBeVisible();
      });
      it.each(['7', '8', '9', '10'])('should not show page %s', (page) => {
        expect(screen.queryByTestId(`page-${page}`)).toBeNull();
      });
    });
    describe('when a middle page is selected', () => {
      beforeEach(async () => {
        await sut({ ...defaultComponent, total: 110 });
        await userEvent.click(screen.getByTestId('page-5'));
      });
      it('should show first and last page', () => {
        expect(screen.getByTestId('page-1')).toBeVisible();
        expect(screen.getByTestId('page-11')).toBeVisible();
      });
      it.each(['3', '4', '5', '6', '7'])('should show page %s', (page) => {
        expect(screen.getByTestId(`page-${page}`)).toBeVisible();
      });
      it.each(['2', '8', '9', '10'])('should not show page %s', (page) => {
        expect(screen.queryByTestId(`page-${page}`)).toBeNull();
      });
    });
    describe('when page selected is three pages before last page', () => {
      beforeEach(async () => {
        await sut({ ...defaultComponent, total: 110 });
        const moreRightBtn = screen.getByTestId('more-right');
        await userEvent.click(screen.getByTestId('page-3'));
        await userEvent.click(within(moreRightBtn).getByRole('button'));
      });
      it('should show first and last page', () => {
        expect(screen.getByTestId('page-1')).toBeVisible();
        expect(screen.getByTestId('page-11')).toBeVisible();
      });
      it.each(['6', '7', '8', '9', '10'])('should show page %s', (page) => {
        expect(screen.getByTestId(`page-${page}`)).toBeVisible();
      });
      it.each(['2', '3', '4', '5'])('should not show page %s', (page) => {
        expect(screen.queryByTestId(`page-${page}`)).toBeNull();
      });
    });
    describe('when page selected is two pages before last page', () => {
      beforeEach(async () => {
        await sut({ ...defaultComponent, total: 110 });
        await userEvent.click(screen.getByTestId('page-11'));
        await userEvent.click(screen.getByTestId('page-9'));
      });
      it('should show first and last page', () => {
        expect(screen.getByTestId('page-1')).toBeVisible();
        expect(screen.getByTestId('page-11')).toBeVisible();
      });
      it.each(['7', '8', '9', '10'])('should show page %s', (page) => {
        expect(screen.getByTestId(`page-${page}`)).toBeVisible();
      });
      it.each(['2', '3', '4', '5', '6'])('should not show page %s', (page) => {
        expect(screen.queryByTestId(`page-${page}`)).toBeNull();
      });
    });
    describe('when page selected is the page before the last', () => {
      beforeEach(async () => {
        await sut({ ...defaultComponent, total: 110 });
        await userEvent.click(screen.getByTestId('page-11'));
        await userEvent.click(screen.getByTestId('page-10'));
      });
      it('should show first and last page', () => {
        expect(screen.getByTestId('page-1')).toBeVisible();
        expect(screen.getByTestId('page-11')).toBeVisible();
      });
      it.each(['7', '8', '9', '10'])('should show page %s', (page) => {
        expect(screen.getByTestId(`page-${page}`)).toBeVisible();
      });
      it.each(['2', '3', '4', '5', '6'])('should not show page %s', (page) => {
        expect(screen.queryByTestId(`page-${page}`)).toBeNull();
      });
    });
  });
});
