import { SafeAny } from './../utils/safe-any';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from './../icon/icon.component';
import { render, screen, fireEvent } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { InputComponent, InputType, IonInputProps } from './input.component';
import { FormsModule } from '@angular/forms';

const sut = async (customProps?: IonInputProps): Promise<void> => {
  await render(InputComponent, {
    componentProperties: customProps,
    imports: [CommonModule, FormsModule],
    declarations: [IonIconComponent],
  });
};

describe('InputComponent', () => {
  it('Should allow letters to be inputted', async () => {
    await sut();
    const inputValue = 'input';
    fireEvent.change(screen.getByTestId('input-element'), {
      target: { value: inputValue },
    });
    expect(screen.getByTestId('input-element')).toHaveValue(inputValue);
  });

  it('should render input with an empty placeholder if none is passed', async () => {
    await sut();
    const input = screen.getByTestId('input-element');
    expect(input).not.toHaveAttribute('placeholder');
  });

  it('should render input with a given placeholder', async () => {
    const placeholder = 'Search';
    await sut({ placeholder });
    const input = screen.getByTestId('input-element');
    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  it.each(['text', 'password'])(
    'should render type %s on input component',
    async (type: InputType) => {
      await sut({ inputType: type });
      expect(screen.getByTestId('input-element')).toHaveAttribute('type', type);
    }
  );

  it('should render input component disabled', async () => {
    await sut({ disabled: true });
    const element = screen.getByTestId('input-element');
    expect(element).toBeDisabled();
  });

  it('should render input icon left', async () => {
    const icon = 'trash';
    await sut({ iconDirection: 'left', iconInput: icon });
    expect(document.getElementById('ion-icon-' + icon)).toBeTruthy();
  });

  it('should render input icon right', async () => {
    const icon = 'pencil';
    await sut({ iconDirection: 'right', iconInput: icon });
    expect(document.getElementById('ion-icon-' + icon)).toBeTruthy();
  });

  it('should render button when informed', async () => {
    await sut({ inputButton: true });
    const button = screen.getByTestId('input-button');
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it('should render input icon button when informed', async () => {
    await sut({ inputIconButton: true });
    const button = screen.getByTestId('inputIcon-button');
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it('should emit an event when clicked input button', async () => {
    const clickEvent = jest.fn();
    await sut({
      inputButton: true,
      clickButton: {
        emit: clickEvent,
      } as SafeAny,
    });
    fireEvent.click(screen.getByTestId('input-button'));
    expect(clickEvent).toHaveBeenCalled();
  });

  it('should emit an event when clicked input icon button', async () => {
    const clickEvent = jest.fn();
    await sut({
      inputIconButton: true,
      clickButton: {
        emit: clickEvent,
      } as SafeAny,
    });
    fireEvent.click(screen.getByTestId('inputIcon-button'));
    expect(clickEvent).toHaveBeenCalled();
  });

  it.skip('should render input icon valid', async () => {
    await sut();
    expect(document.getElementById('icon-valid')).toBeTruthy();
  });

  it.skip('should render input icon invalid', async () => {
    await sut();
    expect(document.getElementById('icon-invalid')).toBeTruthy();
  });

  describe('valueChange', () => {
    const mockFn = jest.fn();
    const value = 'input';

    beforeEach(async () => {
      await sut({ valueChange: { emit: mockFn } as SafeAny });
    });

    afterEach(async () => {
      mockFn.mockClear();
    });

    it('should change value when something is typed on input', async () => {
      userEvent.type(screen.getByTestId('input-element'), value);
      expect(screen.getByTestId('input-element')).toHaveValue(value);
    });

    it('should emit valueChange everytime a key is typed on input', async () => {
      userEvent.type(screen.getByTestId('input-element'), value);
      expect(mockFn).toHaveBeenCalledTimes(value.length);
    });

    it('should emit the value on the last emit', async () => {
      userEvent.type(screen.getByTestId('input-element'), value);
      expect(mockFn).toHaveBeenLastCalledWith(value);
    });
  });
});
