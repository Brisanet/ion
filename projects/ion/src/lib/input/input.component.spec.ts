import { IonIconComponent } from './../icon/icon.component';
import { render, screen, fireEvent } from '@testing-library/angular';
import { InputComponent, IonInputProps } from './input.component';

const sut = async (customProps?: IonInputProps) => {
  await render(InputComponent, {
    componentProperties: customProps || {
      label: 'input',
    },
    declarations: [IonIconComponent],
  });
};

describe(InputComponent, () => {
  it('Should allow letters to be inputted', async () => {
    await sut();
    fireEvent.change(screen.getByTestId('inputElement'), {
      target: { value: 'input' },
    });
    expect(screen.getByTestId('inputElement')).toHaveValue('input');
  });

  it('should render input component disabled', async () => {
    await sut({ disabled: true });
    const element = screen.getByTestId('inputElement');
    expect(element).toBeDisabled();
  });

  it('should render input icon left', async () => {
    await sut({ iconDirection: 'left' });
    expect(document.getElementById('ion-icon-trash')).toBeTruthy();
  });

  it('should render input icon right', async () => {
    await sut({ iconDirection: 'right' });
    expect(document.getElementById('ion-icon-trash')).toBeTruthy();
  });

  it.skip('should render input icon valid', async () => {
    await sut();
    expect(document.getElementById('icon-valid')).toBeTruthy();
  });

  it.skip('should render input icon invalid', async () => {
    await sut();
    expect(document.getElementById('icon-invalid')).toBeTruthy();
  });
});
