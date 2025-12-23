import {
  Component,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
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
  imports: [CommonModule, IonIconComponent, IonDropdownComponent, IonChipComponent],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  value = input<any>(null); // New input for initial value or binding

  // Outputs
  selected = output<DropdownItem[]>();

  // Signals
  showDropdown = signal(false);
  dropdownSelectedItems = signal<DropdownItem[]>([]);

  private elementRef = inject(ElementRef);

  constructor() {
    effect(() => {
      const options = this.options();
      const value = this.value();

      if (value) {
        let selected: DropdownItem[] = [];
        if (Array.isArray(value)) {
           // Handle array of values (keys or objects)
           selected = options.filter(opt => 
             value.some(val => (typeof val === 'object' ? val.key === opt.key : val === opt.key))
           );
        } else {
           // Handle single value
           selected = options.filter(opt => 
            (typeof value === 'object' ? value.key === opt.key : value === opt.key)
           );
        }
         // Only update if finding matches, or if we want to clear when value is empty (but here value is checked as truthy)
        if (selected.length > 0) {
           this.dropdownSelectedItems.set(selected);
           // We might want to mark them as selected in the options array too if that's how dropdown works, 
           // but dropdownSelectedItems is the local truth for display.
           // However, if options are re-supplied, we need to ensure consistency.
           options.filter(opt => selected.some(s => s.key === opt.key)).forEach(opt => opt.selected = true);
        }
      } else {
        // Fallback to options marked as selected if no value input is provided
        const selected = options.filter((option) => option.selected);
        if (selected.length > 0) {
          this.dropdownSelectedItems.set(selected);
        }
      }
    }, { allowSignalWrites: true });
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
    if (!this.multiple()) {
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

    // Update the options to reflect the removal
    this.options().forEach((option) => {
      if (option.label === item.label && option.key === item.key) {
        option.selected = false;
      }
    });
  }
}
