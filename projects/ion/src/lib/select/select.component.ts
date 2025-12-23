import {
  Component,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
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

  // Outputs
  selected = output<DropdownItem[]>();

  // Signals
  showDropdown = signal(false);
  dropdownSelectedItems = signal<DropdownItem[]>([]);

  private elementRef = inject(ElementRef);

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
