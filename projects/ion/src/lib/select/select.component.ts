import {
  Component,
  input,
  output,
  signal,
  ElementRef,
  inject,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from '../icon/icon.component';
import { IonDropdownComponent } from '../dropdown/dropdown.component';
import { DropdownItem, DropdownParams } from '../core/types/dropdown';
import { IonChipComponent } from '../chip/chip.component';

@Component({
  selector: 'ion-select',
  standalone: true,
  imports: [
    CommonModule,
    IonIconComponent,
    IonDropdownComponent,
    IonChipComponent,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
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
  value = input<any>(null); // New input for initial value or binding

  // Outputs
  selected = output<DropdownItem[]>();
  search = output<string>();
  valueChange = output<any>();

  // Signals
  showDropdown = signal(false);
  dropdownSelectedItems = signal<DropdownItem[] | any[]>([]);

  private elementRef = inject(ElementRef);

  constructor() {
    effect(
      () => {
        const options = this.options();
        const value = this.value();

        if (value) {
          const prop = this.propValue();
          let selected: DropdownItem[] = [];
          if (Array.isArray(value)) {
            // Handle array of values (keys or objects)
            selected = options.filter((opt) =>
              value.some((val) =>
                typeof val === 'object'
                  ? (val as any)[prop] === (opt as any)[prop]
                  : val === (opt as any)[prop],
              ),
            );
          } else {
            // Handle single value
            selected = options.filter((opt) =>
              typeof value === 'object'
                ? (value as any)[prop] === (opt as any)[prop]
                : value === (opt as any)[prop],
            );
          }
          // Only update if finding matches, or if we want to clear when value is empty (but here value is checked as truthy)
          if (selected.length > 0) {
            this.dropdownSelectedItems.set(selected);
            // We might want to mark them as selected in the options array too if that's how dropdown works,
            // but dropdownSelectedItems is the local truth for display.
            // However, if options are re-supplied, we need to ensure consistency.
            options
              .filter((opt) =>
                selected.some((s) => (s as any)[prop] === (opt as any)[prop]),
              )
              .forEach((opt) => (opt.selected = true));
          }
        } else {
          // Fallback to options marked as selected if no value input is provided
          const selected = options.filter((option) => option.selected);
          if (selected.length > 0) {
            this.dropdownSelectedItems.set(selected);
          }
        }
      },
      { allowSignalWrites: true },
    );
    // TODO: allowSignalWrites deprecated, update this
  }

  toggleDropdown(): void {
    if (this.disabled()) {
      return;
    }
    this.showDropdown.update((show) => !show);
  }

  handleSelect(selectedItems: DropdownItem[]): void {
    this.dropdownSelectedItems.set(selectedItems);
    this.selected.emit(selectedItems);

    const prop = this.propValue();
    if (this.multiple()) {
      this.valueChange.emit(selectedItems.map((item) => (item as any)[prop]));
    } else {
      this.valueChange.emit(
        selectedItems.length > 0 ? (selectedItems[0] as any)[prop] : null,
      );
      this.showDropdown.set(false);
    }
  }

  closeDropdown(): void {
    this.showDropdown.set(false);
  }

  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.showDropdown.set(false);
    }
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
    this.valueChange.emit(updatedItems.map((i) => (i as any)[prop]));

    // Update the options to reflect the removal
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
}
