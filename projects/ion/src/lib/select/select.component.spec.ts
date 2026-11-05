import { TestBed } from '@angular/core/testing';
import { render, screen, fireEvent } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
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

  it('should display the selected single value as text', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('value', 'apple');
    fixture.detectChanges();

    expect(screen.getByText('Apple')).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('.selected-value')
    ).toBeFalsy();
  });

  it('should support the multi type and large size inputs', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('type', 'multi');
    fixture.componentRef.setInput('size', 'large');
    fixture.componentRef.setInput('value', ['apple']);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ion-select').classList).toContain(
      'size-large'
    );
    expect(
      fixture.nativeElement.querySelector('[data-testid="ion-chip-label"]')
        .textContent
    ).toContain('Apple');
  });

  it('should render label and supporting text for error and success states', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('label', 'Fruit');
    fixture.componentRef.setInput('supportingText', 'Choose one');
    fixture.componentRef.setInput('status', 'error');
    fixture.detectChanges();

    expect(screen.getByText('Fruit')).toBeTruthy();
    expect(screen.getByText('Choose one').classList).toContain('error-text');

    fixture.componentRef.setInput('status', 'success');
    fixture.detectChanges();
    expect(screen.getByText('Choose one').classList).toContain('success-text');
  });

  it('should apply an optional theme to the select and its overlay only', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('theme', 'orange-dark');
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector(
      '.ion-select-container'
    ) as HTMLElement;
    expect(
      container.style.getPropertyValue('--ion-select-background-color')
    ).toBe('#26282d');

    fireEvent.click(screen.getByTestId('ion-select'));
    fixture.detectChanges();

    const dropdown = screen.getByTestId('ion-dropdown') as HTMLElement;
    expect(
      dropdown.style.getPropertyValue('--ion-select-menu-background-color')
    ).toBe('#26282d');
  });

  it('should expose the empty state when the open menu has no options', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.detectChanges();
    fireEvent.click(screen.getByTestId('ion-select'));
    fixture.detectChanges();

    expect(screen.getByTestId('ion-dropdown').classList).toContain('open-empty');
    expect(screen.getByTestId('ion-no-data')).toBeTruthy();
  });

  it('should remove a multi selection and emit the remaining values', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    const valueChangeSpy = jest.fn();
    fixture.componentInstance.valueChange.subscribe(valueChangeSpy);
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('type', 'multi');
    fixture.componentRef.setInput('value', ['apple', 'banana']);
    fixture.detectChanges();

    fireEvent.click(fixture.nativeElement.querySelector('.tag-remove'));
    fixture.detectChanges();

    expect(valueChangeSpy).toHaveBeenLastCalledWith(['banana']);
    expect(
      fixture.nativeElement.querySelectorAll(
        '[data-testid="ion-chip-label"]'
      )
    ).toHaveLength(1);
  });

  it('should remove a multi selection when the tag button is activated by keyboard', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('type', 'multi');
    fixture.componentRef.setInput('value', ['apple', 'banana']);
    fixture.detectChanges();

    const removeButton = fixture.nativeElement.querySelector(
      '.tag-remove'
    ) as HTMLButtonElement;
    removeButton.focus();
    await userEvent.keyboard('{Enter}');
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelectorAll(
        '[data-testid="ion-chip-label"]'
      )
    ).toHaveLength(1);
  });

  it('should not remove the last required multi selection', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    const valueChangeSpy = jest.fn();
    fixture.componentInstance.valueChange.subscribe(valueChangeSpy);
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('type', 'multi');
    fixture.componentRef.setInput('required', true);
    fixture.componentRef.setInput('value', ['apple']);
    fixture.detectChanges();

    fireEvent.click(fixture.nativeElement.querySelector('.tag-remove'));
    fixture.detectChanges();

    expect(valueChangeSpy).not.toHaveBeenCalled();
    expect(
      fixture.nativeElement.querySelectorAll(
        '[data-testid="ion-chip-label"]'
      )
    ).toHaveLength(1);
  });

  it('should not deselect a required single value by selecting it again', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    const valueChangeSpy = jest.fn();
    fixture.componentInstance.valueChange.subscribe(valueChangeSpy);
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('required', true);
    fixture.componentRef.setInput('value', 'apple');
    fixture.detectChanges();

    fixture.componentInstance.selectOption(options[0]);

    expect(valueChangeSpy).not.toHaveBeenCalled();
    expect(fixture.componentInstance.dropdownSelectedItems()).toHaveLength(1);
  });

  it('should not mutate options received from the consumer', async () => {
    const optionsCopy = options.map((option) => ({ ...option }));
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', optionsCopy);
    fixture.detectChanges();

    fixture.componentInstance.handleSelect([optionsCopy[0]]);

    expect(optionsCopy[0].selected).toBeUndefined();
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

  it('should allow tab navigation through enabled dropdown options', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', [
      options[0],
      { ...options[1], disabled: true },
      options[2],
    ]);
    fixture.detectChanges();

    const trigger = screen.getByTestId('ion-select');
    trigger.focus();
    fireEvent.click(trigger);
    fixture.detectChanges();

    const optionElements = screen.getAllByRole('option');
    expect(optionElements[0].getAttribute('tabindex')).toBe('0');
    expect(optionElements[1].getAttribute('tabindex')).toBe('-1');
    expect(optionElements[2].getAttribute('tabindex')).toBe('0');

    await userEvent.tab();
    expect(document.activeElement).toBe(optionElements[0]);
    await userEvent.tab();
    expect(document.activeElement).toBe(optionElements[2]);
  });

  it('should select a focused option with Enter', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    const valueChangeSpy = jest.fn();
    fixture.componentInstance.valueChange.subscribe(valueChangeSpy);
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();
    fireEvent.click(screen.getByTestId('ion-select'));
    fixture.detectChanges();

    const option = screen.getByRole('option', { name: 'Apple' });
    option.focus();
    await userEvent.keyboard('{Enter}');
    fixture.detectChanges();

    expect(valueChangeSpy).toHaveBeenCalledWith('apple');
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

    const selectedValue =
      fixture.nativeElement.querySelector('.selected-value');
    expect(selectedValue.querySelectorAll('[data-testid="ion-chip-label"]')).toHaveLength(2);
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

    const selectedValue =
      fixture.nativeElement.querySelector('.selected-value');
    expect(
      selectedValue.querySelectorAll('[data-testid="ion-chip-label"]')
    ).toHaveLength(2);
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

  describe('overflow counter', () => {
    it('should render +N counter when visibleCount is less than selected items', async () => {
      const fixture = TestBed.createComponent(IonSelectComponent);
      fixture.componentRef.setInput('options', options);
      fixture.componentRef.setInput('multiple', true);
      fixture.componentRef.setInput('value', ['apple', 'banana', 'grape']);
      fixture.detectChanges();

      fixture.componentInstance.visibleCount.set(1);
      fixture.detectChanges();

      expect(screen.getByTestId('select-overflow-count').textContent).toBe(
        '+2'
      );

      const selectedValue =
        fixture.nativeElement.querySelector('.selected-value');
      expect(
        selectedValue.querySelectorAll('[data-testid="ion-chip-label"]')
      ).toHaveLength(1);
    });

    it('should not render overflow counter in single select mode', async () => {
      const fixture = TestBed.createComponent(IonSelectComponent);
      fixture.componentRef.setInput('options', options);
      fixture.componentRef.setInput('value', 'apple');
      fixture.detectChanges();

      fixture.componentInstance.visibleCount.set(0);
      fixture.detectChanges();

      expect(screen.queryByTestId('select-overflow-count')).toBeFalsy();
    });

    it('should update overflow counter when a chip is removed', async () => {
      const fixture = TestBed.createComponent(IonSelectComponent);
      const optionsCopy = options.map((opt) => ({ ...opt }));
      fixture.componentRef.setInput('options', optionsCopy);
      fixture.componentRef.setInput('multiple', true);
      fixture.componentRef.setInput('value', ['apple', 'banana', 'grape']);
      fixture.detectChanges();

      fixture.componentInstance.visibleCount.set(1);
      fixture.detectChanges();
      expect(screen.getByTestId('select-overflow-count').textContent).toBe(
        '+2'
      );

      fixture.componentInstance.handleChipEvents(optionsCopy[0]);
      fixture.componentInstance.visibleCount.set(1);
      fixture.detectChanges();

      expect(screen.getByTestId('select-overflow-count').textContent).toBe(
        '+1'
      );
    });
  });
});
