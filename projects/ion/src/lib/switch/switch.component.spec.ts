import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { SafeAny } from '../utils/safe-any';
import { IonSwitchComponent } from './switch.component';

let ionSwitch: HTMLElement;

const emitValue = {
  emit: jest.fn(),
} as SafeAny;

const sut = async (
  customProps: Partial<IonSwitchComponent> = {}
): Promise<HTMLElement> => {
  await render(IonSwitchComponent, {
    componentProperties: { ...customProps, atValueChange: emitValue },
  });
  return screen.getByTestId('ion-switch');
};

describe('IonSwitchComponent', () => {
  beforeEach(async () => {
    ionSwitch = await sut();
  });
  it('should render switch', async () => {
    expect(ionSwitch).toBeInTheDocument();
  });
  it('should render switch with default class', () => {
    expect(ionSwitch).toHaveClass('ion-switch');
  });
  it('should change class to active when switch is clicked', () => {
    userEvent.click(ionSwitch);
    expect(ionSwitch).toHaveClass('ion-switch--active');
  });
  it('should remove active class when switch is clicked twice', () => {
    userEvent.click(ionSwitch);
    expect(ionSwitch).toHaveClass('ion-switch--active');

    userEvent.click(ionSwitch);
    expect(ionSwitch).toHaveClass('ion-switch');
  });
  it('should emit correct value when switch is clicked', () => {
    userEvent.click(ionSwitch);
    expect(emitValue.emit).toBeCalledWith(true);

    userEvent.click(ionSwitch);
    expect(emitValue.emit).toBeCalledWith(false);
  });
});
