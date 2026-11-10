import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';

import { IonIconComponent } from '../icon/icon.component';
import { IonNoDataComponent } from '../no-data/no-data.component';
import { IonSpinnerComponent } from '../spinner/spinner.component';
import { DropdownItem, DropdownParams } from '../core/types/dropdown';
import { calculateVisibleChipCount } from './calculate-visible-chip-count';

const CHIP_GAP = 8;

export type IonSelectType = 'single' | 'multi';
export type IonSelectSize = 'base' | 'large';
export type IonSelectStatus = 'default' | 'error' | 'success';
export type IonSelectTheme = 'light' | 'dark' | 'orange-light' | 'orange-dark';

@Component({
  selector: 'ion-select-field',
  standalone: true,
  imports: [
    OverlayModule,
    IonIconComponent,
    IonNoDataComponent,
    IonSpinnerComponent,
  ],
  templateUrl: './selectfield.component.html',
  styleUrls: ['./selectfield.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonSelectFieldComponent {
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
  enableSearch = input<boolean>(false);
  searchOptions = input<DropdownParams['searchOptions']>();
  propLabel = input<string>('label');
  propValue = input<string>('key');
  loading = input<boolean>(false);
  value = input<any>(undefined);
  returnFullObject = input<boolean>(false);

  selected = output<DropdownItem[]>();
  search = output<string>();
  valueChange = output<any>();

  showDropdown = signal(false);
  dropdownSelectedItems = signal<DropdownItem[]>([]);
  visibleCount = signal<number | null>(null);

  selectTrigger = viewChild<ElementRef<HTMLElement>>('selectTrigger');
  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  measurementContainer =
    viewChild<ElementRef<HTMLElement>>('measurementContainer');

  isMultiple = computed(
    () => this.type() === 'multi' || (this.type() === undefined && this.multiple())
  );
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
  private resizeObserver: ResizeObserver | null = null;
  readonly overlayWidth = signal<number | null>(null);
  readonly dropdownPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 4,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -4,
    },
  ];

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

      this.dropdownSelectedItems.set(nextSelection);
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
      const inputElement = this.searchInput();
      if (inputElement && this.enableSearch()) {
        inputElement.nativeElement.focus();
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

    if (!this.showDropdown()) {
      const width =
        this.selectTrigger()?.nativeElement.getBoundingClientRect().width ?? 0;
      this.overlayWidth.set(width || null);
    }
    this.showDropdown.update((show) => !show);
  }

  handleTriggerKeydown(event: KeyboardEvent): void {
    const target = event.target;
    if (
      this.disabled() ||
      (target instanceof HTMLElement &&
        (target.closest('.action-slot') || target.closest('.tag-remove')))
    ) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleDropdown();
      if (event.key === ' ') {
        event.preventDefault();
      }
    }
  }

  handleOptionKeydown(event: KeyboardEvent, option: DropdownItem): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectOption(option);
    }
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
      this.showDropdown.set(false);
    }
  }

  selectOption(option: DropdownItem): void {
    if (option.disabled || this.disabled()) {
      return;
    }

    const selectedOption =
      this.options().find((item) => this.sameOption(item, option)) ?? option;
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
  }

  clearSelection(event: Event): void {
    event.stopPropagation();
    if (this.disabled() || this.required()) {
      return;
    }

    this.dropdownSelectedItems.set([]);
    this.selected.emit([]);
    this.valueChange.emit(this.isMultiple() ? [] : null);
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

  handleSearch(value: string): void {
    this.search.emit(value);
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
      measurement.querySelectorAll<HTMLElement>('.select-tag')
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
