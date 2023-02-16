import { IonIconModule } from './../icon/icon.module';
import { SafeAny } from './../utils/safe-any';
import { fireEvent, render, screen } from '@testing-library/angular';
import {
  IonBreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbProps,
} from './breadcrumb.component';

const selectEvent = jest.fn();

const items: BreadcrumbItem[] = [
  {
    label: 'Inicio',
    link: '/home',
  },
  {
    label: 'Recursos',
    link: '/recursos',
  },
  {
    label: 'Tecnico',
    link: '/recursos/1',
  },
];

const sut = async (
  customProps: BreadcrumbProps = {
    selected: {
      emit: selectEvent,
    },
  } as SafeAny
): Promise<void> => {
  await render(IonBreadcrumbComponent, {
    componentProperties: {
      breadcrumbs: items,
      ...customProps,
    },
    imports: [IonIconModule],
  });
};

describe('Breadcrumb', () => {
  it.each(items)(
    'should render %s in breadcrumb',
    async (link: BreadcrumbItem) => {
      await sut();
      expect(screen.getByText(link.label)).toBeInTheDocument();
    }
  );

  it('should render recursos in breadcrumb', async () => {
    await sut();
    expect(screen.getByText('Recursos')).toHaveClass('breacrumbs-link');
  });

  it('should emit the selected breadcrumb', async () => {
    await sut();
    const [firstItem] = items;

    const element = screen.getByText(firstItem.label);
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(selectEvent).toBeCalledTimes(1);
    expect(selectEvent).toBeCalledWith(firstItem);
  });

  it('should not emit the selected breadcrumb is the last one', async () => {
    await sut();
    const lastItem = items[items.length - 1];

    const element = screen.getByText(lastItem.label);
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(selectEvent).toBeCalledTimes(0);
    expect(selectEvent).not.toBeCalledWith(lastItem);
  });

  afterEach(() => {
    selectEvent.mockClear();
  });
});
