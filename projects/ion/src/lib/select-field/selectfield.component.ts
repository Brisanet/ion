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
import { NgStyle } from '@angular/common';
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

export const ION_SELECT_THEME_VARIABLES: Record<
  IonSelectTheme,
  Record<string, string>
> = {
  light: {
    '--ion-primary-1': '#ebf3fe',
    '--ion-primary-2': '#b5d2fc',
    '--ion-primary-3': '#84b4fa',
    '--ion-primary-4': '#5396f8',
    '--ion-primary-5': '#146ff5',
    '--ion-primary-6': '#0858ce',
    '--ion-primary-7': '#06439d',
    '--ion-primary-8': '#042a62',
    '--ion-neutral-1': '#fcfcfd',
    '--ion-neutral-2': '#f2f3f5',
    '--ion-neutral-3': '#e4e6eb',
    '--ion-neutral-4': '#ced2db',
    '--ion-neutral-5': '#aeb2bd',
    '--ion-neutral-6': '#8d93a5',
    '--ion-neutral-7': '#505566',
    '--ion-neutral-8': '#282b33',
    '--ion-negative-5': '#de5462',
    '--ion-negative-6': '#d6293a',
    '--ion-positive-5': '#35bb83',
    '--ion-positive-6': '#2d9f70',
    '--ion-select-background-color': '#fcfcfd',
    '--ion-select-border-radius': '8px',
    '--ion-select-border-color': '#aeb2bd',
    '--ion-select-placeholder-color': '#aeb2bd',
    '--ion-select-text-color': '#505566',
    '--ion-select-supporting-text-color': '#505566',
    '--ion-select-hover-border-color': '#126aeb',
    '--ion-select-focus-color': '#146ff5',
    '--ion-select-focus-surface': '#fcfcfd',
    '--ion-select-disabled-border-color': '#e1e3e8',
    '--ion-select-error-color': '#d6293a',
    '--ion-select-success-color': '#2d9f70',
    '--ion-select-tag-background': '#f2f3f5',
    '--ion-select-tag-text-color': '#505566',
    '--ion-select-tag-border-radius': '8px',
    '--ion-select-menu-background-color': '#fcfcfd',
    '--ion-select-menu-border-color': '#e4e6eb',
    '--ion-select-menu-shadow':
      '0px 8px 6px -4px rgba(0, 0, 0, 0.15), 0 0 2px rgba(0, 0, 0, 0.15)',
    '--ion-select-menu-item-text-color': '#505566',
    '--ion-select-menu-item-hover-background-color': '#ebf3fe',
    '--ion-select-menu-item-selected-background-color': '#ebf3fe',
    '--ion-select-menu-item-selected-text-color': '#0858ce',
    '--ion-select-menu-item-disabled-text-color': '#aeb2bd',
  },
  dark: {
    '--ion-primary-1': '#e8f2ff',
    '--ion-primary-2': '#d5e7ff',
    '--ion-primary-3': '#b3d1ff',
    '--ion-primary-4': '#5681ff',
    '--ion-primary-5': '#2f53ff',
    '--ion-primary-6': '#1d2cde',
    '--ion-primary-7': '#0616cd',
    '--ion-primary-8': '#0a115c',
    '--ion-neutral-1': '#fcfcfd',
    '--ion-neutral-2': '#ced2db',
    '--ion-neutral-3': '#8d93a5',
    '--ion-neutral-4': '#383838',
    '--ion-neutral-5': '#2e2e2e',
    '--ion-neutral-6': '#222222',
    '--ion-neutral-7': '#1e1e1e',
    '--ion-neutral-8': '#121212',
    '--ion-negative-5': '#de5462',
    '--ion-negative-6': '#d6293a',
    '--ion-positive-5': '#0dca4b',
    '--ion-positive-6': '#00ac39',
    '--ion-select-background-color': '#2e2e2e',
    '--ion-select-border-radius': '8px',
    '--ion-select-border-color': '#8d93a5',
    '--ion-select-placeholder-color': '#fcfcfd',
    '--ion-select-text-color': '#fcfcfd',
    '--ion-select-supporting-text-color': '#ced2db',
    '--ion-select-hover-border-color': '#5681ff',
    '--ion-select-focus-color': '#5681ff',
    '--ion-select-focus-surface': '#2e2e2e',
    '--ion-select-disabled-border-color': '#383838',
    '--ion-select-error-color': '#d6293a',
    '--ion-select-success-color': '#00ac39',
    '--ion-select-tag-background': '#222222',
    '--ion-select-tag-text-color': '#fcfcfd',
    '--ion-select-tag-border-radius': '8px',
    '--ion-select-menu-background-color': '#2e2e2e',
    '--ion-select-menu-border-color': '#8d93a5',
    '--ion-select-menu-shadow':
      '0px 8px 6px -4px rgba(0, 0, 0, 0.35), 0 0 2px rgba(0, 0, 0, 0.3)',
    '--ion-select-menu-item-text-color': '#fcfcfd',
    '--ion-select-menu-item-hover-background-color': '#222222',
    '--ion-select-menu-item-selected-background-color': '#222222',
    '--ion-select-menu-item-selected-text-color': '#fcfcfd',
    '--ion-select-menu-item-disabled-text-color': '#8d93a5',
  },
  'orange-light': {
    '--ion-primary-1': '#fff1eb',
    '--ion-primary-2': '#ffd7c7',
    '--ion-primary-3': '#ffb49d',
    '--ion-primary-4': '#ff8a67',
    '--ion-primary-5': '#fe6c3b',
    '--ion-primary-6': '#fe5513',
    '--ion-primary-7': '#d6470f',
    '--ion-primary-8': '#a5370c',
    '--ion-neutral-1': '#fcfcfd',
    '--ion-neutral-2': '#f2f3f5',
    '--ion-neutral-3': '#e4e6eb',
    '--ion-neutral-4': '#ced2db',
    '--ion-neutral-5': '#aeb2bd',
    '--ion-neutral-6': '#8d93a5',
    '--ion-neutral-7': '#505566',
    '--ion-neutral-8': '#282b33',
    '--ion-negative-5': '#de5462',
    '--ion-negative-6': '#d6293a',
    '--ion-positive-5': '#35bb83',
    '--ion-positive-6': '#2d9f70',
    '--ion-select-background-color': '#fcfcfd',
    '--ion-select-border-radius': '8px',
    '--ion-select-border-color': '#aeb2bd',
    '--ion-select-placeholder-color': '#aeb2bd',
    '--ion-select-text-color': '#505566',
    '--ion-select-supporting-text-color': '#505566',
    '--ion-select-hover-border-color': '#fa9c74',
    '--ion-select-focus-color': '#fa9c74',
    '--ion-select-focus-surface': '#fcfcfd',
    '--ion-select-disabled-border-color': '#e1e3e8',
    '--ion-select-error-color': '#d6293a',
    '--ion-select-success-color': '#2d9f70',
    '--ion-select-tag-background': '#f2f3f5',
    '--ion-select-tag-text-color': '#505566',
    '--ion-select-tag-border-radius': '8px',
    '--ion-select-menu-background-color': '#fcfcfd',
    '--ion-select-menu-border-color': '#e4e6eb',
    '--ion-select-menu-shadow':
      '0px 8px 6px -4px rgba(0, 0, 0, 0.15), 0 0 2px rgba(0, 0, 0, 0.15)',
    '--ion-select-menu-item-text-color': '#505566',
    '--ion-select-menu-item-hover-background-color': '#fff1eb',
    '--ion-select-menu-item-selected-background-color': '#fff1eb',
    '--ion-select-menu-item-selected-text-color': '#fe5513',
    '--ion-select-menu-item-disabled-text-color': '#aeb2bd',
  },
  'orange-dark': {
    '--ion-primary-1': '#2a130b',
    '--ion-primary-2': '#441d11',
    '--ion-primary-3': '#6c2d19',
    '--ion-primary-4': '#944026',
    '--ion-primary-5': '#b54e2f',
    '--ion-primary-6': '#fe5513',
    '--ion-primary-7': '#ff7a47',
    '--ion-primary-8': '#ffb79a',
    '--ion-neutral-1': '#1b1c20',
    '--ion-neutral-2': '#26282d',
    '--ion-neutral-3': '#3b3d43',
    '--ion-neutral-4': '#52555d',
    '--ion-neutral-5': '#72757f',
    '--ion-neutral-6': '#9c9fa9',
    '--ion-neutral-7': '#c4c7d2',
    '--ion-neutral-8': '#e9eaf0',
    '--ion-negative-5': '#e25c5e',
    '--ion-negative-6': '#f57b7d',
    '--ion-positive-5': '#4baf86',
    '--ion-positive-6': '#5bcf9f',
    '--ion-select-background-color': '#26282d',
    '--ion-select-border-radius': '8px',
    '--ion-select-border-color': '#52555d',
    '--ion-select-placeholder-color': '#9c9fa9',
    '--ion-select-text-color': '#e9eaf0',
    '--ion-select-supporting-text-color': '#c4c7d2',
    '--ion-select-hover-border-color': '#fe5513',
    '--ion-select-focus-color': '#fe5513',
    '--ion-select-focus-surface': '#26282d',
    '--ion-select-disabled-border-color': '#52555d',
    '--ion-select-error-color': '#f57b7d',
    '--ion-select-success-color': '#5bcf9f',
    '--ion-select-tag-background': '#3b3d43',
    '--ion-select-tag-text-color': '#e9eaf0',
    '--ion-select-tag-border-radius': '8px',
    '--ion-select-menu-background-color': '#26282d',
    '--ion-select-menu-border-color': '#52555d',
    '--ion-select-menu-shadow':
      '0px 8px 6px -4px rgba(0, 0, 0, 0.35), 0 0 2px rgba(0, 0, 0, 0.3)',
    '--ion-select-menu-item-text-color': '#e9eaf0',
    '--ion-select-menu-item-hover-background-color': '#441d11',
    '--ion-select-menu-item-selected-background-color': '#441d11',
    '--ion-select-menu-item-selected-text-color': '#ff7a47',
    '--ion-select-menu-item-disabled-text-color': '#9c9fa9',
  },
};

@Component({
  selector: 'ion-select-field',
  standalone: true,
  imports: [
    NgStyle,
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
  themeStyles = computed(() => {
    const theme = this.theme();
    return theme ? ION_SELECT_THEME_VARIABLES[theme] : null;
  });

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
    if (!trigger || !measurement || !trigger.clientWidth) {
      this.visibleCount.set(null);
      return;
    }

    const iconWidth =
      trigger.querySelector('.select-chevron')?.getBoundingClientRect().width ??
      20;
    const styles = getComputedStyle(trigger);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const availableWidth =
      trigger.clientWidth - iconWidth - CHIP_GAP - paddingLeft - paddingRight;
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
