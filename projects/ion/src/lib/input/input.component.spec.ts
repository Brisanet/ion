import { TestBed } from '@angular/core/testing';
import { fireEvent, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { InputType } from '../core/types/input';
import { IonInputComponent } from './input.component';

describe('IonInputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonInputComponent],
    }).compileComponents();
  });

  it('should render input with an empty placeholder if none is passed', () => {
    const fixture = TestBed.createComponent(IonInputComponent);
    fixture.detectChanges();
    
    const input = screen.getByTestId('input-element');
    expect(input).not.toHaveAttribute('placeholder');
  });

  it('should render input with a given placeholder', () => {
    const placeholder = 'Search';
    const fixture = TestBed.createComponent(IonInputComponent);
    fixture.componentRef.setInput('placeholder', placeholder);
    fixture.detectChanges();
    
    const input = screen.getByTestId('input-element');
    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  it('should allow letters to be inputted', () => {
    const fixture = TestBed.createComponent(IonInputComponent);
    fixture.detectChanges();
    
    const inputValue = 'input';
    fireEvent.change(screen.getByTestId('input-element'), {
      target: { value: inputValue },
    });
    expect(screen.getByTestId('input-element')).toHaveValue(inputValue);
  });

  it.each(['text', 'password', 'number', 'email'] as InputType[])(
    'should render type %s on input component',
    (type) => {
      const fixture = TestBed.createComponent(IonInputComponent);
      fixture.componentRef.setInput('inputType', type);
      fixture.detectChanges();
      
      expect(screen.getByTestId('input-element')).toHaveAttribute('type', type);
    }
  );

  it('should render input component disabled', () => {
    const fixture = TestBed.createComponent(IonInputComponent);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    
    const element = screen.getByTestId('input-element');
    expect(element).toBeDisabled();
  });

  it('should render input icon left', () => {
    const icon = 'trash';
    const fixture = TestBed.createComponent(IonInputComponent);
    fixture.componentRef.setInput('iconDirection', 'left');
    fixture.componentRef.setInput('iconInput', icon);
    fixture.detectChanges();
    
    expect(document.getElementById('ion-icon-' + icon)).toBeTruthy();
  });

  it('should render input icon right', () => {
    const icon = 'pencil';
    const fixture = TestBed.createComponent(IonInputComponent);
    fixture.componentRef.setInput('iconDirection', 'right');
    fixture.componentRef.setInput('iconInput', icon);
    fixture.detectChanges();
    
    expect(document.getElementById('ion-icon-' + icon)).toBeTruthy();
  });

  it('should not render the input button as default', () => {
    const fixture = TestBed.createComponent(IonInputComponent);
    fixture.detectChanges();
    
    const button = screen.queryByTestId('input-button');
    expect(button).not.toBeInTheDocument();
  });

  it('should not render the input button if the button config is not informed', () => {
    const fixture = TestBed.createComponent(IonInputComponent);
    fixture.componentRef.setInput('inputButton', true);
    fixture.detectChanges();
    
    const button = screen.queryByTestId('input-button');
    expect(button).not.toBeInTheDocument();
  });

  it('should render button when informed', () => {
    const fixture = TestBed.createComponent(IonInputComponent);
    fixture.componentRef.setInput('inputButton', true);
    fixture.componentRef.setInput('inputButtonConfig', {
      iconType: 'pencil',
      type: 'primary',
    });
    fixture.detectChanges();
    
    const button = screen.getByTestId('input-button');
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it('should render button with md size when size is not setted', () => {
    const fixture = TestBed.createComponent(IonInputComponent);
    fixture.componentRef.setInput('inputButton', true);
    fixture.componentRef.setInput('inputButtonConfig', {
      iconType: 'pencil',
      type: 'primary',
      id: 'Button',
    });
    fixture.detectChanges();
    
    const buttonContainer = screen.getByTestId('input-button');
    expect(within(buttonContainer).getByTestId('btn-Button')).toHaveClass(
      'ion-btn-md'
    );
  });

  it('should emit an event when clicked input button', () => {
    const clickEvent = jest.fn();
    const fixture = TestBed.createComponent(IonInputComponent);
    fixture.componentRef.setInput('inputButton', true);
    fixture.componentRef.setInput('inputButtonConfig', {
      iconType: 'pencil',
      type: 'primary',
    });
    fixture.componentInstance.clickButton.subscribe(clickEvent);
    fixture.detectChanges();
    
    fireEvent.click(
      within(screen.getByTestId('input-button')).getByRole('button')
    );
    expect(clickEvent).toHaveBeenCalled();
  });

  it.each(['4', 4])(
    'should render input component with text "valu" when the typed "values" and maxLength = 4',
    (maxLength) => {
      const exampleText = 'values';
      const fixture = TestBed.createComponent(IonInputComponent);
      fixture.componentRef.setInput('maxLength', maxLength);
      fixture.detectChanges();
      
      const element: HTMLInputElement = screen.getByTestId('input-element');
      userEvent.type(element, exampleText);
      expect(element.value).toBe(exampleText.substring(0, Number(maxLength)));
    }
  );

  it("should render input component without maxLength when don't sent this prop", () => {
    const text = 'text for input element test';
    const fixture = TestBed.createComponent(IonInputComponent);
    fixture.detectChanges();
    
    const element: HTMLInputElement = screen.getByTestId('input-element');
    userEvent.type(element, text);
    expect(element.value).toBe(text);
  });

  it('should render input icon valid', () => {
    const fixture = TestBed.createComponent(IonInputComponent);
    fixture.componentRef.setInput('valid', true);
    fixture.detectChanges();
    
    expect(screen.getByTestId('icon-valid')).toBeInTheDocument();
  });

  it('should render input icon invalid', () => {
    const fixture = TestBed.createComponent(IonInputComponent);
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    
    expect(screen.getByTestId('icon-invalid')).toBeInTheDocument();
  });

  describe('valueChange', () => {
    const mockFn = jest.fn();
    const value = 'input';
    const maxLength = 37;
    let fixture: any;

    beforeEach(() => {
      fixture = TestBed.createComponent(IonInputComponent);
      fixture.componentRef.setInput('maxLength', maxLength);
      fixture.componentInstance.valueChange.subscribe(mockFn);
      fixture.detectChanges();
    });

    afterEach(() => {
      mockFn.mockClear();
    });

    it('should change value when something is typed on input', () => {
      userEvent.type(screen.getByTestId('input-element'), value);
      expect(screen.getByTestId('input-element')).toHaveValue(value);
    });

    it('should emit valueChange everytime a key is typed on input', () => {
      userEvent.type(screen.getByTestId('input-element'), value);
      expect(mockFn).toHaveBeenCalledTimes(value.length);
    });

    it('should emit the value on the last emit', () => {
      userEvent.type(screen.getByTestId('input-element'), value);
      expect(mockFn).toHaveBeenLastCalledWith(value);
    });

    it('should render value and max length on input when have maxLength attribute', () => {
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
    let fixture: any;

    beforeEach(() => {
      fixture = TestBed.createComponent(IonInputComponent);
      fixture.componentRef.setInput('clearButton', true);
      fixture.componentInstance.valueChange.subscribe(mockFn);
      fixture.detectChanges();
      input = screen.getByTestId('input-element');
    });

    afterEach(() => {
      mockFn.mockClear();
    });

    it('should render the clear button when informed and input have value', () => {
      userEvent.type(input, value);
      fireEvent.blur(input);
      const clearButton = screen.getByTestId('clear-button');
      expect(clearButton).toBeInTheDocument();
    });

    it('should change value to empty when clear button press', () => {
      userEvent.type(input, value);
      fireEvent.click(screen.getByTestId('clear-button'));
      expect(input).toHaveValue('');
    });

    it('should emit valueChange when clear button press', () => {
      userEvent.type(input, value);
      fireEvent.click(screen.getByTestId('clear-button'));
      expect(mockFn).toHaveBeenCalled();
    });

    it('should emit empty value when clear button press', () => {
      userEvent.type(input, value);
      fireEvent.click(screen.getByTestId('clear-button'));
      expect(mockFn).toHaveBeenLastCalledWith('');
    });
  });
});
