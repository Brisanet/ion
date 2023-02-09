import { IonIconComponent } from './../icon/icon.component';
import { SafeAny } from './../utils/safe-any';
import { fireEvent, render, screen } from '@testing-library/angular';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbProps,
} from './breadcrumb.component';

const selectEvent = jest.fn();
const options = [
  {
    label: 'Inicio',
    link: '/home',
  },
  {
    label: 'Recursos',
    link: '/recursos',
  },
];

const sut = async (
  customProps: BreadcrumbProps = {
    selected: {
      emit: selectEvent,
    },
  } as SafeAny
): Promise<void> => {
  await render(BreadcrumbComponent, {
    componentProperties: {
      breadcrumbs: options,
    },
    declarations: [IonIconComponent],
  });
};

describe('Breadcrumb', () => {
  it.each(options)(
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

  it.skip('should emit a event with the breadcrumb selected', async () => {
    const rendered = await sut({
      selected: {
        emit: selectEvent,
      },
    } as SafeAny);
    fireEvent.click(screen.getByText(options[0].label));
    expect(rendered).toHaveBeenCalledWith({
      label: options[0].label,
      link: options[0].link,
    });
  });
});
