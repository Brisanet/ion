import { TestBed } from '@angular/core/testing';
import { fireEvent, screen, within } from '@testing-library/angular';
import { IonDatePickerInputComponent } from './date-picker-input.component';

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
      'Selecione a data'
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
});

