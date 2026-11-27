import {
  Component,
  input,
  output,
  signal,
  computed,
  inject,
  effect,
  untracked,
  viewChild,
  afterNextRender,
  DestroyRef,
  ChangeDetectionStrategy,
  ElementRef,
  Injector,
} from '@angular/core';

import { IonIconComponent } from '../icon/icon.component';
import { IonDropdownComponent } from '../dropdown/dropdown.component';
import { DropdownItem, DropdownParams } from '../core/types/dropdown';
import { IonSelectSize } from '../core/types/select';
import { IonChipComponent } from '../chip/chip.component';
import { calculateVisibleChipCount } from './calculate-visible-chip-count';

const CHIP_GAP = 8;
const CHIP_REMOVE_KEYS = new Set(['Backspace', 'Delete', 'Enter', ' ', 'Spacebar']);
const getProp = (target: unknown, key: string): unknown =>
  target !== null && typeof target === 'object'
    ? (target as Record<string, unknown>)[key]
    : undefined;

@Component({
  selector: 'ion-select',
  standalone: true,
  imports: [IonIconComponent, IonDropdownComponent, IonChipComponent],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'handleOverlayKeydown($event)',
    '(document:focusin)': 'handleOverlayFocusIn($event)',
  },
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
  size = input<IonSelectSize>('base');
  label = input<string>('');
  supportingText = input<string>('');
  required = input<boolean>(false);
  disabled = input<boolean>(false);
  invalid = input<boolean>(false);
  valid = input<boolean>(false);
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
  activeOptionIndex = signal<number | null>(null);
  dropdownSelectedItems = signal<DropdownItem[]>([]);
  searchTerm = signal('');
  visibleCount = signal<number | null>(null);

  selectTrigger = viewChild<ElementRef<HTMLElement>>('selectTrigger');
  measurementContainer = viewChild<ElementRef<HTMLElement>>('measurementContainer');
  isError = computed(() => Boolean(this.invalid()));
  isSuccess = computed(() => Boolean(this.valid()));
  hasNoOptions = computed(() => !this.loading() && this.dropdownOptions().length === 0);

  activeDescendantId = computed(() => {
    const index = this.activeOptionIndex();
    const option = index === null ? undefined : this.dropdownOptions()[index];
    return this.showDropdown() &&
      !this.loading() &&
      index !== null &&
      option &&
      !option.disabled
      ? `${this.listboxId}-option-${index}`
      : null;
  });

  accessibilityAnnouncement = computed(() => {
    const count = this.dropdownOptions().length;
    const selectedLabel = this.getSelectedLabel();
    const optionsMessage = count
      ? `${count} ${count === 1 ? 'opção disponível' : 'opções disponíveis'}.`
      : 'Nenhuma opção disponível.';
    const selectionMessage = selectedLabel
      ? `${this.multiple() ? 'Selecionados' : 'Selecionado'}: ${selectedLabel}.`
      : 'Nenhuma opção selecionada.';

    return this.showDropdown()
      ? `${optionsMessage} ${selectionMessage}`
      : selectionMessage;
  });

  visibleItems = computed(() => {
    const items = this.dropdownSelectedItems();
    const count = this.visibleCount();

    if (!this.multiple() || count === null || count >= items.length) {
      return items;
    }

    return items.slice(0, count);
  });

  overflowCount = computed(() => {
    if (!this.multiple()) {
      return 0;
    }

    const items = this.dropdownSelectedItems();
    return Math.max(0, items.length - this.visibleItems().length);
  });

  dropdownOptions = computed(() => {
    const selectedItems = this.dropdownSelectedItems();
    const searchTerm = this.enableSearch()
      ? this.searchTerm().trim().toLowerCase()
      : '';
    return this.options()
      .map((option) => ({
        ...option,
        selected: selectedItems.some((s) => this.sameOption(s, option)),
      }))
      .filter(
        (option) =>
          !searchTerm ||
          this.getOptionLabel(option).toLowerCase().includes(searchTerm)
      );
  });

  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);
  private resizeObserver: ResizeObserver | null = null;
  private dropdownPanel: HTMLElement | null = null;
  private clearButtonActivated = false;

  constructor() {
    effect(
      () => {
        const options = this.options();
        const value = this.value();

        if (value !== undefined) {
          let selected: DropdownItem[] = [];
          if (value !== null && value !== '') {
            const valueArray = Array.isArray(value) ? value : [value];
            const matches = (item: DropdownItem) =>
              valueArray.some((val) => this.optionMatchesValue(item, val));

            const presentSelected = options.filter(matches);
            const currentSelected = untracked(() =>
              this.dropdownSelectedItems()
            );
            const preservedSelected = currentSelected.filter(
              (item: DropdownItem) =>
                !options.some((opt) => this.sameOption(opt, item)) &&
                matches(item)
            );

            selected = [...presentSelected, ...preservedSelected];
          }
          this.dropdownSelectedItems.set(selected);
        } else {
          const selected = options.filter((option) => option.selected);
          const currentSelected = untracked(() =>
            this.dropdownSelectedItems()
          );

          if (
            selected.length !== currentSelected.length ||
            !selected.every((s) =>
              currentSelected.some((cs: DropdownItem) => this.sameOption(cs, s))
            )
          ) {
            this.dropdownSelectedItems.set(
              this.multiple() ? selected : selected.slice(0, 1)
            );
          }
        }
      },
      { allowSignalWrites: true }
    );

    effect(() => {
      this.dropdownSelectedItems();
      this.multiple();
      this.visibleItems();
      this.disabled();
      this.required();
      untracked(() => {
        queueMicrotask(() => {
          this.updateVisibleCount();
          this.syncChipAccessibility();
        });
      });
    });

    effect(
      () => {
        if (this.disabled()) {
          this.closeDropdown();
        }
      },
      { allowSignalWrites: true }
    );

    effect(() => {
      this.dropdownOptions();
      this.activeOptionIndex();
      this.loading();
      if (this.showDropdown()) {
        untracked(() =>
          afterNextRender(() => this.syncDropdownAccessibility(), {
            injector: this.injector,
          })
        );
      }
    });

    afterNextRender(() => {
      this.setupResizeObserver();
      this.updateVisibleCount();
    });
  }

  toggleDropdown(): void {
    if (this.disabled()) {
      return;
    }
    if (this.showDropdown()) {
      this.closeDropdown();
      return;
    }
    this.showDropdown.set(true);
  }

  handleTriggerKeydown(event: KeyboardEvent): void {
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
      case 'ArrowUp': {
        event.preventDefault();
        if (!this.showDropdown()) {
          this.showDropdown.set(true);
          this.setInitialActiveOption(event.key === 'ArrowUp');
          break;
        }
        const enabled = this.getEnabledOptionIndices();
        const isDown = event.key === 'ArrowDown';
        const atBoundary =
          !enabled.length ||
          this.activeOptionIndex() ===
            enabled[isDown ? enabled.length - 1 : 0];
        const clearBtn =
          this.dropdownPanel?.querySelector<HTMLElement>('.clear-button');
        const searchInput = this.dropdownPanel?.querySelector<HTMLElement>('input');
        const canClear =
          this.multiple() &&
          this.dropdownSelectedItems().length > 0 && !this.required() && !!clearBtn;

        if (atBoundary) {
          const target = isDown
            ? canClear
              ? clearBtn
              : searchInput
            : searchInput ?? (canClear ? clearBtn : null);
          if (target) {
            this.activeOptionIndex.set(null);
            target.focus();
            break;
          }
        }
        this.moveActiveOption(isDown ? 1 : -1);
        break;
      }
      case 'Enter': {
        event.preventDefault();
        if (!this.showDropdown()) {
          this.showDropdown.set(true);
          this.setInitialActiveOption(false);
        } else {
          const index = this.activeOptionIndex();
          const option =
            index === null ? undefined : this.dropdownOptions()[index];
          if (option) this.selectOption(option);
        }
        break;
      }
      case ' ':
        event.preventDefault();
        if (!this.showDropdown()) {
          this.showDropdown.set(true);
          this.setInitialActiveOption(false);
        } else {
          const index = this.activeOptionIndex();
          const option =
            index === null ? undefined : this.dropdownOptions()[index];
          if (option) this.selectOption(option);
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

  handleOverlayKeydown(event: KeyboardEvent): void {
    const target = event.target;
    if (
      !this.showDropdown() ||
      !(target instanceof HTMLElement) ||
      !this.dropdownPanel?.contains(target)
    ) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeDropdown();
      this.selectTrigger()?.nativeElement.focus();
      return;
    }

    const isClear = target.classList.contains('clear-button');
    const isInput = target.tagName === 'INPUT';
    if ((!isClear && !isInput) || !['ArrowDown', 'ArrowUp'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const isDown = event.key === 'ArrowDown';
    const enabled = this.getEnabledOptionIndices();
    const nextControl = isClear
      ? this.dropdownPanel.querySelector<HTMLElement>('input')
      : this.multiple() && this.dropdownSelectedItems().length > 0 && !this.required()
        ? this.dropdownPanel.querySelector<HTMLElement>('.clear-button')
        : null;

    if (nextControl && (!enabled.length || isClear === isDown)) {
      this.activeOptionIndex.set(null);
      nextControl.focus();
      return;
    }

    if (!enabled.length) return;

    this.selectTrigger()?.nativeElement.focus();
    const idx = enabled[isDown ? 0 : enabled.length - 1];
    this.activeOptionIndex.set(idx);
    requestAnimationFrame(() =>
      document
        .getElementById(`${this.listboxId}-option-${idx}`)
        ?.scrollIntoView?.({ block: 'nearest' })
    );
  }
  
  handleOverlayFocusIn(event: FocusEvent): void {
    const target = event.target;
    if (
      this.showDropdown() &&
      target instanceof HTMLElement &&
      this.dropdownPanel?.contains(target) &&
      (target.tagName === 'INPUT' || target.classList.contains('clear-button'))
    ) {
      this.activeOptionIndex.set(null);
    }
  }

  handleSelect(selectedItems: DropdownItem[]): void {
    const options = this.options();
    const currentSelected = this.dropdownSelectedItems();
    let finalSelected = selectedItems.map(
      (item) => options.find((opt) => this.sameOption(opt, item)) ?? item
    );

    if (this.multiple()) {
      const itemsNotInOptions = currentSelected.filter(
        (item) => !options.some((opt) => this.sameOption(opt, item))
      );
      finalSelected = [...itemsNotInOptions, ...finalSelected];
    }

    this.emitSelection(finalSelected);

    if (!this.multiple()) {
      this.closeDropdown();
    }
  }

  handleDropdownSelection(selectedItems: DropdownItem[]): void {
    if (this.multiple() && selectedItems.length === 0) {
      queueMicrotask(() => {
        if (!this.clearButtonActivated) {
          const visibleOptions = this.dropdownOptions();
          const hiddenSelectedItems = this.dropdownSelectedItems().filter(
            (item) =>
              !visibleOptions.some((option) => this.sameOption(item, option))
          );
          this.handleSelect(hiddenSelectedItems);
        }
        this.clearButtonActivated = false;
      });
      return;
    }
    if (this.multiple()) {
      const visibleOptions = this.dropdownOptions();
      const hiddenSelectedItems = this.dropdownSelectedItems().filter(
        (item) => !visibleOptions.some((option) => this.sameOption(item, option))
      );
      this.handleSelect([...hiddenSelectedItems, ...selectedItems]);
      return;
    }
    this.handleSelect(selectedItems);
  }

  handleClearButton(): void {
    this.clearButtonActivated = true;
    if (!this.disabled() && !this.required()) {
      this.emitSelection([]);
      this.selectTrigger()?.nativeElement.focus();
    }
    queueMicrotask(() => (this.clearButtonActivated = false));
  }

  selectOption(option: DropdownItem): void {
    if (option.disabled || this.disabled()) return;

    const current = this.dropdownSelectedItems();
    const isSelected = current.some((item) => this.sameOption(item, option));

    if (this.multiple()) {
      if (isSelected && this.required() && current.length === 1) return;
      this.handleSelect(
        isSelected
          ? current.filter((item) => !this.sameOption(item, option))
          : [...current, option]
      );
      return;
    }

    if (isSelected) {
      if (!this.required()) this.handleSelect([]);
      return;
    }
    this.handleSelect([option]);
  }

  closeDropdown(): void {
    this.showDropdown.set(false);
    this.activeOptionIndex.set(null);
    this.searchTerm.set('');
    this.dropdownPanel = null;
  }

  getSelectedLabel(): string {
    const selected = this.dropdownSelectedItems();
    if (selected.length === 0) {
      return '';
    }

    if (this.multiple()) {
      return selected.map((item) => this.getOptionLabel(item)).join(', ');
    }

    return this.getOptionLabel(selected[0]);
  }

  getOptionLabel(item: DropdownItem): string {
    return String(getProp(item, this.propLabel()) || item?.label || '');
  }

  onChipClick(event: MouseEvent, item: DropdownItem): void {
    if (this.getChipCloseIcon(event)) {
      event.stopPropagation();
      this.removeChipAndRestoreFocus(item, event.currentTarget as HTMLElement);
    }
  }

  onChipKeydown(event: KeyboardEvent, item: DropdownItem): void {
    if (!this.getChipCloseIcon(event)) {
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      if (this.showDropdown()) {
        this.closeDropdown();
      }
      this.selectTrigger()?.nativeElement.focus();
      return;
    }
    if (!CHIP_REMOVE_KEYS.has(event.key)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.removeChipAndRestoreFocus(item, event.currentTarget as HTMLElement);
  }

  handleChipEvents(item: DropdownItem): void {
    const currentItems = this.dropdownSelectedItems();
    if (this.disabled() || (this.required() && currentItems.length <= 1)) {
      return;
    }

    const updatedItems = currentItems.filter((i) => !this.sameOption(i, item));
    if (updatedItems.length !== currentItems.length) {
      this.emitSelection(updatedItems);
    }
  }

  handleSearch(value: string): void {
    this.searchTerm.set(value);
    this.activeOptionIndex.set(null);
    this.search.emit(value);
  }

  private emitSelection(finalSelected: DropdownItem[]): void {
    const prop = this.propValue();
    this.dropdownSelectedItems.set(finalSelected);
    this.selected.emit(finalSelected);

    const emitValue = this.returnFullObject()
      ? this.multiple()
        ? finalSelected
        : finalSelected[0] || null
      : this.multiple()
        ? finalSelected.map((item) => getProp(item, prop))
        : finalSelected.length > 0
          ? getProp(finalSelected[0], prop)
          : null;

    this.valueChange.emit(emitValue);
  }

  private sameOption(first: DropdownItem, second: DropdownItem): boolean {
    const prop = this.propValue();
    const firstVal = getProp(first, prop);
    const secondVal = getProp(second, prop);
    return firstVal === undefined && secondVal === undefined
      ? this.getOptionLabel(first) === this.getOptionLabel(second)
      : firstVal === secondVal;
  }

  private optionMatchesValue(option: DropdownItem, val: unknown): boolean {
    const prop = this.propValue();
    const valToCompare =
      val !== null && typeof val === 'object' ? getProp(val, prop) : val;
    return valToCompare !== undefined && getProp(option, prop) === valToCompare;
  }

  private getEnabledOptionIndices(): number[] {
    return this.dropdownOptions().reduce<number[]>(
      (acc, opt, idx) => (!opt.disabled ? [...acc, idx] : acc),
      []
    );
  }

  private setInitialActiveOption(preferLast: boolean): void {
    if (this.enableSearch()) {
      this.activeOptionIndex.set(null);
      afterNextRender(
        () => this.dropdownPanel?.querySelector<HTMLElement>('input')?.focus(),
        { injector: this.injector }
      );
      return;
    }

    const enabled = this.getEnabledOptionIndices();
    if (!enabled.length) {
      this.activeOptionIndex.set(null);
      return;
    }
    const options = this.dropdownOptions();
    const selectedIdx = enabled.find((idx) => options[idx].selected);
    const nextIdx =
      selectedIdx ?? enabled[preferLast ? enabled.length - 1 : 0];
    this.activeOptionIndex.set(nextIdx);
  }

  private moveActiveOption(direction: 1 | -1): void {
    const enabled = this.getEnabledOptionIndices();
    if (!enabled.length) {
      this.activeOptionIndex.set(null);
      return;
    }
    const currentPos = enabled.indexOf(this.activeOptionIndex() ?? -1);
    const nextPos =
      currentPos < 0
        ? direction === 1
          ? 0
          : enabled.length - 1
        : (currentPos + direction + enabled.length) % enabled.length;
    const nextIdx = enabled[nextPos];
    this.activeOptionIndex.set(nextIdx);
    requestAnimationFrame(() =>
      document
        .getElementById(`${this.listboxId}-option-${nextIdx}`)
        ?.scrollIntoView?.({ block: 'nearest' })
    );
  }

  private syncDropdownAccessibility(): void {
    const trigger = this.selectTrigger()?.nativeElement;
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.cdk-overlay-pane .container-options'
      )
    );
    if (!this.showDropdown() || !trigger || !panels.length) {
      this.dropdownPanel = null;
      return;
    }

    const panel =
      panels.find(
        (el) => el.getAttribute('data-select-field-id') === this.instanceId
      ) ?? panels[panels.length - 1];

    this.dropdownPanel = panel;
    panel.setAttribute('data-select-field-id', this.instanceId);

    const triggerWidth = trigger.getBoundingClientRect().width;
    if (triggerWidth > 0) {
      panel.style.width = `${triggerWidth}px`;
    }

    const listbox = panel.querySelector<HTMLElement>('.options-list');
    if (listbox) {
      listbox.id = this.listboxId;
      listbox.setAttribute('role', 'listbox');
      if (this.multiple()) {
        listbox.setAttribute('aria-multiselectable', 'true');
      } else {
        listbox.removeAttribute('aria-multiselectable');
      }
    }

    const options = this.dropdownOptions();
    panel
      .querySelectorAll<HTMLElement>('.ion-dropdown-item')
      .forEach((el, index) => {
        const option = options[index];
        if (!option) return;
        el.id = `${this.listboxId}-option-${index}`;
        el.setAttribute('role', 'option');
        el.setAttribute('aria-selected', String(!!option.selected));
        el.setAttribute('aria-disabled', String(!!option.disabled));
        el.classList.toggle(
          'dropdown-item-active',
          this.activeOptionIndex() === index
        );
        el.classList.toggle(
          'dropdown-item-selected',
          !!option.selected && !option.disabled
        );
      });
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

    if (!this.multiple() || items.length === 0) {
      this.visibleCount.set(null);
      return;
    }

    const trigger = this.selectTrigger()?.nativeElement;
    const measurement = this.measurementContainer()?.nativeElement;
    const selectedValue =
      trigger?.querySelector<HTMLElement>('.selected-value');

    if (!trigger || !measurement || !selectedValue) {
      this.visibleCount.set(null);
      return;
    }

    const availableWidth = selectedValue.getBoundingClientRect().width;
    const chipElements = measurement.querySelectorAll('ion-chip');
    const chipWidths = Array.from(chipElements).map(
      (element) => element.getBoundingClientRect().width
    );

    if (
      availableWidth <= 0 ||
      chipWidths.length === 0 ||
      chipWidths.every((width) => width === 0)
    ) {
      this.visibleCount.set(null);
      return;
    }

    const counterMeasure = measurement.querySelector(
      '.overflow-counter-measure'
    ) as HTMLElement | null;

    const getCounterWidth = (hiddenCount: number): number => {
      if (!counterMeasure) {
        return 30;
      }

      counterMeasure.textContent = `+${hiddenCount}`;
      return counterMeasure.getBoundingClientRect().width;
    };

    const count = calculateVisibleChipCount(
      chipWidths,
      availableWidth,
      CHIP_GAP,
      getCounterWidth
    );
    this.visibleCount.set(count);
  }

  private getChipCloseIcon(event: Event): Element | null {
    const icon =
      event.target instanceof Element ? event.target.closest('ion-icon') : null;
    return icon && icon.closest('ion-chip') === event.currentTarget ? icon : null;
  }

  private removeChipAndRestoreFocus(item: DropdownItem, chip: HTMLElement): void {
    const trigger = this.selectTrigger()?.nativeElement;
    const chips = Array.from(
      trigger?.querySelectorAll<HTMLElement>('.selected-value ion-chip') ?? []
    );
    const chipIndex = chips.indexOf(chip);
    const previousCount = this.dropdownSelectedItems().length;

    this.handleChipEvents(item);
    if (this.dropdownSelectedItems().length === previousCount) return;

    afterNextRender(
      () => {
        const currentTrigger = this.selectTrigger()?.nativeElement;
        const closeIcons = Array.from(
          currentTrigger?.querySelectorAll<HTMLElement>(
            '.selected-value ion-chip ion-icon'
          ) ?? []
        );
        (
          closeIcons[Math.min(chipIndex, closeIcons.length - 1)] ?? currentTrigger
        )?.focus();
      },
      { injector: this.injector }
    );
  }

  private syncChipAccessibility(): void {
    const trigger = this.selectTrigger()?.nativeElement;
    if (!trigger) return;

    const items = this.visibleItems();
    const canRemove =
      !this.disabled() && !(this.required() && this.dropdownSelectedItems().length <= 1);

    trigger
      .querySelectorAll<HTMLElement>('.selected-value ion-chip')
      .forEach((chip, index) => {
        const button = chip.querySelector<HTMLButtonElement>('button.ion-chip');
        const icon = button?.querySelector<HTMLElement>('ion-icon');
        if (!button || !icon || !items[index]) return;

        button.setAttribute('tabindex', '-1');
        button.setAttribute('role', 'none');
        icon.setAttribute('tabindex', this.disabled() ? '-1' : '0');
        icon.setAttribute('role', 'button');
        icon.setAttribute('aria-label', `Remover ${this.getOptionLabel(items[index])}`);
        icon.setAttribute('aria-disabled', String(!canRemove));
      });
  }
}