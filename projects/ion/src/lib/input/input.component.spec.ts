import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IonInputComponent } from './input.component';
import { InputType } from '../core/types/input';

describe('IonInputComponent', () => {
  let component: IonInputComponent;
  let fixture: ComponentFixture<IonInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonInputComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(IonInputComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input with an empty placeholder if none is passed', () => {
    const input = fixture.nativeElement.querySelector('[data-testid="input-element"]');
    expect(input.hasAttribute('placeholder')).toBe(false);
  });

  it('should render input with a given placeholder', async () => {
    const placeholder = 'Search';
    fixture.componentRef.setInput('placeholder', placeholder);
    await fixture.whenStable();
    const input = fixture.nativeElement.querySelector('[data-testid="input-element"]');
    expect(input.getAttribute('placeholder')).toBe(placeholder);
  });

  it('should allow letters to be inputted', fakeAsync(() => {
    const inputValue = 'input';
    const input = fixture.nativeElement.querySelector('[data-testid="input-element"]');
    
    input.value = inputValue;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    tick();
    
    expect(input.value).toBe(inputValue);
    expect(component.value()).toBe(inputValue);
  }));

  const inputTypes: InputType[] = ['text', 'password', 'number', 'email'];
  inputTypes.forEach((type) => {
    it(`should render type ${type} on input component`, async () => {
      fixture.componentRef.setInput('inputType', type);
      await fixture.whenStable();
      const input = fixture.nativeElement.querySelector('[data-testid="input-element"]');
      expect(input.getAttribute('type')).toBe(type);
    });
  });

  it('should render input component disabled', async () => {
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    const element = fixture.nativeElement.querySelector('[data-testid="input-element"]');
    expect(element.disabled).toBe(true);
  });

  it('should render input icon left', async () => {
    const icon = 'trash';
    fixture.componentRef.setInput('iconDirection', 'left');
    fixture.componentRef.setInput('iconInput', icon);
    await fixture.whenStable();
    const iconElement = document.getElementById('ion-icon-' + icon);
    expect(iconElement).toBeTruthy();
  });

  it('should render input icon right', async () => {
    const icon = 'pencil';
    fixture.componentRef.setInput('iconDirection', 'right');
    fixture.componentRef.setInput('iconInput', icon);
    await fixture.whenStable();
    const iconElement = document.getElementById('ion-icon-' + icon);
    expect(iconElement).toBeTruthy();
  });

  it('should not render the input button as default', () => {
    const button = fixture.nativeElement.querySelector('[data-testid="input-button"]');
    expect(button).toBeFalsy();
  });

  it('should not render the input button if the button config is not informed', async () => {
    fixture.componentRef.setInput('inputButton', true);
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector('[data-testid="input-button"]');
    expect(button).toBeFalsy();
  });

  it('should render button when informed', async () => {
    fixture.componentRef.setInput('inputButton', true);
    fixture.componentRef.setInput('inputButtonConfig', {
      iconType: 'pencil',
      type: 'primary',
    });
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector('[data-testid="input-button"]');
    expect(button).toBeTruthy();
  });

  it('should render button with md size when size is not setted', async () => {
    fixture.componentRef.setInput('inputButton', true);
    fixture.componentRef.setInput('inputButtonConfig', {
      iconType: 'pencil',
      type: 'primary',
      id: 'Button',
    });
    await fixture.whenStable();
    const buttonContainer = fixture.nativeElement.querySelector('[data-testid="input-button"]');
    const button = buttonContainer.querySelector('[data-testid="btn-Button"]');
    expect(button.classList.contains('ion-btn-md')).toBe(true);
  });

  it('should emit an event when clicked input button', async () => {
    const clickSpy = jest.spyOn(component.clickButton, 'emit');
    fixture.componentRef.setInput('inputButton', true);
    fixture.componentRef.setInput('inputButtonConfig', {
      iconType: 'pencil',
      type: 'primary',
    });
    await fixture.whenStable();
    
    const buttonContainer = fixture.nativeElement.querySelector('[data-testid="input-button"]');
    const button = buttonContainer.querySelector('button');
    button.click();
    
    expect(clickSpy).toHaveBeenCalled();
  });

  it.skip('should render input icon valid', async () => {
    fixture.componentRef.setInput('valid', true);
    await fixture.whenStable();
    const iconValid = document.getElementById('icon-valid');
    expect(iconValid).toBeTruthy();
  });

  it.skip('should render input icon invalid', async () => {
    fixture.componentRef.setInput('invalid', true);
    await fixture.whenStable();
    const iconInvalid = document.getElementById('icon-invalid');
    expect(iconInvalid).toBeTruthy();
  });

  describe('valueChange', () => {
    const mockFn = jest.fn();
    const value = 'input';
    const maxLength = 37;

    beforeEach(async () => {
      component.valueChange.subscribe(mockFn);
      fixture.componentRef.setInput('maxLength', maxLength);
      await fixture.whenStable();
    });

    afterEach(() => {
      mockFn.mockClear();
    });

    it('should change value when something is typed on input', fakeAsync(() => {
      const spy = jest.spyOn(component, 'onModelChange');
      const input = fixture.nativeElement.querySelector('[data-testid="input-element"]');
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();
      tick();
      
      expect(spy).toHaveBeenCalledWith(value);
      expect(input.value).toBe(value);
      expect(component.value()).toBe(value);
    }));

    it('should render value and max length on input when have maxLength attribute', async () => {
      fixture.componentRef.setInput('value', value);
      await fixture.whenStable();
      
      const counter = fixture.nativeElement.querySelector('.text-counter');
      expect(counter.textContent.trim()).toBe(`${value.length}/${maxLength}`);
    });
  });

  describe('Clear Button events', () => {
    const mockFn = jest.fn();
    const value = 'input-with-clear-button';

    beforeEach(async () => {
      component.valueChange.subscribe(mockFn);
      fixture.componentRef.setInput('clearButton', true);
      await fixture.whenStable();
    });

    afterEach(() => {
      mockFn.mockClear();
    });

    it('should render the clear button when informed and input have value', async () => {
      fixture.componentRef.setInput('value', value);
      await fixture.whenStable();
      
      const clearButton = fixture.nativeElement.querySelector('[data-testid="clear-button"]');
      expect(clearButton).toBeTruthy();
    });

    it('should change value to empty when clear button press', fakeAsync(() => {
      fixture.componentRef.setInput('value', value);
      fixture.detectChanges();
      tick();
      
      const clearButton = fixture.nativeElement.querySelector('[data-testid="clear-button"]');
      clearButton.click();
      fixture.detectChanges();
      tick();
      
      expect(component.value()).toBe('');
    }));

    it('should emit valueChange when clear button press', fakeAsync(() => {
      fixture.componentRef.setInput('value', value);
      fixture.detectChanges();
      tick();
      
      const clearButton = fixture.nativeElement.querySelector('[data-testid="clear-button"]');
      clearButton.click();
      fixture.detectChanges();
      tick();
      
      expect(mockFn).toHaveBeenCalled();
    }));

    it('should emit empty value when clear button press', fakeAsync(() => {
      fixture.componentRef.setInput('value', value);
      fixture.detectChanges();
      tick();
      
      const clearButton = fixture.nativeElement.querySelector('[data-testid="clear-button"]');
      clearButton.click();
      fixture.detectChanges();
      tick();
      
      expect(mockFn).toHaveBeenCalledWith('');
    }));
  });
});
