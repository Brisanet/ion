import { SafeAny } from './../utils/safe-any';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/angular';
import { IonInputAreaComponent } from './input-area.component';
import { IonInputAreaProps } from '../core/types/input-area';

const sut = async (customProps?: IonInputAreaProps): Promise<void> => {
  await render(IonInputAreaComponent, {
    componentProperties: customProps,
    imports: [CommonModule, FormsModule],
    declarations: [],
  });
};

describe('IonInputAreaComponent', () => {
  it('should render input with a given placeholder', async () => {
    const placeholder = 'Search';
    await sut({ placeholder });
    const input = screen.getByTestId('input-area');
    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  it('should render input with an empty placeholder if none is passed', async () => {
    await sut();
    const input = screen.getByTestId('input-area');
    expect(input).not.toHaveAttribute('placeholder');
  });

  it('should allow letters to be inputted', async () => {
    await sut();
    const inputValue = 'input';
    userEvent.type(screen.getByTestId('input-area'), inputValue);
    expect(screen.getByTestId('input-area')).toHaveValue(inputValue);
  });

  it('should render input columns default', async () => {
    await sut();
    const input = screen.getByTestId('input-area');
    expect(input).toHaveAttribute('cols', '30');
  });

  it('should render input colunms when changed', async () => {
    const cols = '31';
    await sut({ cols });
    const input = screen.getByTestId('input-area');
    expect(input).toHaveAttribute('cols', cols);
  });

  it('should render input rows default', async () => {
    await sut();
    const input = screen.getByTestId('input-area');
    expect(input).toHaveAttribute('rows', '5');
  });

  it('should render input rows when changed', async () => {
    const rows = '6';
    await sut({ rows });
    const input = screen.getByTestId('input-area');
    expect(input).toHaveAttribute('rows', rows);
  });

  it('should render input component disabled', async () => {
    await sut({ disabled: true });
    const element = screen.getByTestId('input-area');
    expect(element).toBeDisabled();
  });

  it('should emit an event output', async () => {
    const valueChangeEvent = jest.fn();
    const config = {
      value: '',
      valueChange: {
        emit: valueChangeEvent,
      } as SafeAny,
    };
    await sut(config);
    const element = screen.getByTestId('input-area');
    const input = 'input';
    userEvent.type(element, input);
    expect(valueChangeEvent).toHaveBeenLastCalledWith(input);
  });
});
