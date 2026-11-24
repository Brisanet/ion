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

  it.each([
  { layout: 'split' as const, expectedCount: 2 },
  { layout: 'joined' as const, expectedCount: 1 },
  ])( 'should render $layout range input(s) with the selected calendar icon(s)', ({ layout, expectedCount }) => {
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
      expect(inputs).toHaveLength(expectedCount);
      for (const input of inputs) {
        expect(input.iconDirection()).toBe('left');
        expect(input.iconInput()).toBe('calendar');
      }

      const icons = fixture.debugElement.queryAll(
        By.css('ion-icon[data-testid="icon-left"]'),
      );
      expect(icons).toHaveLength(expectedCount);
      expect(
        icons.map((icon) => icon.componentInstance.size()),
      ).toEqual(Array(expectedCount).fill(24));
    },
  );

  it('should keep the default layout for split unless range mode is enabled', () => {
    const fixture = TestBed.createComponent(IonDatePickerInputComponent);
    fixture.componentRef.setInput('rangePicker', false);
    fixture.componentRef.setInput('layout', 'split');
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('[data-testid="container-input"]'),
    ).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('[data-testid="date-picker-input-split"]'),
    ).toBeNull();
  });

  it('should render joined layout with a single input and left icon when range mode is disabled', () => {
    const fixture = TestBed.createComponent(IonDatePickerInputComponent);
    fixture.componentRef.setInput('rangePicker', false);
    fixture.componentRef.setInput('layout', 'joined');
    fixture.componentRef.setInput('date', '01/11/2026');
    fixture.componentRef.setInput('icon', true);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('[data-testid="date-picker-input-joined"]'),
    ).toBeTruthy();

    const inputs = fixture.debugElement
      .queryAll(By.css('ion-input'))
      .map((el) => el.componentInstance as IonInputComponent);

    expect(inputs).toHaveLength(1);
    expect(inputs[0].value()).toBe('01/11/2026');
    expect(inputs[0].iconDirection()).toBe('left');
    expect(inputs[0].iconInput()).toBe('calendar');
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
