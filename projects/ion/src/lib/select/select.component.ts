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
} from '@angular/core';

import { IonIconComponent } from '../icon/icon.component';
import { IonDropdownComponent } from '../dropdown/dropdown.component';
import { DropdownItem, DropdownParams } from '../core/types/dropdown';
import { IonChipComponent } from '../chip/chip.component';
import { calculateVisibleChipCount } from './calculate-visible-chip-count';

const CHIP_GAP = 8;

@Component({
  selector: 'ion-select',
  standalone: true,
  imports: [IonIconComponent, IonDropdownComponent, IonChipComponent],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonSelectComponent {
  // Inputs
  placeholder = input<string>('Selecione');
  options = input<DropdownItem[]>([]);
  multiple = input<boolean>(false);
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
  dropdownSelectedItems = signal<DropdownItem[] | any[]>([]);
  visibleCount = signal<number | null>(null);

  selectTrigger = viewChild<ElementRef<HTMLElement>>('selectTrigger');
  measurementContainer =
    viewChild<ElementRef<HTMLElement>>('measurementContainer');

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

  private destroyRef = inject(DestroyRef);
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    effect(
      () => {
        const options = this.options();
        const value = this.value();
        const prop = this.propValue();

        if (value !== undefined) {
          let selected: DropdownItem[] = [];
          if (value !== null && value !== '') {
            const valueArray = Array.isArray(value) ? value : [value];

            const presentSelected = options.filter((opt) =>
              valueArray.some((val) =>
                typeof val === 'object'
                  ? (val as any)[prop] === (opt as any)[prop]
                  : val === (opt as any)[prop]
              )
            );

            const currentSelected = untracked(() =>
              this.dropdownSelectedItems()
            );
            const preservedSelected = currentSelected.filter(
              (item: DropdownItem) => {
                const itemNotInOptions = !options.some(
                  (opt) => (opt as any)[prop] === (item as any)[prop]
                );
                const itemInValue = valueArray.some((val) =>
                  typeof val === 'object'
                    ? (val as any)[prop] === (item as any)[prop]
                    : val === (item as any)[prop]
                );
                return itemNotInOptions && itemInValue;
              }
            );

            selected = [...presentSelected, ...preservedSelected];
          }
          this.dropdownSelectedItems.set(selected);

          options.forEach((opt) => {
            opt.selected = selected.some(
              (s) => (s as any)[prop] === (opt as any)[prop]
            );
          });
        } else {
          const selected = options.filter((option) => option.selected);
          const currentSelected = untracked(() =>
            this.dropdownSelectedItems()
          );

          if (
            selected.length !== currentSelected.length ||
            !selected.every((s) =>
              currentSelected.some(
                (cs: DropdownItem) => (cs as any)[prop] === (s as any)[prop]
              )
            )
          ) {
            this.dropdownSelectedItems.set(selected);
          }
        }
      },
      { allowSignalWrites: true }
    );

    effect(() => {
      this.dropdownSelectedItems();
      this.multiple();
      untracked(() => {
        queueMicrotask(() => this.updateVisibleCount());
      });
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
    this.showDropdown.update((show) => !show);
  }

  handleSelect(selectedItems: DropdownItem[]): void {
    const prop = this.propValue();
    const currentSelected = this.dropdownSelectedItems();
    let finalSelected = selectedItems;

    if (this.multiple()) {
      const options = this.options();
      const itemsNotInOptions = currentSelected.filter(
        (item) =>
          !options.some((opt) => (opt as any)[prop] === (item as any)[prop])
      );
      finalSelected = [...itemsNotInOptions, ...selectedItems];
    }

    this.dropdownSelectedItems.set(finalSelected);
    this.selected.emit(finalSelected);

    const emitValue = this.returnFullObject()
      ? this.multiple()
        ? finalSelected
        : finalSelected[0] || null
      : this.multiple()
        ? finalSelected.map((item) => (item as any)[prop])
        : finalSelected.length > 0
          ? (finalSelected[0] as any)[prop]
          : null;

    this.valueChange.emit(emitValue);

    if (!this.multiple()) {
      this.showDropdown.set(false);
    }
  }

  closeDropdown(): void {
    this.showDropdown.set(false);
  }

  getSelectedLabel(): string {
    const selected = this.dropdownSelectedItems();
    if (selected.length === 0) {
      return '';
    }

    const prop = this.propLabel() as keyof DropdownItem;

    if (this.multiple()) {
      return selected
        .map((item) => item[prop] || (item as any)[this.propLabel()])
        .join(', ');
    }

    return (selected[0] as any)[prop] || (selected[0] as any)[this.propLabel()];
  }

  handleChipEvents(item: DropdownItem): void {
    const currentItems = this.dropdownSelectedItems();
    const updatedItems = currentItems.filter((i) => i !== item);
    this.dropdownSelectedItems.set(updatedItems);
    this.selected.emit(updatedItems);

    const prop = this.propValue();
    const emitValue = this.returnFullObject()
      ? updatedItems
      : updatedItems.map((i) => (i as any)[prop]);

    this.valueChange.emit(emitValue);

    this.options().forEach((option) => {
      if (
        (option as any)[this.propLabel()] === (item as any)[this.propLabel()] &&
        (option as any)[prop] === (item as any)[prop]
      ) {
        option.selected = false;
      }
    });
  }

  handleSearch(value: string): void {
    console.log('[IonSelect] handleSearch:', value);
    this.search.emit(value);
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

    if (!trigger || !measurement || !trigger.clientWidth) {
      this.visibleCount.set(null);
      return;
    }

    const icon = trigger.querySelector('ion-icon');
    const iconWidth = icon?.getBoundingClientRect().width ?? 20;
    const styles = getComputedStyle(trigger);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const availableWidth =
      trigger.clientWidth - iconWidth - CHIP_GAP - paddingLeft - paddingRight;

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
}
