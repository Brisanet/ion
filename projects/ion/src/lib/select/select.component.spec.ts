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
    fixture.detectChanges();
    expect(screen.getByTestId('ion-dropdown')).toBeTruthy();
  });

  it('should select an option and close dropdown', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    const optionsCopy = options.map((opt) => ({ ...opt }));
    fixture.componentRef.setInput('options', optionsCopy);
    fixture.detectChanges();
    const select = screen.getByTestId('ion-select');
    fireEvent.click(select);
    fixture.detectChanges();

    const option = screen.getByText('Apple');
    fireEvent.click(option);
    fixture.detectChanges();

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
    fixture.detectChanges();

    fireEvent.click(screen.getByText('Apple'));
    fixture.detectChanges();
    fixture.componentInstance.handleSelect([optionsCopy[0]]);
    fixture.detectChanges();

    fireEvent.click(screen.getByText('Banana'));
    fixture.detectChanges();
    fixture.componentInstance.handleSelect([optionsCopy[0], optionsCopy[1]]);
    fixture.detectChanges();

    expect(screen.getByTestId('ion-dropdown')).toBeTruthy();
    expect(screen.getAllByText('Apple')).toHaveLength(2);
    expect(screen.getAllByText('Banana')).toHaveLength(2);
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
    fixture.detectChanges();
    expect(screen.getByTestId('ion-dropdown')).toBeTruthy();

    fireEvent.click(document.body);
    fixture.detectChanges();
    expect(screen.queryByTestId('ion-dropdown')).toBeFalsy();
  });

  it('should initialize with pre-selected options', async () => {
    const optionsWithSelection = [
      { label: 'Apple', key: 'apple', selected: true },
      { label: 'Banana', key: 'banana' },
    ];
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', optionsWithSelection);
    fixture.detectChanges();
    expect(screen.getByText('Apple')).toBeTruthy();
  });
  it('should initialize with value input (single key)', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('value', 'banana');
    fixture.detectChanges();
    expect(screen.getByText('Banana')).toBeTruthy();
  });

  it('should initialize with value input (array of keys)', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('multiple', true);
    fixture.componentRef.setInput('value', ['apple', 'grape']);
    fixture.detectChanges();
    expect(screen.getAllByTestId('ion-chip-label')).toHaveLength(2);
  });

  it('should initialize with value input and propValue', async () => {
    const optionsWithCustomValue = [
      { label: 'Apple', customId: 1 },
      { label: 'Banana', customId: 2 },
    ];
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', optionsWithCustomValue);
    fixture.componentRef.setInput('propValue', 'customId');
    fixture.componentRef.setInput('value', 2);
    fixture.detectChanges();
    expect(screen.getByText('Banana')).toBeTruthy();
  });

  it('should emit custom property value via valueChange when an option is selected', async () => {
    const optionsWithCustomValue = [
      { label: 'Apple', customId: 1 },
      { label: 'Banana', customId: 2 },
    ];
    const fixture = TestBed.createComponent(IonSelectComponent);
    const valueChangeSpy = jest.fn();
    fixture.componentInstance.valueChange.subscribe(valueChangeSpy);

    fixture.componentRef.setInput('options', optionsWithCustomValue);
    fixture.componentRef.setInput('propValue', 'customId');
    fixture.detectChanges();

    const select = screen.getByTestId('ion-select');
    fireEvent.click(select);
    fixture.detectChanges();

    const option = screen.getByText('Apple');
    fireEvent.click(option);

    fixture.componentInstance.handleSelect([optionsWithCustomValue[0]]);
    fixture.detectChanges();

    expect(valueChangeSpy).toHaveBeenCalledWith(1);
  });

  describe('returnFullObject', () => {
    it('should emit the full object via valueChange when returnFullObject is true (single)', async () => {
      const fixture = TestBed.createComponent(IonSelectComponent);
      const valueChangeSpy = jest.fn();
      fixture.componentInstance.valueChange.subscribe(valueChangeSpy);

      fixture.componentRef.setInput('options', options);
      fixture.componentRef.setInput('returnFullObject', true);
      fixture.detectChanges();

      fixture.componentInstance.handleSelect([options[0]]);
      fixture.detectChanges();

      expect(valueChangeSpy).toHaveBeenCalledWith(options[0]);
    });

    it('should emit an array of full objects via valueChange when returnFullObject is true (multiple)', async () => {
      const fixture = TestBed.createComponent(IonSelectComponent);
      const valueChangeSpy = jest.fn();
      fixture.componentInstance.valueChange.subscribe(valueChangeSpy);

      fixture.componentRef.setInput('options', options);
      fixture.componentRef.setInput('multiple', true);
      fixture.componentRef.setInput('returnFullObject', true);
      fixture.detectChanges();

      fixture.componentInstance.handleSelect([options[0], options[1]]);
      fixture.detectChanges();

      expect(valueChangeSpy).toHaveBeenCalledWith([options[0], options[1]]);
    });

    it('should emit an array of full objects via valueChange when a chip is removed and returnFullObject is true', async () => {
      const fixture = TestBed.createComponent(IonSelectComponent);
      const valueChangeSpy = jest.fn();
      fixture.componentInstance.valueChange.subscribe(valueChangeSpy);

      const optionsCopy = options.map((opt) => ({ ...opt }));
      fixture.componentRef.setInput('options', optionsCopy);
      fixture.componentRef.setInput('multiple', true);
      fixture.componentRef.setInput('returnFullObject', true);
      fixture.detectChanges();

      fixture.componentInstance.handleSelect([optionsCopy[0], optionsCopy[1]]);
      fixture.detectChanges();

      // Clear the first call from handleSelect
      valueChangeSpy.mockClear();

      fixture.componentInstance.handleChipEvents(optionsCopy[0]);
      fixture.detectChanges();

      expect(valueChangeSpy).toHaveBeenCalledWith([optionsCopy[1]]);
    });
  });
});
