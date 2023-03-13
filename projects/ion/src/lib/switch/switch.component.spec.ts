import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { SafeAny } from '../utils/safe-any';
import { IonSwitchComponent } from './switch.component';
import { SwitchSize } from '../core/types';

let ionSwitch: HTMLElement;

const emitValue = {
  emit: jest.fn(),
} as SafeAny;

const sizes: SwitchSize[] = ['sm', 'md', 'lg'];

const sut = async (
  customProps: Partial<IonSwitchComponent> = {}
): Promise<HTMLElement> => {
  await render(IonSwitchComponent, {
    componentProperties: { ...customProps, atValueChange: emitValue },
  });
  return screen.getByTestId('ion-switch');
};

describe('IonSwitchComponent', () => {
  describe('General', () => {
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
  describe.each(sizes)('Sizes - %s', (size) => {
    beforeEach(async () => {
      ionSwitch = await sut({ size });
    });
    it(`should render a switch with size attribute and value '${size}'`, () => {
      expect(ionSwitch).toHaveAttribute('size', size);
    });
  });
  describe('Disabled', () => {
    it('should be enabled by default', async () => {
      ionSwitch = await sut();
      expect(ionSwitch).not.toBeDisabled();
    });
    it('should be disabled', async () => {
      ionSwitch = await sut({ disabled: true });
      expect(ionSwitch).toBeDisabled();
    });
  });
});
