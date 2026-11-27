import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { screen, fireEvent } from '@testing-library/angular';
import { IonSelectComponent } from './select.component';
import { DropdownItem } from '../core/types/dropdown';

const options: DropdownItem[] = [
  { label: 'Apple', key: 'apple' },
  { label: 'Banana', key: 'banana' },
  { label: 'Grape', key: 'grape' },
];

@Component({
  standalone: true,
  imports: [IonSelectComponent],
  template: `
    <ion-select [options]="items">
      <span ionSelectLeading data-testid="leading-icon">L</span>
      <button
        type="button"
        ionSelectAction
        data-testid="action-btn"
        (click)="actionClicked = true"
      >
        Action
      </button>
    </ion-select>
  `,
})
class TestHostSlotsComponent {
  items = options;
  actionClicked = false;
}

describe('IonSelectComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonSelectComponent, TestHostSlotsComponent],
    }).compileComponents();
  });

  it('should render select with placeholder', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('placeholder', 'Select an option');
    fixture.detectChanges();
    expect(screen.getByText('Select an option')).toBeTruthy();
  });

  it('should open dropdown when clicked without mutating consumer options', async () => {
    const optionsCopy = options.map((opt) => ({ ...opt }));
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', optionsCopy);
    fixture.detectChanges();

    fireEvent.click(screen.getByTestId('ion-select'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(screen.getByTestId('ion-dropdown')).toBeTruthy();
    expect(screen.getByRole('listbox').id).toBe(
      fixture.componentInstance.listboxId
    );
    expect(optionsCopy[0].selected).toBeUndefined();
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
    expect(
      selectedValue.querySelectorAll('[data-testid="ion-chip-label"]')
    ).toHaveLength(2);
  });

  it('should not open dropdown when disabled and close if disabled becomes true', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();

    const select = screen.getByTestId('ion-select');
    fireEvent.click(select);
    fixture.detectChanges();
    expect(screen.getByTestId('ion-dropdown')).toBeTruthy();

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(screen.queryByTestId('ion-dropdown')).toBeFalsy();

    fireEvent.click(select);
    fixture.detectChanges();
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

  describe('new inputs, slots, and accessibility', () => {
    it('should support single/multiple modes and size inputs', () => {
      const fixture = TestBed.createComponent(IonSelectComponent);
      fixture.componentRef.setInput('options', options);
      fixture.componentRef.setInput('multiple', true);
      fixture.componentRef.setInput('size', 'large');
      fixture.componentRef.setInput('value', ['apple']);
      fixture.detectChanges();

      expect(
        fixture.nativeElement.querySelector('.ion-select').classList
      ).toContain('size-large');
      expect(
        fixture.nativeElement.querySelector('[data-testid="ion-chip-label"]')
          .textContent
      ).toContain('Apple');

      fixture.componentRef.setInput('multiple', false);
      fixture.componentRef.setInput('value', 'apple');
      fixture.detectChanges();

      expect(fixture.componentInstance.multiple()).toBe(false);
      expect(
        fixture.nativeElement.querySelector('.selected-text')?.textContent
      ).toContain('Apple');
    });

    it('should render label, supportingText, and invalid/valid validation classes', () => {
      const fixture = TestBed.createComponent(IonSelectComponent);
      fixture.componentRef.setInput('label', 'Fruit');
      fixture.componentRef.setInput('supportingText', 'Choose one');
      fixture.componentRef.setInput('invalid', true);
      fixture.detectChanges();

      const trigger = screen.getByTestId('ion-select');
      expect(screen.getByText('Fruit')).toBeTruthy();
      expect(screen.getByText('Choose one').classList).toContain('error-text');
      expect(trigger.classList).toContain('invalid');

      fixture.componentRef.setInput('invalid', false);
      fixture.componentRef.setInput('valid', true);
      fixture.detectChanges();
      expect(screen.getByText('Choose one').classList).toContain(
        'success-text'
      );
      expect(trigger.classList).toContain('success');

      fixture.componentRef.setInput('invalid', true);
      fixture.detectChanges();
      expect(trigger.classList).toContain('invalid');
      expect(trigger.classList).not.toContain('success');
    });

    it('should enforce required constraint on single and multi selections and support clearButton', () => {
      const fixture = TestBed.createComponent(IonSelectComponent);
      const valueChangeSpy = jest.fn();
      fixture.componentInstance.valueChange.subscribe(valueChangeSpy);

      fixture.componentRef.setInput('options', options);
      fixture.componentRef.setInput('required', true);
      fixture.componentRef.setInput('value', 'apple');
      fixture.detectChanges();

      fixture.componentInstance.selectOption(options[0]);
      expect(valueChangeSpy).not.toHaveBeenCalled();

      fixture.componentRef.setInput('multiple', true);
      fixture.componentRef.setInput('value', ['apple']);
      fixture.detectChanges();

      fixture.componentInstance.handleChipEvents(options[0]);
      expect(valueChangeSpy).not.toHaveBeenCalled();

      fixture.componentRef.setInput('required', false);
      fixture.detectChanges();
      fixture.componentInstance.handleClearButton();
      expect(valueChangeSpy).toHaveBeenCalledWith([]);
    });

    it('should navigate enabled options via keyboard combobox pattern and announce status', async () => {
      const fixture = TestBed.createComponent(IonSelectComponent);
      const valueChangeSpy = jest.fn();
      fixture.componentInstance.valueChange.subscribe(valueChangeSpy);
      fixture.componentRef.setInput('options', [
        options[0],
        { ...options[1], disabled: true },
        options[2],
      ]);
      fixture.detectChanges();

      const trigger = screen.getByTestId('ion-select');
      trigger.focus();
      fireEvent.keyDown(trigger, { key: 'ArrowDown' });
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(screen.getByRole('status').textContent).toContain(
        '3 opções disponíveis.'
      );
      expect(trigger.getAttribute('aria-activedescendant')).toBe(
        `${fixture.componentInstance.listboxId}-option-0`
      );

      // Skips disabled index 1 -> moves to index 2 (Grape)
      fireEvent.keyDown(trigger, { key: 'ArrowDown' });
      fixture.detectChanges();
      expect(trigger.getAttribute('aria-activedescendant')).toBe(
        `${fixture.componentInstance.listboxId}-option-2`
      );

      fireEvent.keyDown(trigger, { key: 'Enter' });
      fixture.detectChanges();
      expect(valueChangeSpy).toHaveBeenCalledWith('grape');
      expect(screen.queryByTestId('ion-dropdown')).toBeFalsy();
    });

    it('should render projected slots without toggling dropdown on action click', () => {
      const fixture = TestBed.createComponent(TestHostSlotsComponent);
      fixture.detectChanges();

      expect(screen.getByTestId('leading-icon')).toBeTruthy();
      fireEvent.click(screen.getByTestId('action-btn'));
      fixture.detectChanges();

      expect(fixture.componentInstance.actionClicked).toBe(true);
      expect(screen.queryByTestId('ion-dropdown')).toBeFalsy();
    });
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