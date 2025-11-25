import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { InputType, IonInputProps } from '../core/types/input';
import { IonSharedModule } from '../shared.module';
import { SafeAny } from './../utils/safe-any';
import { IonInputComponent } from './input.component';

const sut = async (customProps?: IonInputProps): Promise<void> => {
  await render(IonInputComponent, {
    componentProperties: customProps,
    excludeComponentDeclaration: true,
    imports: [CommonModule, FormsModule, IonSharedModule],
  });
};

describe('IonInputComponent', () => {
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
  it('should allow letters to be inputted', async () => {
    await sut();
    const inputValue = 'input';
    fireEvent.change(screen.getByTestId('input-element'), {
      target: { value: inputValue },
    });
    expect(screen.getByTestId('input-element')).toHaveValue(inputValue);
  });

  it.each(['text', 'password', 'number', 'email'])(
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

  it('should not render the input button as default', async () => {
    await sut();
    const button = screen.queryByTestId('input-button');
    expect(button).not.toBeInTheDocument();
  });

  it('should not render the input button if the button config is not informed', async () => {
    await sut({ inputButton: true });
    const button = screen.queryByTestId('input-button');
    expect(button).not.toBeInTheDocument();
  });

  it('should render button when informed', async () => {
    await sut({
      inputButton: true,
      inputButtonConfig: {
        iconType: 'pencil',
        type: 'primary',
      },
    });
    const button = screen.getByTestId('input-button');
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it('should render button with md size when size is not setted', async () => {
    await sut({
      inputButton: true,
      inputButtonConfig: {
        iconType: 'pencil',
        type: 'primary',
        id: 'Button',
      },
    });
    const buttonContainer = screen.getByTestId('input-button');
    expect(within(buttonContainer).getByTestId('btn-Button')).toHaveClass(
      'ion-btn-md'
    );
  });

  it('should emit an event when clicked input button', async () => {
    const clickEvent = jest.fn();
    await sut({
      inputButton: true,
      inputButtonConfig: {
        iconType: 'pencil',
        type: 'primary',
      },
      clickButton: {
        emit: clickEvent,
      } as SafeAny,
    });
    fireEvent.click(
      within(screen.getByTestId('input-button')).getByRole('button')
    );
    expect(clickEvent).toHaveBeenCalled();
  });

  it.each(['4', 4])(
    'should render input component with text "valu" when the typed "values" and maxLength = 4',
    async (maxLength) => {
      const exampleText = 'values';
      await sut({ maxLength });
      const element: HTMLInputElement = screen.getByTestId('input-element');
      userEvent.type(element, exampleText);
      expect(element.value).toBe(exampleText.substring(0, Number(maxLength)));
    }
  );

  it("should render input component without maxLength when don't sent this prop", async () => {
    const text = 'text for input element test';
    await sut({});
    const element: HTMLInputElement = screen.getByTestId('input-element');
    userEvent.type(element, text);
    expect(element.value).toBe(text);
  });

  it('should render input icon valid', async () => {
    await sut();
    expect(document.getElementById('icon-valid')).toBeTruthy();
  });

  it('should render input icon invalid', async () => {
    await sut();
    expect(document.getElementById('icon-invalid')).toBeTruthy();
  });

  describe('valueChange', () => {
    const mockFn = jest.fn();
    const value = 'input';
    const maxLength = 37;

    beforeEach(async () => {
      await sut({ valueChange: { emit: mockFn } as SafeAny, maxLength });
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

    it('should render value and max length on input when have maxLength attribute', async () => {
      userEvent.type(screen.getByTestId('input-element'), value);
      expect(
        screen.getByText(`${value.length}/${maxLength}`)
      ).toBeInTheDocument();
    });
  });

  describe('Clear Button events', () => {
    const mockFn = jest.fn();
    const value = 'input-with-clear-button';
    let input: HTMLInputElement;

    beforeEach(async () => {
      await sut({
        valueChange: { emit: mockFn } as SafeAny,
        clearButton: true,
      });
      input = screen.getByTestId('input-element');
    });

    afterEach(async () => {
      mockFn.mockClear();
    });

    it('should render the clear button when informed and input have value', async () => {
      userEvent.type(input, value);
      fireEvent.blur(input);
      const clearButton = screen.getByTestId('clear-button');
      expect(clearButton).toBeInTheDocument();
    });

    it('should change value to empty when clear button press', async () => {
      userEvent.type(input, value);
      fireEvent.click(screen.getByTestId('clear-button'));
      expect(input).toHaveValue('');
    });

    it('should emit valueChange when clear button press', async () => {
      userEvent.type(input, value);
      fireEvent.click(screen.getByTestId('clear-button'));
      expect(mockFn).toHaveBeenCalled();
    });

    it('should emit empty value when clear button press', async () => {
      userEvent.type(input, value);
      fireEvent.click(screen.getByTestId('clear-button'));
      expect(mockFn).toHaveBeenLastCalledWith('');
    });
  });
});
