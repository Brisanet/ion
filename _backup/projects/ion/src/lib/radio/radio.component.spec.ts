import { fireEvent, render, screen } from '@testing-library/angular';
import { IonRadioComponent } from './radio.component';

const sut = async (customProps = {}): Promise<HTMLElement> => {
  await render(IonRadioComponent, {
    componentProperties: customProps,
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

    it('should is marked when clicked', async () => {
      await sut();
      const element = screen.getByRole('radio');
      fireEvent.click(element);
      expect(element).toBeChecked();
      expect(element).toHaveClass('radio-checked');
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
  });
});
