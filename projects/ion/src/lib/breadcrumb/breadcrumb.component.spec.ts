import { fireEvent, render, screen } from '@testing-library/angular';
import { IonBreadcrumbComponent, BreadcrumbItem } from './breadcrumb.component';
import { IonIconComponent } from '../icon/icon.component';
import { IonDropdownComponent } from '../dropdown/dropdown.component';

const selectEvent = jest.fn();

const TRUNCATE_LIMIT = 5;

const items: BreadcrumbItem[] = [
  { label: 'Titulo 1', link: '/titulo1' },
  { label: 'Titulo 2', link: '/titulo2' },
  { label: 'Titulo 3', link: '/titulo3' },
  { label: 'Titulo 4', link: '/titulo4' },
  { label: 'Titulo 5', link: '/titulo5' },
  { label: 'Titulo 6', link: '/titulo6' },
  { label: 'Titulo 7', link: '/titulo7' },
  { label: 'Titulo 8', link: '/titulo8' },
  { label: 'Titulo 9', link: '/titulo9' },
];

const visibleItemsAfterEllipsis: BreadcrumbItem[] = items.filter(
  (_, index) => index >= items.length - TRUNCATE_LIMIT
);

const itemsInDropdown: BreadcrumbItem[] = items.filter(
  (_, index) => index && index < items.length - TRUNCATE_LIMIT
);

const sut = async (
  customProps: Partial<{
    breadcrumbs: BreadcrumbItem[];
    truncate: boolean;
  }> = {}
): Promise<void> => {
  await render(IonBreadcrumbComponent, {
    componentInputs: {
      breadcrumbs: items,
      truncate: false,
      ...customProps,
    },
    componentOutputs: {
      selected: {
        emit: selectEvent,
      } as any,
    },
    imports: [IonIconComponent, IonDropdownComponent],
  });
};

describe('Breadcrumb', () => {
  afterEach(() => {
    selectEvent.mockClear();
  });

  describe('elements rendered', () => {
    it.each(items)(
      'should render $label in breadcrumb',
      async (link: BreadcrumbItem) => {
        await sut({ truncate: false });
        expect(screen.getByText(link.label)).toBeInTheDocument();
      }
    );
  });

  describe('elements classes', () => {
    it.each(items)(
      'should set class breacrumbs-link in $label element',
      async (item: BreadcrumbItem) => {
        await sut();
        expect(screen.getByText(item.label)).toHaveClass('breacrumbs-link');
      }
    );
  });

  it('should emit the selected breadcrumb', async () => {
    await sut();
    const [firstItem] = items;
    fireEvent.click(screen.getByText(firstItem.label));
    expect(selectEvent).toHaveBeenCalledTimes(1);
    expect(selectEvent).toHaveBeenCalledWith(firstItem);
  });

  it('should not emit the selected breadcrumb is the last one', async () => {
    await sut();
    const lastItem = items[items.length - 1];
    fireEvent.click(screen.getByText(lastItem.label));
    expect(selectEvent).toHaveBeenCalledTimes(0);
    expect(selectEvent).not.toHaveBeenCalledWith(lastItem);
  });

  describe('with truncation', () => {
    beforeEach(async () => {
      await sut({ truncate: true });
    });

    describe('elements rendered', () => {
      const [firstItem] = items;

      it(`should render ${firstItem.label} in breadcrumb`, async () => {
        expect(screen.getByText(firstItem.label)).toBeInTheDocument();
      });

      it('should render "..." in breadcrumb', async () => {
        expect(
          screen.queryByTestId('breadcrumbs-ellipsis')
        ).toBeInTheDocument();
      });

      it.each(visibleItemsAfterEllipsis)(
        'should render $label in breadcrumb',
        async (link: BreadcrumbItem) => {
          expect(screen.queryByText(link.label)).toBeInTheDocument();
        }
      );
    });

    describe('breadcrumbs dropdown', () => {
      it('should open dropdown when click in ellipsis', async () => {
        fireEvent.click(screen.getByTestId('breadcrumbs-ellipsis'));
        expect(
          screen.queryByTestId('breadcrumbs-dropdown')
        ).toBeInTheDocument();
      });

      it.each(itemsInDropdown)(
        'should render $label in dropdown',
        async (link: BreadcrumbItem) => {
          fireEvent.click(screen.getByTestId('breadcrumbs-ellipsis'));
          expect(screen.queryByText(link.label)).toBeInTheDocument();
        }
      );

      it('should emit the selected element in dropdown', async () => {
        fireEvent.click(screen.getByTestId('breadcrumbs-ellipsis'));
        const [firstItem] = itemsInDropdown;
        fireEvent.click(screen.getByText(firstItem.label));
        expect(selectEvent).toHaveBeenCalledTimes(1);
        expect(selectEvent).toHaveBeenCalledWith(firstItem);
      });
    });
  });
});
