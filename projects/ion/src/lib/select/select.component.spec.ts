import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { fireEvent, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { DropdownItem } from '../core/types/dropdown';
import { IonSelectComponent } from './select.component';

const options: DropdownItem[] = [
  { label: 'Apple', key: 'apple' },
  { label: 'Banana', key: 'banana' },
  { label: 'Grape', key: 'grape' },
];

@Component({
  imports: [IonSelectComponent],
  template: `
    <ion-select [options]="items">
      <span ionSelectLeading data-testid="leading-icon">L</span>
      <button
        type="button"
        ionSelectAction
        data-testid="action-btn"
        (click)="onAction()"
      >
        Action
      </button>
    </ion-select>
  `,
})
class TestHostSlotsComponent {
  items = options;
  actionClicked = false;
  onAction(): void {
    this.actionClicked = true;
  }
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

    expect(
      fixture.nativeElement.querySelector('.ion-select').classList
    ).toContain('size-large');
    expect(
      fixture.nativeElement.querySelector('[data-testid="ion-chip-label"]')
        .textContent
    ).toContain('Apple');
  });

  it('should prioritize explicit single type even if multiple input is true', () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('multiple', true);
    fixture.componentRef.setInput('type', 'single');
    fixture.componentRef.setInput('value', 'apple');
    fixture.detectChanges();

    expect(fixture.componentInstance.isMultiple()).toBe(false);
    expect(
      fixture.nativeElement.querySelector('.selected-text')?.textContent
    ).toContain('Apple');
  });

  it('should render label and supporting text for error, invalid, and success states', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('label', 'Fruit');
    fixture.componentRef.setInput('supportingText', 'Choose one');
    fixture.componentRef.setInput('status', 'error');
    fixture.detectChanges();

    const trigger = screen.getByTestId('ion-select');
    expect(screen.getByText('Fruit')).toBeTruthy();
    expect(screen.getByText('Choose one').classList).toContain('error-text');
    expect(trigger.classList).toContain('error');
    expect(trigger.classList).toContain('invalid');

    fixture.componentRef.setInput('status', 'success');
    fixture.detectChanges();
    expect(screen.getByText('Choose one').classList).toContain('success-text');
    expect(trigger.classList).toContain('success');

    // Legacy invalid input takes precedence over success status
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(trigger.classList).toContain('invalid');
    expect(trigger.classList).toContain('error');
    expect(trigger.classList).not.toContain('success');
  });

  it('should expose the empty state when the open menu has no options', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.detectChanges();
    fireEvent.click(screen.getByTestId('ion-select'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(screen.getByTestId('ion-no-data')).toBeTruthy();
    expect(screen.getByTestId('ion-select').classList).toContain('open-empty');
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

  it('should remove a multi selection via close icon and emit the remaining values', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    const valueChangeSpy = jest.fn();
    fixture.componentInstance.valueChange.subscribe(valueChangeSpy);
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('type', 'multi');
    fixture.componentRef.setInput('value', ['apple', 'banana']);
    fixture.detectChanges();

    fireEvent.click(
      fixture.nativeElement.querySelector('ion-chip ion-icon svg')
    );
    fixture.detectChanges();

    expect(valueChangeSpy).toHaveBeenLastCalledWith(['banana']);
    expect(
      fixture.nativeElement
        .querySelector('.selected-value')
        .querySelectorAll('[data-testid="ion-chip-label"]')
    ).toHaveLength(1);
  });

  it('should open the dropdown without removing a selection when the chip body is clicked', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('type', 'multi');
    fixture.componentRef.setInput('value', ['banana']);
    fixture.detectChanges();

    const chipLabel = fixture.nativeElement.querySelector(
      'ion-chip [data-testid="ion-chip-label"]'
    );
    fireEvent.click(chipLabel);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(
      fixture.nativeElement
        .querySelector('.selected-value')
        .querySelectorAll('[data-testid="ion-chip-label"]')
    ).toHaveLength(1);
    expect(screen.getByTestId('ion-dropdown')).toBeTruthy();

    const trigger = screen.getByTestId('ion-select');
    expect(document.activeElement).toBe(trigger);
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });

    expect(document.activeElement).toBe(
      screen.getByRole('option', { name: 'Apple' })
    );
    expect(fixture.componentInstance.activeOptionIndex()).toBe(0);
  });

  it('should focus the close icon and restore focus to an adjacent chip after removal', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('type', 'multi');
    fixture.componentRef.setInput('value', ['apple', 'banana']);
    fixture.detectChanges();
    await fixture.whenStable();

    const chips = fixture.nativeElement.querySelectorAll(
      '.selected-value ion-chip'
    );
    const firstButton = chips[0].querySelector('button.ion-chip');
    const firstCloseIcon = chips[0].querySelector('ion-icon') as HTMLElement;

    expect(firstButton.getAttribute('tabindex')).toBe('-1');
    expect(firstCloseIcon.getAttribute('tabindex')).toBe('0');
    expect(firstCloseIcon.getAttribute('role')).toBe('button');
    expect(firstCloseIcon.getAttribute('aria-label')).toBe('Remover Apple');

    firstCloseIcon.focus();
    fireEvent.keyDown(firstCloseIcon, { key: 'Delete' });
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.componentInstance.dropdownSelectedItems()).toEqual([
      options[1],
    ]);
    expect(document.activeElement).toBe(
      fixture.nativeElement.querySelector('.selected-value ion-chip ion-icon')
    );
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

    fireEvent.click(
      fixture.nativeElement.querySelector('ion-chip ion-icon svg')
    );
    fixture.detectChanges();

    expect(valueChangeSpy).not.toHaveBeenCalled();
    expect(
      fixture.nativeElement
        .querySelector('.selected-value')
        .querySelectorAll('[data-testid="ion-chip-label"]')
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

  it('should compose ion-dropdown without mutating consumer options', async () => {
    const optionsCopy = options.map((option) => ({ ...option }));
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', optionsCopy);
    fixture.detectChanges();

    fireEvent.click(screen.getByTestId('ion-select'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    fireEvent.click(screen.getByRole('option', { name: 'Apple' }));
    fixture.detectChanges();

    expect(optionsCopy[0].selected).toBeUndefined();
  });

  it('should compose ion-dropdown and expose its options as an accessible listbox', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();

    fireEvent.click(screen.getByTestId('ion-select'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const listbox = screen.getByRole('listbox');
    expect(listbox.id).toBe(fixture.componentInstance.listboxId);
    expect(screen.getAllByRole('option')).toHaveLength(options.length);
  });

  it('should navigate options with arrow keys and restore trigger focus on Escape', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
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

    const apple = screen.getByRole('option', { name: 'Apple' });
    expect(document.activeElement).toBe(apple);
    expect(trigger.getAttribute('aria-controls')).toBe(
      fixture.componentInstance.listboxId
    );
    expect(trigger.getAttribute('aria-activedescendant')).toBe(apple.id);
    fireEvent.keyDown(apple, { key: 'ArrowDown' });

    const grape = screen.getByRole('option', { name: 'Grape' });
    expect(document.activeElement).toBe(grape);
    fireEvent.keyDown(grape, { key: 'Escape' });
    fixture.detectChanges();

    expect(screen.queryByTestId('ion-dropdown')).toBeFalsy();
    expect(document.activeElement).toBe(trigger);
  });

  it('should navigate to the dropdown clear button and clear preserved selections', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    const valueChangeSpy = jest.fn();
    fixture.componentInstance.valueChange.subscribe(valueChangeSpy);
    fixture.componentRef.setInput('multiple', true);
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('value', ['apple', 'banana']);
    fixture.detectChanges();

    fixture.componentRef.setInput('options', [options[0]]);
    fixture.detectChanges();
    fireEvent.click(screen.getByTestId('ion-select'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const option = screen.getByRole('option', { name: 'Apple' });
    option.focus();
    fireEvent.keyDown(option, { key: 'ArrowDown' });
    const clearButton = screen.getByRole('button', { name: 'Limpar' });
    expect(document.activeElement).toBe(clearButton);

    fireEvent.click(clearButton);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.dropdownSelectedItems()).toHaveLength(0);
    expect(valueChangeSpy).toHaveBeenCalledTimes(1);
    expect(valueChangeSpy).toHaveBeenCalledWith([]);
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

  it('should not open dropdown when disabled and close an open dropdown if disabled becomes true', async () => {
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

  describe('search integration (legacy select compatibility)', () => {
    it('should forward enableSearch and emit search output when handleSearch is called', async () => {
      const fixture = TestBed.createComponent(IonSelectComponent);
      const searchSpy = jest.fn();
      fixture.componentInstance.search.subscribe(searchSpy);

      fixture.componentRef.setInput('options', options);
      fixture.componentRef.setInput('enableSearch', true);
      fixture.componentRef.setInput('searchOptions', {
        inputPlaceholder: 'Buscar fruta',
      });
      fixture.detectChanges();

      fireEvent.click(screen.getByTestId('ion-select'));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      fixture.componentInstance.handleSearch('ban');
      expect(searchSpy).toHaveBeenCalledWith('ban');
    });

    it('should move focus from dropdown search input to first enabled option on ArrowDown and close on Escape', async () => {
      const fixture = TestBed.createComponent(IonSelectComponent);
      fixture.componentRef.setInput('options', options);
      fixture.componentRef.setInput('enableSearch', true);
      fixture.detectChanges();

      const trigger = screen.getByTestId('ion-select');
      fireEvent.click(trigger);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const searchInput = document.querySelector<HTMLInputElement>(
        '.cdk-overlay-pane .container-options input'
      );
      if (searchInput) {
        searchInput.focus();
        fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
        expect(document.activeElement).toBe(
          screen.getByRole('option', { name: 'Apple' })
        );

        searchInput.focus();
        fireEvent.keyDown(searchInput, { key: 'Escape' });
        fixture.detectChanges();
        expect(screen.queryByTestId('ion-dropdown')).toBeFalsy();
        expect(document.activeElement).toBe(trigger);
      }
    });
  });

  describe('projected slots & accessibility announcements', () => {
    it('should render leading and action slots without toggling dropdown on action click', () => {
      const fixture = TestBed.createComponent(TestHostSlotsComponent);
      fixture.detectChanges();

      expect(screen.getByTestId('leading-icon')).toBeTruthy();
      const actionBtn = screen.getByTestId('action-btn');
      fireEvent.click(actionBtn);
      fixture.detectChanges();

      expect(fixture.componentInstance.actionClicked).toBe(true);
      expect(screen.queryByTestId('ion-dropdown')).toBeFalsy();
    });

    it('should announce available options count and current selection in aria-live region', () => {
      const fixture = TestBed.createComponent(IonSelectComponent);
      fixture.componentRef.setInput('options', options);
      fixture.componentRef.setInput('value', 'apple');
      fixture.detectChanges();

      const statusRegion = screen.getByRole('status');
      expect(statusRegion.textContent).toContain('Selecionado: Apple.');

      fireEvent.click(screen.getByTestId('ion-select'));
      fixture.detectChanges();
      expect(statusRegion.textContent).toContain('3 opções disponíveis.');
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

    it('should emit an array of full objects via valueChange when a chip is removed via handleChipEvents or removeSelected', async () => {
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

      valueChangeSpy.mockClear();

      // Legacy method alias preserved
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