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
});
