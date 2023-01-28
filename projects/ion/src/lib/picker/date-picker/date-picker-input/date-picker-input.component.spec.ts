import { render, screen, fireEvent } from '@testing-library/angular';
import {
  DatePickerInputComponent,
  DatePickerInputComponentProps,
} from './date-picker-input.component';
import { ButtonModule } from '../../../button/button.module';

const sut = async (
  customProps?: DatePickerInputComponentProps
): Promise<void> => {
  await render(DatePickerInputComponent, {
    componentProperties: customProps,
    imports: [ButtonModule],
    declarations: [],
  });
};

describe('DatePickerInputComponent', () => {
  it('Should render DatePickerInputComponent', async () => {
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

    const clearButton = await screen.findByTestId('inputIcon-button');
    expect(clearButton).toBeTruthy();

    fireEvent.click(clearButton);
    input = await screen.getByTestId('input-element');
    expect(input).toHaveValue('');
  });
});
