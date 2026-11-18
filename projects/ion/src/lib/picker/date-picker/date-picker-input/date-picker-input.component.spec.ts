import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { fireEvent, screen, within } from '@testing-library/angular';
import { IonDatePickerInputComponent } from './date-picker-input.component';
import { IonInputComponent } from '../../../input/input.component';

describe('IonDatePickerInputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonDatePickerInputComponent],
    }).compileComponents();
  });

  it('should render with default placeholder', () => {
    const fixture = TestBed.createComponent(IonDatePickerInputComponent);
    fixture.detectChanges();

    expect(screen.getByTestId('container-input')).toBeTruthy();
    expect(screen.getByTestId('input-element')).toHaveAttribute(
      'placeholder',
      'Selecione a data',
    );
  });

  it('should emit clearDate when clicking the clear button', () => {
    const fixture = TestBed.createComponent(IonDatePickerInputComponent);
    fixture.componentRef.setInput('date', '2023-01-28');

    const clearSpy = jest.fn();
    fixture.componentRef.instance.clearDate.subscribe(clearSpy);
    fixture.detectChanges();

    const clearButton = screen.getByTestId('input-button');
    fireEvent.click(within(clearButton).getByRole('button'));

    expect(clearSpy).toHaveBeenCalled();
  });

  it('should be disabled when disabled input is true', () => {
    const fixture = TestBed.createComponent(IonDatePickerInputComponent);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const inputElement = screen.getByTestId('input-div');
    expect(inputElement).toHaveClass('disabled');
  });

  it.each(['split', 'joined'] as const)(
    'should render both %s range inputs with the selected icons',
    (layout) => {
      const fixture = TestBed.createComponent(IonDatePickerInputComponent);
      fixture.componentRef.setInput('rangePicker', true);
      fixture.componentRef.setInput('layout', layout);
      fixture.componentRef.setInput('date', ['01/01/2025', '02/01/2025']);
      fixture.componentRef.setInput('icon', true);
      fixture.detectChanges();

      expect(
        fixture.nativeElement.querySelector(
          `[data-testid="date-picker-input-${layout}"]`,
        ),
      ).toBeTruthy();

      const inputs = fixture.debugElement
        .queryAll(By.css('ion-input'))
        .map((element) => element.componentInstance as IonInputComponent);
      expect(inputs).toHaveLength(2);
      for (const input of inputs) {
        expect(input.iconDirection()).toBe('left');
        expect(input.iconInput()).toBe('calendar');
      }

      const icons = fixture.debugElement.queryAll(
        By.css('ion-icon[data-testid="icon-left"]'),
      );
      expect(icons).toHaveLength(2);
      expect(
        icons.map((icon) => icon.componentInstance.size()),
      ).toEqual([24, 24]);
    },
  );

  it('should keep the default layout unless range mode is enabled', () => {
    const fixture = TestBed.createComponent(IonDatePickerInputComponent);
    fixture.componentRef.setInput('layout', 'joined');
    fixture.detectChanges();

    expect(screen.getByTestId('container-input')).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector(
        '[data-testid="date-picker-input-joined"]',
      ),
    ).toBeNull();
    expect(fixture.debugElement.queryAll(By.css('ion-input'))).toHaveLength(1);
  });

  it('should continue accepting the legacy single-date string value', () => {
    const fixture = TestBed.createComponent(IonDatePickerInputComponent);
    fixture.componentRef.setInput('date', '2023-01-28');
    fixture.detectChanges();

    expect(fixture.componentInstance.startDate()).toBe('2023-01-28');
    expect(fixture.componentInstance.endDate()).toBe('');
    expect(fixture.componentInstance.hasDate()).toBe(true);
  });

  it('should not emit clearDate when disabled', () => {
    const fixture = TestBed.createComponent(IonDatePickerInputComponent);
    fixture.componentRef.setInput('date', '2023-01-28');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const clearSpy = jest.fn();
    fixture.componentRef.instance.clearDate.subscribe(clearSpy);

    const clearButton = screen.queryByTestId('input-button');
    if (clearButton) {
      fireEvent.click(within(clearButton).getByRole('button'));
    }

    expect(clearSpy).not.toHaveBeenCalled();
  });
});
