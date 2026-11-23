import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  inject,
  Injector,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';

import { IonChipComponent } from '../chip/chip.component';
import { IonDropdownComponent } from '../dropdown/dropdown.component';
import { IonIconComponent } from '../icon/icon.component';
import { DropdownItem } from '../core/types/dropdown';
import { calculateVisibleChipCount } from '../select/calculate-visible-chip-count';

const CHIP_GAP = 8;

export type IonSelectType = 'single' | 'multi';
export type IonSelectSize = 'base' | 'large';
export type IonSelectStatus = 'default' | 'error' | 'success';
export type IonSelectTheme = 'light' | 'dark' | 'orange-light' | 'orange-dark';

@Component({
  selector: 'ion-select-field',
  standalone: true,
  imports: [IonChipComponent, IonDropdownComponent, IonIconComponent],
  templateUrl: './selectfield.component.html',
  styleUrls: ['./selectfield.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonSelectFieldComponent {
  private static nextInstanceId = 0;
  private pointerDownOnTrigger = false;
  readonly instanceId = `ion-select-field-${IonSelectFieldComponent.nextInstanceId++}`;
  readonly labelId = `${this.instanceId}-label`;
  readonly listboxId = `${this.instanceId}-listbox`;

  placeholder = input<string>('Selecione');
  options = input<DropdownItem[]>([]);
  multiple = input<boolean>(false);
  type = input<IonSelectType | undefined>(undefined);
  size = input<IonSelectSize>('base');
  label = input<string>('');
  supportingText = input<string>('');
  status = input<IonSelectStatus>('default');
  theme = input<IonSelectTheme | undefined>(undefined);
  required = input<boolean>(false);
  disabled = input<boolean>(false);
  invalid = input<boolean>(false);
  propLabel = input<string>('label');
  propValue = input<string>('key');
  loading = input<boolean>(false);
  value = input<any>(undefined);
  returnFullObject = input<boolean>(false);

  selected = output<DropdownItem[]>();
  valueChange = output<any>();

  showDropdown = signal(false);
  isKeyboardFocus = signal(false);
  activeOptionIndex = signal<number | null>(null);
  dropdownSelectedItems = signal<DropdownItem[]>([]);
  visibleCount = signal<number | null>(null);

  selectTrigger = viewChild<ElementRef<HTMLElement>>('selectTrigger');
  measurementContainer = viewChild<ElementRef<HTMLElement>>('measurementContainer');

  activeDescendantId = computed(() => {
    const index = this.activeOptionIndex();
    const option = index === null ? undefined : this.dropdownOptions()[index];

    return this.showDropdown() &&
      !this.loading() &&
      index !== null &&
      option &&
      !option.disabled
      ? this.getOptionId(index)
      : null;
  });
  accessibilityAnnouncement = computed(() => {
    const count = this.options().length;
    const selectedLabel = this.getSelectedLabel();
    const optionsMessage =
      count === 0
        ? 'Nenhuma opção disponível.'
        : `${count} ${count === 1 ? 'opção disponível' : 'opções disponíveis'}.`;
    const selectionMessage = selectedLabel
      ? `${this.isMultiple() ? 'Selecionados' : 'Selecionado'}: ${selectedLabel}.`
      : 'Nenhuma opção selecionada.';

    return this.showDropdown()
      ? `${optionsMessage} ${selectionMessage}`
      : selectionMessage;
  });

  isMultiple = computed(() => this.type() === 'multi' || (this.type() === undefined && this.multiple()));
  isError = computed(() => this.invalid() || this.status() === 'error');
  isSuccess = computed(() => !this.isError() && this.status() === 'success');
  hasNoOptions = computed(() => !this.loading() && this.options().length === 0);

  visibleItems = computed(() => {
    const items = this.dropdownSelectedItems();
    const count = this.visibleCount();

    if (!this.isMultiple() || count === null || count >= items.length) {
      return items;
    }

    return items.slice(0, count);
  });

  overflowCount = computed(() => {
    if (!this.isMultiple()) {
      return 0;
    }

    return Math.max(
      0,
      this.dropdownSelectedItems().length - this.visibleItems().length
    );
  });

  dropdownOptions = computed(() => {
    const selectedItems = this.dropdownSelectedItems();
    return this.options().map((option) => ({
      ...option,
      selected: selectedItems.some((selected) =>
        this.sameOption(selected, option)
      ),
    }));
  });

  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);
  private resizeObserver: ResizeObserver | null = null;
  private dropdownPanel: HTMLElement | null = null;
  private clearButtonActivated = false;

  constructor() {
    effect(() => {
      const options = this.options();
      const value = this.value();
      const currentSelected = untracked(() =>
        this.dropdownSelectedItems()
      );

      if (value !== undefined) {
        const values =
          value === null || value === ''
            ? []
            : Array.isArray(value)
              ? value
              : [value];
        const presentSelected = options.filter((option) =>
          values.some((selectedValue) =>
            this.optionMatchesValue(option, selectedValue)
          )
        );
        const preservedSelected = currentSelected.filter(
          (item) =>
            !options.some((option) => this.sameOption(option, item)) &&
            values.some((selectedValue) =>
              this.optionMatchesValue(item, selectedValue)
            )
          );
        this.dropdownSelectedItems.set([
          ...presentSelected,
          ...preservedSelected,
        ]);
        return;
      }

      const selectedFromOptions = options.filter((option) => option.selected);
      const preservedSelection = currentSelected.map(
        (item) =>
          options.find((option) => this.sameOption(option, item)) ?? item
      );
      const nextSelection = [...preservedSelection];

      selectedFromOptions.forEach((option) => {
        if (
          !nextSelection.some((selected) => this.sameOption(selected, option))
        ) {
          nextSelection.push(option);
        }
      });

      const singleSelection = selectedFromOptions[0] ?? preservedSelection[0];
      if (this.isMultiple()) {
        this.dropdownSelectedItems.set(nextSelection);
        return;
      }

      this.dropdownSelectedItems.set(singleSelection ? [singleSelection] : []);
    });

    effect(() => {
      this.dropdownSelectedItems();
      this.isMultiple();
      untracked(() => queueMicrotask(() => this.updateVisibleCount()));
    });

    effect(() => {
      if (this.disabled()) {
        this.showDropdown.set(false);
      }
    });

    effect(() => {
      this.dropdownOptions();
      this.activeOptionIndex();
      this.loading();
      this.theme();
      if (this.showDropdown()) {
        untracked(() => this.scheduleDropdownAccessibilitySync());
      }
    });

    afterNextRender(() => {
      this.setupResizeObserver();
      this.updateVisibleCount();
    });
  }

  onTriggerPointerDown(): void {
    this.pointerDownOnTrigger = true;
    this.isKeyboardFocus.set(false);
  }

  onTriggerFocus(event: FocusEvent): void {
    this.isKeyboardFocus.set(
      event.target === event.currentTarget && !this.pointerDownOnTrigger
    );
    this.pointerDownOnTrigger = false;
  }

  onTriggerBlur(event: FocusEvent): void {
    this.pointerDownOnTrigger = false;
    this.isKeyboardFocus.set(false);
  }

  toggleDropdown(): void {
    if (this.disabled()) {
      return;
    }

    if (this.showDropdown()) {
      this.closeDropdown();
      return;
    }
    this.openDropdown();
  }

  handleTriggerKeydown(event: KeyboardEvent): void {
    const target = event.target;
    if (event.key === 'Tab') {
      this.pointerDownOnTrigger = false;
      this.isKeyboardFocus.set(true);
    }
    if (
      this.disabled() ||
      (target instanceof HTMLElement &&
        (target.closest('.action-slot') ||
          target.closest('.selected-value ion-chip')))
    ) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        if (!this.showDropdown()) {
          this.openDropdown(event.key === 'ArrowUp');
          afterNextRender(
            () => {
              if (this.showDropdown()) {
                this.syncDropdownAccessibility();
                this.focusActiveOption();
              }
            },
            { injector: this.injector }
          );
        } else {
          this.moveActiveOption(event.key === 'ArrowDown' ? 1 : -1);
          this.focusActiveOption();
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (!this.showDropdown()) {
          this.openDropdown();
        } else {
          const index = this.activeOptionIndex();
          const option = index === null ? undefined : this.dropdownOptions()[index];
          if (option) {
            this.selectOption(option);
          }
        }
        break;
      case ' ':
        event.preventDefault();
        if (!this.showDropdown()) {
          this.openDropdown();
        }
        break;
      case 'Escape':
        if (this.showDropdown()) {
          event.preventDefault();
          this.closeDropdown();
          this.selectTrigger()?.nativeElement.focus();
        }
        break;
    }
  }

  handleOptionKeydown(event: KeyboardEvent, index: number): void {
    const option = this.dropdownOptions()[index];
    if (!option || option.disabled) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeOptionIndex.set(index);
        const enabledIndices = this.dropdownOptions()
          .map((item, itemIndex) => (!item.disabled ? itemIndex : -1))
          .filter((itemIndex) => itemIndex >= 0);
        if (enabledIndices[enabledIndices.length - 1] === index) {
          if (this.isClearButtonAvailable()) {
            this.dropdownPanel
              ?.querySelector<HTMLElement>('.clear-button')
              ?.focus();
          } else {
            this.moveActiveOption(1);
            this.focusActiveOption();
          }
        } else {
          this.moveActiveOption(1);
          this.focusActiveOption();
        }
        break;
      case 'ArrowUp': {
        event.preventDefault();
        this.activeOptionIndex.set(index);
        this.moveActiveOption(-1);
        this.focusActiveOption();
        break;
      }
      case 'Escape':
        event.preventDefault();
        this.closeDropdown();
        this.selectTrigger()?.nativeElement.focus();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectOption(option);
        break;
    }
  }

  handleClearKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.moveActiveOption(-1);
        this.focusActiveOption();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusFirstEnabledOption();
        break;
      case 'Escape':
        event.preventDefault();
        this.closeDropdown();
        this.selectTrigger()?.nativeElement.focus();
        break;
    }
  }

  private focusFirstEnabledOption(): void {
    const index = this.dropdownOptions().findIndex((option) => !option.disabled);
    if (index >= 0) {
      this.activeOptionIndex.set(index);
      this.focusOption(index);
    }
  }

  private focusActiveOption(): void {
    const index = this.activeOptionIndex();
    if (index !== null) {
      this.focusOption(index);
    }
  }

  private isClearButtonAvailable(): boolean {
    return (
      this.isMultiple() &&
      this.dropdownSelectedItems().length > 0 &&
      !this.required()
    );
  }

  private focusOption(index: number): void {
    document.getElementById(this.getOptionId(index))?.focus();
  }

  @HostListener('document:keydown', ['$event'])
  handleDropdownKeydown(event: KeyboardEvent): void {
    const target = event.target;
    if (
      !this.showDropdown() ||
      !(target instanceof HTMLElement) ||
      !this.dropdownPanel?.contains(target)
    ) {
      return;
    }

    const optionIndexAttribute = target.getAttribute(
      'data-select-field-option'
    );
    if (
      optionIndexAttribute !== null &&
      target.classList.contains('ion-dropdown-item')
    ) {
      const optionIndex = Number(optionIndexAttribute);
      this.handleOptionKeydown(event, optionIndex);
      return;
    }

    if (target.classList.contains('clear-button')) {
      this.handleClearKeydown(event);
    }
  }

  private scrollToActiveOption(index: number | null): void {
    if (index === null) {
      return;
    }

    requestAnimationFrame(() => {
      const optionId = this.getOptionId(index);
      const optionElement = document.getElementById(optionId);

      if (optionElement) {
        optionElement.scrollIntoView?.({ block: 'nearest' });
      }
    });
  }

  private openDropdown(preferLastOption = false): void {
    this.showDropdown.set(true);

    const initialIndex = this.getInitialActiveOptionIndex(preferLastOption);
    this.activeOptionIndex.set(initialIndex);

    this.scrollToActiveOption(initialIndex);
  }

  private scheduleDropdownAccessibilitySync(): void {
    afterNextRender(() => this.syncDropdownAccessibility(), {
      injector: this.injector,
    });
  }

  private syncDropdownAccessibility(): void {
    if (!this.showDropdown()) {
      this.dropdownPanel = null;
      return;
    }

    const trigger = this.selectTrigger()?.nativeElement;
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.cdk-overlay-pane .container-options'
      )
    );
    if (!trigger || panels.length === 0) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    const panel = panels.reduce((closest, candidate) => {
      const closestRect = closest.getBoundingClientRect();
      const candidateRect = candidate.getBoundingClientRect();
      const distance = (rect: DOMRect) =>
        Math.abs(rect.left - triggerRect.left) +
        Math.min(
          Math.abs(rect.top - triggerRect.bottom),
          Math.abs(rect.bottom - triggerRect.top)
        );
      return distance(candidateRect) < distance(closestRect)
        ? candidate
        : closest;
    });

    this.dropdownPanel = panel;
    panel.setAttribute('data-select-field-id', this.instanceId);
    if (this.theme()) {
      panel.setAttribute('data-ion-theme', this.theme()!);
    } else {
      panel.removeAttribute('data-ion-theme');
    }
    if (triggerRect.width > 0) {
      panel.style.width = `${triggerRect.width}px`;
    }

    const listbox = panel.querySelector<HTMLElement>('.options-list');
    if (listbox) {
      listbox.id = this.listboxId;
      listbox.setAttribute('role', 'listbox');
      if (this.isMultiple()) {
        listbox.setAttribute('aria-multiselectable', 'true');
      } else {
        listbox.removeAttribute('aria-multiselectable');
      }
    }

    const options = this.dropdownOptions();
    panel
      .querySelectorAll<HTMLElement>('.ion-dropdown-item')
      .forEach((optionElement, index) => {
        const option = options[index];
        if (!option) {
          return;
        }

        optionElement.id = this.getOptionId(index);
        optionElement.setAttribute('role', 'option');
        optionElement.setAttribute('aria-selected', String(!!option.selected));
        optionElement.setAttribute(
          'aria-disabled',
          String(!!option.disabled)
        );
        optionElement.setAttribute(
          'tabindex',
          option.disabled ? '-1' : '0'
        );
        optionElement.setAttribute('data-select-field-option', String(index));
        optionElement.classList.toggle(
          'dropdown-item-active',
          this.activeOptionIndex() === index
        );
      });

    const clearButton = panel.querySelector<HTMLElement>('.clear-button');
    if (clearButton) {
      clearButton.id = `${this.listboxId}-clear`;
    }
  }

  private getInitialActiveOptionIndex(preferLastOption: boolean): number | null {
    const enabledOptions = this.dropdownOptions()
      .map((option, index) => ({ option, index }))
      .filter(({ option }) => !option.disabled);
    const selectedOption = enabledOptions.find(({ option }) => option.selected);

    if (selectedOption) {
      return selectedOption.index;
    }

    return enabledOptions.length
      ? enabledOptions[preferLastOption ? enabledOptions.length - 1 : 0].index
      : null;
  }

  private moveActiveOption(direction: 1 | -1): void {
    const enabledIndices = this.dropdownOptions()
      .map((option, index) => (!option.disabled ? index : -1))
      .filter((index) => index >= 0);

    if (!enabledIndices.length) {
      this.activeOptionIndex.set(null);
      return;
    }

    const currentPosition = enabledIndices.indexOf(
      this.activeOptionIndex() ?? -1
    );
    const nextPosition =
      currentPosition < 0
        ? direction === 1
          ? 0
          : enabledIndices.length - 1
        : (currentPosition + direction + enabledIndices.length) %
          enabledIndices.length;

    const newIndex = enabledIndices[nextPosition];
    this.activeOptionIndex.set(newIndex);
    this.scrollToActiveOption(newIndex);
  }

  getOptionId(index: number): string {
    return `${this.listboxId}-option-${index}`;
  }

  handleSelect(selectedItems: DropdownItem[]): void {
    const currentSelected = this.dropdownSelectedItems();
    let finalSelected = selectedItems.map(
      (item) =>
        this.options().find((option) => this.sameOption(option, item)) ?? item
    );

    if (this.isMultiple()) {
      const itemsNotInOptions = currentSelected.filter(
        (item) => !this.options().some((option) => this.sameOption(option, item))
      );
      finalSelected = [...itemsNotInOptions, ...finalSelected];
    }

    this.dropdownSelectedItems.set(finalSelected);
    this.selected.emit(finalSelected);
    this.valueChange.emit(this.getEmittedValue(finalSelected));

    if (!this.isMultiple()) {
      this.closeDropdown();
    }
  }

  handleDropdownSelection(selectedItems: DropdownItem[]): void {
    if (this.isMultiple() && selectedItems.length === 0) {
      queueMicrotask(() => {
        if (this.clearButtonActivated) {
          this.clearButtonActivated = false;
          return;
        }
        this.handleSelect(selectedItems);
      });
      return;
    }

    this.handleSelect(selectedItems);
  }

  handleClearButton(): void {
    this.clearButtonActivated = true;
    this.clearSelection();
    queueMicrotask(() => {
      this.clearButtonActivated = false;
    });
  }

  private clearSelection(): void {
    if (this.disabled() || this.required()) {
      return;
    }

    this.dropdownSelectedItems.set([]);
    this.selected.emit([]);
    this.valueChange.emit(this.isMultiple() ? [] : null);
  }

  selectOption(option: DropdownItem): void {
    if (option.disabled || this.disabled()) {
      return;
    }

    const selectedOption =
      this.options().find((item) => this.sameOption(item, option)) ?? option;
    const selectedIndex = this.options().findIndex((item) =>
      this.sameOption(item, selectedOption)
    );
    if (selectedIndex >= 0) {
      this.activeOptionIndex.set(selectedIndex);
    }
    const currentSelected = this.dropdownSelectedItems();
    const isSelected = currentSelected.some((item) =>
      this.sameOption(item, selectedOption)
    );

    if (this.isMultiple()) {
      if (isSelected && this.required() && currentSelected.length === 1) {
        return;
      }

      const nextSelection = isSelected
        ? currentSelected.filter((item) => !this.sameOption(item, selectedOption))
        : [...currentSelected, selectedOption];
      this.handleSelect(nextSelection);
      return;
    }

    if (isSelected) {
      if (!this.required()) {
        this.handleSelect([]);
      }
      return;
    }

    this.handleSelect([selectedOption]);
  }

  closeDropdown(): void {
    this.showDropdown.set(false);
    this.activeOptionIndex.set(null);
    this.dropdownPanel = null;
  }

  getSelectedLabel(): string {
    const selected = this.dropdownSelectedItems();
    if (selected.length === 0) {
      return '';
    }

    if (this.isMultiple()) {
      return selected.map((item) => this.getOptionLabel(item)).join(', ');
    }

    return this.getOptionLabel(selected[0]);
  }

  getOptionLabel(item: DropdownItem): string {
    return String(
      Reflect.get(item, this.propLabel()) || item.label || ''
    );
  }

  handleChipEvents(item: DropdownItem): void {
    this.removeSelected(item);
  }

  removeSelected(item: DropdownItem, event?: Event): void {
    event?.stopPropagation();
    const currentItems = this.dropdownSelectedItems();
    if (
      this.disabled() ||
      (this.required() && currentItems.length === 1)
    ) {
      return;
    }

    const updatedItems = currentItems.filter(
      (selected) => !this.sameOption(selected, item)
    );
    if (updatedItems.length === currentItems.length) {
      return;
    }

    this.dropdownSelectedItems.set(updatedItems);
    this.selected.emit(updatedItems);
    this.valueChange.emit(this.getEmittedValue(updatedItems));
  }

  private getEmittedValue(items: DropdownItem[]): any {
    if (this.returnFullObject()) {
      return this.isMultiple() ? items : items[0] || null;
    }

    const values = items.map((item) => Reflect.get(item, this.propValue()));
    return this.isMultiple() ? values : values[0] ?? null;
  }

  private getOptionValue(item: DropdownItem): unknown {
    return Reflect.get(item, this.propValue());
  }

  private sameOption(first: DropdownItem, second: DropdownItem): boolean {
    const firstValue = this.getOptionValue(first);
    const secondValue = this.getOptionValue(second);

    if (firstValue === undefined && secondValue === undefined) {
      return this.getOptionLabel(first) === this.getOptionLabel(second);
    }
    return Object.is(firstValue, secondValue);
  }

  private optionMatchesValue(option: DropdownItem, value: unknown): boolean {
    const valueToCompare =
      value !== null && typeof value === 'object'
        ? Reflect.get(value, this.propValue())
        : value;

    if (valueToCompare === undefined && value !== null && typeof value === 'object') {
      const valueLabel = Reflect.get(value, this.propLabel());
      return (
        valueLabel !== undefined &&
        this.getOptionLabel(option) === String(valueLabel)
      );
    }
    return Object.is(this.getOptionValue(option), valueToCompare);
  }

  private setupResizeObserver(): void {
    const trigger = this.selectTrigger()?.nativeElement;
    if (!trigger || typeof ResizeObserver === 'undefined') {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => this.updateVisibleCount());
    this.resizeObserver.observe(trigger);

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
    });
  }

  private updateVisibleCount(): void {
    const items = this.dropdownSelectedItems();
    if (!this.isMultiple() || items.length === 0) {
      this.visibleCount.set(null);
      return;
    }

    const trigger = this.selectTrigger()?.nativeElement;
    const measurement = this.measurementContainer()?.nativeElement;
    const selectedValue = trigger?.querySelector<HTMLElement>('.selected-value');
    if (!trigger || !selectedValue || !measurement) {
      this.visibleCount.set(null);
      return;
    }

    const availableWidth = selectedValue.getBoundingClientRect().width; // size and relative position from dom
    const chipWidths = Array.from(
      measurement.querySelectorAll<HTMLElement>('ion-chip')
    ).map((element) => element.getBoundingClientRect().width);

    if (
      availableWidth <= 0 ||
      chipWidths.length === 0 ||
      chipWidths.every((width) => width === 0)
    ) {
      this.visibleCount.set(null);
      return;
    }

    const counterMeasure = measurement.querySelector<HTMLElement>(
      '.overflow-counter-measure'
    );
    const getCounterWidth = (hiddenCount: number): number => {
      if (!counterMeasure) {
        return 30;
      }
      counterMeasure.textContent = `+${hiddenCount}`;
      return counterMeasure.getBoundingClientRect().width;
    };

    this.visibleCount.set(
      calculateVisibleChipCount(
        chipWidths,
        availableWidth,
        CHIP_GAP,
        getCounterWidth
      )
    );
  }
}
