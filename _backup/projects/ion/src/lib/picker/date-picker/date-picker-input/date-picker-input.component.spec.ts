import { IonInputModule } from './../../../input/input.module';
import { IonButtonModule } from './../../../button/button.module';
import { render, screen, fireEvent, within } from '@testing-library/angular';
import {
  IonDatePickerInputComponent,
  IonDatePickerInputComponentProps,
} from './date-picker-input.component';

const sut = async (
  customProps?: IonDatePickerInputComponentProps
): Promise<void> => {
  await render(IonDatePickerInputComponent, {
    componentProperties: customProps,
    imports: [IonButtonModule, IonInputModule],
    declarations: [],
  });
};

describe('IonDatePickerInputComponent', () => {
  it('Should render IonDatePickerInputComponent', async () => {
    await sut();
    const input = screen.getByTestId('input-element');
    expect(screen.findByTestId('container-input')).toBeTruthy();
    expect(input).toHaveValue('');
    expect(input).toHaveAttribute('placeholder', 'Selecione a data');
  });

  it('should render "2023-01-28"', async () => {
    const date = '2023-01-28';
    await sut({ date });
    expect(screen.getByTestId('input-element')).toHaveValue(date);
  });

  it('Should render "placeholder render" in placeholder input', async () => {
    const placeholder = 'placeholder render';
    await sut({ placeholder });
    const input = screen.getByTestId('input-element');
    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  it('should clear input when clicking in close button', async () => {
    const date = '2023-01-28';
    await sut({ date });
    let input = await screen.getByTestId('input-element');
    expect(input).toHaveValue(date);

    const clearButton = await screen.findByTestId('input-button');
    expect(clearButton).toBeTruthy();

    fireEvent.click(within(clearButton).getByRole('button'));
    input = await screen.getByTestId('input-element');
    expect(input).toHaveValue('');
  });
});
