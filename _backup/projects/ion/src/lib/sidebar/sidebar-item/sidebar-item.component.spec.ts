import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { IonTooltipModule } from './../../tooltip/tooltip.module';
import { IonIconComponent } from '../../icon/icon.component';
import { IonSidebarItemComponent } from './sidebar-item.component';
import { SafeAny } from '../../utils/safe-any';

const defaultTestId = 'ion-sidebar-item';
const defaultClass = 'ion-sidebar-item';

const sut = async (
  props: Partial<IonSidebarItemComponent> = {}
): Promise<void> => {
  await render(IonSidebarItemComponent, {
    componentProperties: { ...props },
    declarations: [IonIconComponent],
    imports: [IonTooltipModule],
  });
};

describe('SidebarItem', () => {
  it('should render sidebar item', async () => {
    await sut();
    expect(screen.getByTestId(defaultTestId)).toBeInTheDocument();
  });
  it('should render a given text', async () => {
    const title = 'Título';
    await sut({ title });
    expect(screen.getByTestId(defaultTestId)).toHaveTextContent(title);
  });
  it('should render a given icon', async () => {
    const icon = 'pencil';
    await sut({ icon });
    expect(document.getElementById(`ion-icon-${icon}`)).toBeInTheDocument();
  });
  it('should render unselected by default', async () => {
    await sut();
    expect(screen.getByTestId(defaultTestId)).toHaveClass(defaultClass);
  });
  it('should render selected when prop is passed as true', async () => {
    await sut({ selected: true });
    expect(screen.getByTestId(defaultTestId)).toHaveClass(
      `${defaultClass}--selected`
    );
  });
  it('should select on click by default', async () => {
    await sut();
    const element = screen.getByTestId(defaultTestId);
    userEvent.click(element);
    expect(element).toHaveClass(`${defaultClass}--selected`);
  });
  it('should not select on click when informed', async () => {
    await sut({
      selectable: false,
    });
    const element = screen.getByTestId(defaultTestId);
    userEvent.click(element);
    expect(element).not.toHaveClass(`${defaultClass}--selected`);
  });
  it('should render disabled when prop is passed as true', async () => {
    await sut({ disabled: true });
    expect(screen.getByTestId(defaultTestId)).toBeDisabled();
  });
  it('should render block icon when disabled', async () => {
    await sut({ disabled: true, sidebarClosed: false });
    expect(document.getElementById('ion-icon-block')).toBeInTheDocument();
  });
  it('should emit an event when click', async () => {
    const emit = jest.fn();
    await sut({ atClick: { emit } as SafeAny });
    userEvent.click(screen.getByTestId(defaultTestId));
    expect(emit).toHaveBeenCalled();
  });
});
