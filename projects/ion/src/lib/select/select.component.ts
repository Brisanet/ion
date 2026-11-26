import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';

import { IonSelectSize, IonSelectStatus, IonSelectType} from '../core/types/select';
import { IonChipComponent } from '../chip/chip.component';
import { DropdownItem, DropdownParams } from '../core/types/dropdown';
import { IonDropdownComponent } from '../dropdown/dropdown.component';
import { IonIconComponent } from '../icon/icon.component';
import { calculateVisibleChipCount } from './calculate-visible-chip-count';

const CHIP_GAP = 8;
const CHIP_REMOVE_KEYS = new Set(['Backspace','Delete','Enter', ' ', 'Spacebar',]);

@Component({
  selector: 'ion-select',
  imports: [IonChipComponent, IonDropdownComponent, IonIconComponent],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'(document:keydown)': 'handleDropdownKeydown($event)',},
})
export class IonSelectComponent {
  private static nextInstanceId = 0;

  readonly instanceId = `ion-select-${IonSelectComponent.nextInstanceId++}`;
  readonly labelId = `${this.instanceId}-label`;
  readonly listboxId = `${this.instanceId}-listbox`;

  // Inputs
  placeholder = input<string>('Selecione');
  options = input<DropdownItem[]>([]);
  multiple = input<boolean>(false);
  type = input<IonSelectType | undefined>(undefined);
  size = input<IonSelectSize>('base');
  label = input<string>('');
  supportingText = input<string>('');
  status = input<IonSelectStatus>('default');
  required = input<boolean>(false);
  disabled = input<boolean>(false);
  invalid = input<boolean>(false);
  enableSearch = input<boolean>(false);
  searchOptions = input<DropdownParams['searchOptions']>();
  propLabel = input<string>('label');
  propValue = input<string>('key');
  loading = input<boolean>(false);
  value = input<any>(undefined);
  returnFullObject = input<boolean>(false);

  // Outputs
  selected = output<DropdownItem[]>();
  search = output<string>();
  valueChange = output<any>();

  // Signals
  showDropdown = signal(false);
  isKeyboardFocus = signal(false);
  activeOptionIndex = signal<number | null>(null);
  dropdownSelectedItems = signal<DropdownItem[]>([]);
  visibleCount = signal<number | null>(null);

  selectTrigger = viewChild<ElementRef<HTMLElement>>('selectTrigger');
  measurementContainer =
    viewChild<ElementRef<HTMLElement>>('measurementContainer');

  isMultiple = computed(
    () =>
      this.type() === 'multi' ||
      (this.type() === undefined && this.multiple())
  );
  isError = computed(() => this.invalid() || this.status() === 'error');
  isSuccess = computed(() => !this.isError() && this.status() === 'success');
  hasNoOptions = computed(() => !this.loading() && this.options().length === 0);

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
    const optionsMessage = count
      ? `${count} ${count === 1 ? 'opção disponível' : 'opções disponíveis'}.`
      : 'Nenhuma opção disponível.';
    const selectionMessage = selectedLabel
      ? `${this.isMultiple() ? 'Selecionados' : 'Selecionado'}: ${selectedLabel}.`
      : 'Nenhuma opção selecionada.';

    return this.showDropdown()
      ? `${optionsMessage} ${selectionMessage}`
      : selectionMessage;
  });

  visibleItems = computed(() => {
    const items = this.dropdownSelectedItems();
    const count = this.visibleCount();
    return !this.isMultiple() || count === null || count >= items.length
      ? items
      : items.slice(0, count);
  });

  overflowCount = computed(() =>
    this.isMultiple()
      ? Math.max(
          0,
          this.dropdownSelectedItems().length - this.visibleItems().length
        )
      : 0
  );

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
  private pointerDownOnTrigger = false;
  private focusFirstOptionOnNextArrow = false;
  private clearButtonActivated = false;

  constructor() {
    effect(() => {
      const options = this.options();
      const value = this.value();
      const currentSelected = untracked(() => this.dropdownSelectedItems());

      if (value !== undefined) {
        const values =
          value === null || value === ''
            ? []
            : Array.isArray(value)
              ? value
              : [value];
        const matches = (item: DropdownItem) =>
          values.some((v) => this.optionMatchesValue(item, v));
        const presentSelected = options.filter(matches);
        const preservedSelected = currentSelected.filter(
          (item) =>
            !options.some((opt) => this.sameOption(opt, item)) && matches(item)
        );
        this.dropdownSelectedItems.set([
          ...presentSelected,
          ...preservedSelected,
        ]);
        return;
      }

      const selectedFromOptions = options.filter((opt) => opt.selected);
      const preservedSelection = currentSelected.map(
        (item) => options.find((opt) => this.sameOption(opt, item)) ?? item
      );
      const nextSelection = [...preservedSelection];

      selectedFromOptions.forEach((opt) => {
        if (!nextSelection.some((sel) => this.sameOption(sel, opt))) {
          nextSelection.push(opt);
        }
      });

      const singleSelection = selectedFromOptions[0] ?? preservedSelection[0];
      this.dropdownSelectedItems.set(
        this.isMultiple()
          ? nextSelection
          : singleSelection
            ? [singleSelection]
            : []
      );
    });

    effect(() => {
      this.dropdownSelectedItems();
      this.isMultiple();
      this.visibleItems();
      this.disabled();
      this.required();
      this.propLabel();
      untracked(() =>
        queueMicrotask(() => {
          this.updateVisibleCount();
          this.syncChipAccessibility();
        })
      );
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
      if (this.showDropdown()) {
        untracked(() =>
          this.runAfterRender(() => this.syncDropdownAccessibility())
        );
      }
    });

    afterNextRender(() => {
      this.setupResizeObserver();
      this.updateVisibleCount();
    });
  }

  stopActionPropagation(event: Event): void {
    event.stopPropagation();
  }

  onTriggerPointerDown(): void {
    this.pointerDownOnTrigger = true;
    this.focusFirstOptionOnNextArrow = false;
    this.isKeyboardFocus.set(false);
  }

  onTriggerFocus(event: FocusEvent): void {
    this.isKeyboardFocus.set(
      event.target === event.currentTarget && !this.pointerDownOnTrigger
    );
    this.pointerDownOnTrigger = false;
  }

  onTriggerBlur(): void {
    this.pointerDownOnTrigger = false;
    this.isKeyboardFocus.set(false);
  }

  toggleDropdown(): void {
    if (this.disabled()) return;
    if (this.showDropdown()) {
      this.closeDropdown();
      return;
    }
    this.openDropdown();
  }

  handleTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      this.pointerDownOnTrigger = false;
      this.isKeyboardFocus.set(true);
    }
    if (
      this.disabled() ||
      (event.target instanceof HTMLElement &&
        (event.target.closest('.action-slot') ||
          event.target.closest('.selected-value ion-chip')))
    ) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        if (!this.showDropdown()) {
          this.openDropdown(event.key === 'ArrowUp');
          this.runAfterRender(() => {
            if (this.showDropdown()) {
              this.syncDropdownAccessibility();
              this.focusActiveOption();
            }
          });
        } else if (
          event.key === 'ArrowDown' &&
          this.focusFirstOptionOnNextArrow
        ) {
          this.focusFirstOptionOnNextArrow = false;
          this.focusFirstEnabledOption();
        } else {
          this.focusFirstOptionOnNextArrow = false;
          this.moveActiveOption(event.key === 'ArrowDown' ? 1 : -1);
          this.focusActiveOption();
        }
        break;
      case 'Enter': {
        this.focusFirstOptionOnNextArrow = false;
        event.preventDefault();
        if (!this.showDropdown()) {
          this.openDropdown();
        } else {
          const index = this.activeOptionIndex();
          const option =
            index === null ? undefined : this.dropdownOptions()[index];
          if (option) this.selectOption(option);
        }
        break;
      }
      case ' ':
        this.focusFirstOptionOnNextArrow = false;
        event.preventDefault();
        if (!this.showDropdown()) this.openDropdown();
        break;
      case 'Escape':
        if (this.showDropdown()) {
          event.preventDefault();
          this.closeAndFocusTrigger();
        }
        break;
    }
  }

  handleOptionKeydown(event: KeyboardEvent, index: number): void {
    const option = this.dropdownOptions()[index];
    if (!option || option.disabled) return;

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        this.activeOptionIndex.set(index);
        const enabledIndices = this.getEnabledOptionIndices();
        if (enabledIndices.at(-1) === index && this.isClearButtonAvailable()) {
          this.dropdownPanel
            ?.querySelector<HTMLElement>('.clear-button')
            ?.focus();
        } else {
          this.moveActiveOption(1);
          this.focusActiveOption();
        }
        break;
      }
      case 'ArrowUp':
        event.preventDefault();
        this.activeOptionIndex.set(index);
        this.moveActiveOption(-1);
        this.focusActiveOption();
        break;
      case 'Escape':
        event.preventDefault();
        this.closeAndFocusTrigger();
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
        this.closeAndFocusTrigger();
        break;
    }
  }

  handleDropdownKeydown(event: KeyboardEvent): void {
    const target = event.target;
    if (
      !this.showDropdown() ||
      !(target instanceof HTMLElement) ||
      !this.dropdownPanel?.contains(target)
    ) {
      return;
    }

    const optionAttr = target.getAttribute('data-select-field-option');
    if (optionAttr !== null && target.classList.contains('ion-dropdown-item')) {
      this.handleOptionKeydown(event, Number(optionAttr));
    } else if (target.classList.contains('clear-button')) {
      this.handleClearKeydown(event);
    } else if (target.tagName === 'INPUT') {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.focusFirstEnabledOption();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        this.closeAndFocusTrigger();
      }
    }
  }

  getOptionId(index: number): string {
    return `${this.listboxId}-option-${index}`;
  }

  handleSelect(selectedItems: DropdownItem[]): void {
    const options = this.options();
    let finalSelected = selectedItems.map(
      (item) => options.find((opt) => this.sameOption(opt, item)) ?? item
    );

    if (this.isMultiple()) {
      const preserved = this.dropdownSelectedItems().filter(
        (item) => !options.some((opt) => this.sameOption(opt, item))
      );
      finalSelected = [...preserved, ...finalSelected];
    }

    this.emitSelection(finalSelected);
    if (!this.isMultiple()) this.closeDropdown();
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
    queueMicrotask(() => (this.clearButtonActivated = false));
  }

  handleSearch(value: string): void {
    this.search.emit(value);
  }

  selectOption(option: DropdownItem): void {
    if (option.disabled || this.disabled()) return;

    const selectedOption =
      this.options().find((item) => this.sameOption(item, option)) ?? option;
    const selectedIndex = this.options().findIndex((item) =>
      this.sameOption(item, selectedOption)
    );
    if (selectedIndex >= 0) this.activeOptionIndex.set(selectedIndex);

    const current = this.dropdownSelectedItems();
    const isSelected = current.some((item) =>
      this.sameOption(item, selectedOption)
    );

    if (this.isMultiple()) {
      if (isSelected && this.required() && current.length === 1) return;
      this.handleSelect(
        isSelected
          ? current.filter((item) => !this.sameOption(item, selectedOption))
          : [...current, selectedOption]
      );
      return;
    }

    if (isSelected) {
      if (!this.required()) this.handleSelect([]);
      return;
    }
    this.handleSelect([selectedOption]);
  }

  closeDropdown(): void {
    this.showDropdown.set(false);
    this.activeOptionIndex.set(null);
    this.focusFirstOptionOnNextArrow = false;
    this.dropdownPanel = null;
  }

  getSelectedLabel(): string {
    const selected = this.dropdownSelectedItems();
    if (!selected.length) return '';
    return this.isMultiple()
      ? selected.map((item) => this.getOptionLabel(item)).join(', ')
      : this.getOptionLabel(selected[0]);
  }

  getOptionLabel(item: DropdownItem): string {
    return String(Reflect.get(item, this.propLabel()) || item.label || '');
  }

  onChipClick(event: MouseEvent, item: DropdownItem): void {
    if (this.getChipCloseIcon(event)) {
      event.stopPropagation();
      this.removeChipAndRestoreFocus(
        item,
        event.currentTarget as HTMLElement,
        event
      );
      return;
    }

    this.focusFirstOptionOnNextArrow = !this.showDropdown();
    this.selectTrigger()?.nativeElement.focus();
  }

  onChipKeydown(event: KeyboardEvent, item: DropdownItem): void {
    if (!this.getChipCloseIcon(event) || !CHIP_REMOVE_KEYS.has(event.key))
      return;
    event.preventDefault();
    event.stopPropagation();
    this.removeChipAndRestoreFocus(
      item,
      event.currentTarget as HTMLElement,
      event
    );
  }

  removeSelected(item: DropdownItem, event?: Event): void {
    event?.stopPropagation();
    const current = this.dropdownSelectedItems();
    if (!this.canRemoveSelection(current.length)) return;

    const updated = current.filter(
      (selected) => !this.sameOption(selected, item)
    );
    if (updated.length !== current.length) this.emitSelection(updated);
  }

  handleChipEvents(item: DropdownItem): void {
    this.removeSelected(item);
  }

  private runAfterRender(callback: () => void): void {
    afterNextRender(callback, { injector: this.injector });
  }

  private emitSelection(items: DropdownItem[]): void {
    this.dropdownSelectedItems.set(items);
    this.selected.emit(items);
    this.valueChange.emit(this.getEmittedValue(items));
  }

  private canRemoveSelection(
    count = this.dropdownSelectedItems().length
  ): boolean {
    return !this.disabled() && !(this.required() && count <= 1);
  }

  private clearSelection(): void {
    if (this.canRemoveSelection(0)) this.emitSelection([]);
  }

  private closeAndFocusTrigger(): void {
    this.closeDropdown();
    this.selectTrigger()?.nativeElement.focus();
  }

  private openDropdown(preferLastOption = false): void {
    this.showDropdown.set(true);
    const initialIndex = this.getInitialActiveOptionIndex(preferLastOption);
    this.activeOptionIndex.set(initialIndex);
    this.scrollToActiveOption(initialIndex);
  }

  private getEnabledOptionIndices(): number[] {
    return this.dropdownOptions().reduce<number[]>(
      (acc, opt, idx) => (!opt.disabled ? [...acc, idx] : acc),
      []
    );
  }

  private focusFirstEnabledOption(): void {
    const firstIndex = this.getEnabledOptionIndices()[0];
    if (firstIndex !== undefined) {
      this.activeOptionIndex.set(firstIndex);
      this.focusOption(firstIndex);
    }
  }

  private focusActiveOption(): void {
    const index = this.activeOptionIndex();
    if (index !== null) this.focusOption(index);
  }

  private focusOption(index: number): void {
    document.getElementById(this.getOptionId(index))?.focus();
  }

  private isClearButtonAvailable(): boolean {
    return (
      this.isMultiple() &&
      this.dropdownSelectedItems().length > 0 &&
      !this.required()
    );
  }

  private scrollToActiveOption(index: number | null): void {
    if (index === null) return;
    requestAnimationFrame(() =>
      document
        .getElementById(this.getOptionId(index))
        ?.scrollIntoView?.({ block: 'nearest' })
    );
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
    if (!trigger || !panels.length) return;

    const triggerRect = trigger.getBoundingClientRect();
    const distance = (rect: DOMRect) =>
      Math.abs(rect.left - triggerRect.left) +
      Math.min(
        Math.abs(rect.top - triggerRect.bottom),
        Math.abs(rect.bottom - triggerRect.top)
      );

    const panel = panels.reduce((best, curr) =>
      distance(curr.getBoundingClientRect()) <
      distance(best.getBoundingClientRect())
        ? curr
        : best
    );

    this.dropdownPanel = panel;
    panel.setAttribute('data-select-field-id', this.instanceId);
    if (triggerRect.width > 0) panel.style.width = `${triggerRect.width}px`;

    const listbox = panel.querySelector<HTMLElement>('.options-list');
    if (listbox) {
      listbox.id = this.listboxId;
      listbox.setAttribute('role', 'listbox');
      this.isMultiple()
        ? listbox.setAttribute('aria-multiselectable', 'true')
        : listbox.removeAttribute('aria-multiselectable');
    }

    const options = this.dropdownOptions();
    panel
      .querySelectorAll<HTMLElement>('.ion-dropdown-item')
      .forEach((el, index) => {
        const option = options[index];
        if (!option) return;

        el.id = this.getOptionId(index);
        el.setAttribute('role', 'option');
        el.setAttribute('aria-selected', String(!!option.selected));
        el.setAttribute('aria-disabled', String(!!option.disabled));
        el.setAttribute('tabindex', option.disabled ? '-1' : '0');
        el.setAttribute('data-select-field-option', String(index));
        el.classList.toggle(
          'dropdown-item-active',
          this.activeOptionIndex() === index
        );
      });

    const clearButton = panel.querySelector<HTMLElement>('.clear-button');
    if (clearButton) clearButton.id = `${this.listboxId}-clear`;
  }

  private getInitialActiveOptionIndex(
    preferLastOption: boolean
  ): number | null {
    const enabledIndices = this.getEnabledOptionIndices();
    if (!enabledIndices.length) return null;

    const options = this.dropdownOptions();
    const selectedIndex = enabledIndices.find((idx) => options[idx].selected);
    return (
      selectedIndex ??
      enabledIndices[preferLastOption ? enabledIndices.length - 1 : 0]
    );
  }

  private moveActiveOption(direction: 1 | -1): void {
    const enabledIndices = this.getEnabledOptionIndices();
    if (!enabledIndices.length) {
      this.activeOptionIndex.set(null);
      return;
    }

    const currentPos = enabledIndices.indexOf(this.activeOptionIndex() ?? -1);
    const nextPos =
      currentPos < 0
        ? direction === 1
          ? 0
          : enabledIndices.length - 1
        : (currentPos + direction + enabledIndices.length) %
          enabledIndices.length;

    const newIndex = enabledIndices[nextPos];
    this.activeOptionIndex.set(newIndex);
    this.scrollToActiveOption(newIndex);
  }

  private getChipCloseIcon(event: Event): Element | null {
    const icon =
      event.target instanceof Element ? event.target.closest('ion-icon') : null;
    return icon && icon.closest('ion-chip') === event.currentTarget
      ? icon
      : null;
  }

  private removeChipAndRestoreFocus(
    item: DropdownItem,
    chip: HTMLElement,
    event: Event
  ): void {
    const trigger = this.selectTrigger()?.nativeElement;
    const chips = Array.from(
      trigger?.querySelectorAll<HTMLElement>('.selected-value ion-chip') ?? []
    );
    const chipIndex = chips.indexOf(chip);
    const previousCount = this.dropdownSelectedItems().length;

    this.removeSelected(item, event);
    if (this.dropdownSelectedItems().length === previousCount) return;

    this.runAfterRender(() => {
      const currentTrigger = this.selectTrigger()?.nativeElement;
      const closeIcons = Array.from(
        currentTrigger?.querySelectorAll<HTMLElement>(
          '.selected-value ion-chip ion-icon'
        ) ?? []
      );
      (
        closeIcons[Math.min(chipIndex, closeIcons.length - 1)] ?? currentTrigger
      )?.focus();
    });
  }

  private syncChipAccessibility(): void {
    const trigger = this.selectTrigger()?.nativeElement;
    if (!trigger) return;

    const items = this.visibleItems();
    trigger
      .querySelectorAll<HTMLElement>('.selected-value ion-chip')
      .forEach((chip, index) => {
        const button = chip.querySelector<HTMLButtonElement>('button.ion-chip');
        const icon = button?.querySelector<HTMLElement>('ion-icon');
        if (!button || !icon || !items[index]) return;

        button.setAttribute('tabindex', '-1');
        icon.setAttribute('tabindex', this.disabled() ? '-1' : '0');
        icon.setAttribute('role', 'button');
        icon.setAttribute(
          'aria-label',
          `Remover ${this.getOptionLabel(items[index])}`
        );
        icon.setAttribute('aria-disabled', String(!this.canRemoveSelection()));
      });
  }

  private getEmittedValue(items: DropdownItem[]): any {
    if (this.returnFullObject()) {
      return this.isMultiple() ? items : items[0] || null;
    }
    const values = items.map((item) => this.getOptionValue(item));
    return this.isMultiple() ? values : (values[0] ?? null);
  }

  private getOptionValue(item: DropdownItem): unknown {
    return Reflect.get(item, this.propValue());
  }

  private sameOption(first: DropdownItem, second: DropdownItem): boolean {
    const [firstValue, secondValue] = [
      this.getOptionValue(first),
      this.getOptionValue(second),
    ];
    return firstValue === undefined && secondValue === undefined
      ? this.getOptionLabel(first) === this.getOptionLabel(second)
      : Object.is(firstValue, secondValue);
  }

  private optionMatchesValue(option: DropdownItem, value: unknown): boolean {
    const isObj = value !== null && typeof value === 'object';
    const valueToCompare = isObj ? Reflect.get(value, this.propValue()) : value;

    if (valueToCompare === undefined && isObj) {
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
    if (!trigger || typeof ResizeObserver === 'undefined') return;

    this.resizeObserver = new ResizeObserver(() => this.updateVisibleCount());
    this.resizeObserver.observe(trigger);
    this.destroyRef.onDestroy(() => this.resizeObserver?.disconnect());
  }

  private updateVisibleCount(): void {
    const items = this.dropdownSelectedItems();
    const trigger = this.selectTrigger()?.nativeElement;
    const measurement = this.measurementContainer()?.nativeElement;
    const selectedValue =
      trigger?.querySelector<HTMLElement>('.selected-value');

    if (
      !this.isMultiple() ||
      !items.length ||
      !trigger ||
      !selectedValue ||
      !measurement
    ) {
      this.visibleCount.set(null);
      return;
    }

    const availableWidth = selectedValue.getBoundingClientRect().width;
    const chipWidths = Array.from(
      measurement.querySelectorAll<HTMLElement>('ion-chip')
    ).map((el) => el.getBoundingClientRect().width);

    if (
      availableWidth <= 0 ||
      !chipWidths.length ||
      chipWidths.every((w) => w === 0)
    ) {
      this.visibleCount.set(null);
      return;
    }

    const counterMeasure = measurement.querySelector<HTMLElement>(
      '.overflow-counter-measure'
    );
    const getCounterWidth = (hiddenCount: number): number => {
      if (!counterMeasure) return 30;
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