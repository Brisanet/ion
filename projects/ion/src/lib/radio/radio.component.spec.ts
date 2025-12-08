import { fireEvent, render, screen } from '@testing-library/angular';
import { IonRadioComponent } from './radio.component';
import { SafeAny } from '../utils/safe-any';
import userEvent from '@testing-library/user-event';

const sut = async (customProps: SafeAny = {}): Promise<HTMLElement> => {
  await render(IonRadioComponent, {
    componentInputs: customProps,
  });
  return screen.getByRole('radio');
};

describe('IonRadioComponent', () => {
  it('should create an input', async () => {
    expect(await sut()).toBeInTheDocument();
  });

  it('should create input with label', async () => {
    const labelText = 'Teste';
    await sut({ label: labelText });
    expect(screen.getAllByText(labelText)).toHaveLength(1);
  });

  describe('Checked/Unchecked', () => {
    it('should create input unchecked by default', async () => {
      expect(await sut()).not.toBeChecked();
    });

    it('should create input checked', async () => {
      const element = await sut({
        checked: true,
      });
      expect(element).toBeChecked();
    });

    it('should be marked when clicked', async () => {
      await sut();
      const element = screen.getByRole('radio');
      fireEvent.click(element);
      expect(element).toBeChecked();
      expect(element).toHaveClass('radio-checked');
    });

    it('should emit checkedChange when clicked', async () => {
      const checkedChange = jest.fn();
      await render('<ion-radio [checked]="checked" (checkedChange)="handleChange($event)"></ion-radio>', {
        imports: [IonRadioComponent],
        componentProperties: {
          checked: false,
          handleChange: checkedChange,
        },
      });
      const element = screen.getByRole('radio');
      fireEvent.click(element);
      expect(checkedChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Enabled/Disabled', () => {
    it('should create input enabled by default', async () => {
      expect(await sut()).toBeEnabled();
    });

    it('should create input disabled', async () => {
      const element = await sut({
        disabled: true,
      });
      expect(element).toBeDisabled();
    });

    it('should not change state when disabled and clicked', async () => {
      const element = await sut({
        disabled: true,
        checked: false,
      });
      await userEvent.click(element);
      expect(element).not.toBeChecked();
    });
  });
});
