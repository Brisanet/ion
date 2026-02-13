import {
  Component,
  input,
  output,
  signal,
  ElementRef,
  inject,
  effect,
  ChangeDetectionStrategy,
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
  value = input<any>(undefined); // New input for initial value or binding

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
        const prop = this.propValue();

        if (value !== undefined) {
          let selected: DropdownItem[] = [];
          if (value !== null && value !== '') {
            if (Array.isArray(value)) {
              // Handle array of values (keys or objects)
              selected = options.filter((opt) =>
                value.some((val) =>
                  typeof val === 'object'
                    ? (val as any)[prop] === (opt as any)[prop]
                    : val === (opt as any)[prop]
                )
              );
            } else {
              // Handle single value
              selected = options.filter((opt) =>
                typeof value === 'object'
                  ? (value as any)[prop] === (opt as any)[prop]
                  : value === (opt as any)[prop]
              );
            }
          }

          const currentSelected = this.dropdownSelectedItems();
          const missingItems = currentSelected.filter(
            (item) =>
              !options.some(
                (opt) => (opt as any)[prop] === (item as any)[prop]
              )
          );

          const finalSelected = [...selected, ...missingItems];

          this.dropdownSelectedItems.set(finalSelected);

          options.forEach((opt) => {
            opt.selected = finalSelected.some(
              (s) => (s as any)[prop] === (opt as any)[prop]
            );
          });
        } else {
          // Fallback to options marked as selected if no value input is provided
          const selected = options.filter((option) => option.selected);
          this.dropdownSelectedItems.set(selected);
        }
      },
      { allowSignalWrites: true }
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

    if (this.multiple()) {
      this.valueChange.emit(finalSelected.map((item) => (item as any)[prop]));
    } else {
      this.valueChange.emit(
        finalSelected.length > 0 ? (finalSelected[0] as any)[prop] : null
      );
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
