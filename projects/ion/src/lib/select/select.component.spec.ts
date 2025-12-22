import { TestBed } from '@angular/core/testing';
import { render, screen, fireEvent } from '@testing-library/angular';
import { IonSelectComponent } from './select.component';
import { DropdownItem } from '../core/types/dropdown';

const options: DropdownItem[] = [
  { label: 'Apple', key: 'apple' },
  { label: 'Banana', key: 'banana' },
  { label: 'Grape', key: 'grape' },
];

describe('IonSelectComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonSelectComponent],
    }).compileComponents();
  });

  it('should render select with placeholder', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('placeholder', 'Select an option');
    fixture.detectChanges();
    expect(screen.getByText('Select an option')).toBeTruthy();
  });

  it('should open dropdown when clicked', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();
    const select = screen.getByTestId('ion-select');
    fireEvent.click(select);
    expect(screen.getByTestId('ion-dropdown')).toBeTruthy();
  });

  it('should select an option and close dropdown', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    const optionsCopy = options.map((opt) => ({ ...opt }));
    fixture.componentRef.setInput('options', optionsCopy);
    fixture.detectChanges();
    const select = screen.getByTestId('ion-select');
    fireEvent.click(select);

    const option = screen.getByText('Apple');
    fireEvent.click(option);

    // Simulate dropdown emitting the selected items
    fixture.componentInstance.handleSelect([optionsCopy[0]]);
    fixture.detectChanges();

    expect(screen.queryByTestId('ion-dropdown')).toBeFalsy();
    expect(screen.getByText('Apple')).toBeTruthy();
  });

  it('should select multiple options and not close dropdown', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    const optionsCopy = options.map((opt) => ({ ...opt }));
    fixture.componentRef.setInput('options', optionsCopy);
    fixture.componentRef.setInput('multiple', true);
    fixture.detectChanges();
    const select = screen.getByTestId('ion-select');
    fireEvent.click(select);

    fireEvent.click(screen.getByText('Apple'));
    fixture.componentInstance.handleSelect([optionsCopy[0]]);
    fixture.detectChanges();

    fireEvent.click(screen.getByText('Banana'));
    fixture.componentInstance.handleSelect([optionsCopy[0], optionsCopy[1]]);
    fixture.detectChanges();

    expect(screen.getByTestId('ion-dropdown')).toBeTruthy();
    expect(screen.getByText('Apple, Banana')).toBeTruthy();
  });

  it('should not open dropdown when disabled', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const select = screen.getByTestId('ion-select');
    fireEvent.click(select);
    expect(screen.queryByTestId('ion-dropdown')).toBeFalsy();
  });

  it('should close dropdown when clicking outside', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();
    const select = screen.getByTestId('ion-select');
    fireEvent.click(select);
    expect(screen.getByTestId('ion-dropdown')).toBeTruthy();

    fireEvent.click(document.body);
    fixture.detectChanges();
    expect(screen.queryByTestId('ion-dropdown')).toBeFalsy();
  });
});
