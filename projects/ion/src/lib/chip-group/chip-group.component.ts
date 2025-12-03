import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonChipComponent } from '../chip/chip.component';
import {
  ChipEvent,
  ChipSize,
  IconDirection,
  IonChipProps,
  RightBadge,
  DropdownItem,
} from '../core/types';
import { ChipInGroup } from '../core/types/chip-group';

@Component({
  selector: 'ion-chip-group',
  imports: [CommonModule, IonChipComponent],
  templateUrl: './chip-group.component.html',
  styleUrl: './chip-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonChipGroupComponent {
  chips = model<ChipInGroup[]>([]);
  size = input<ChipSize>('sm');
  infoBadge = input<IonChipProps['infoBadge']>(undefined);
  iconPosition = input<IconDirection>('left');
  rightBadge = input<RightBadge | undefined>(undefined);
  disabled = input<boolean>(false);
  multiple = input<boolean>(false);
  required = input<boolean>(false);

  selected = output<ChipInGroup>();
  dropdown = output<DropdownItem[]>();

  selectChip(chipSelected: ChipInGroup): void {
    console.log('selectChip called', chipSelected);
    if (this.disabled() || chipSelected.disabled) {
      return;
    }
    const isChipSelectedOrMultiple =
      chipSelected.multiple && chipSelected.selected;
    if (isChipSelectedOrMultiple) {
      return;
    }

    chipSelected = this.setChip(chipSelected);
    console.log('chipSelected after setChip', chipSelected);

    this.selected.emit(chipSelected);
  }

  setChip(chipSelected: ChipInGroup): ChipInGroup {
    const isChipSelected = chipSelected.selected;

    if (!this.multiple()) {
      this.clearChips();
    }

    const isSingleOrSelectedChip = !chipSelected.multiple || !isChipSelected;

    if (isSingleOrSelectedChip) {
      chipSelected.selected = !isChipSelected;
    }

    if (this.required()) {
      this.checkRequired(chipSelected);
    }
    
    // Update the model to trigger change detection if needed, 
    // though mutating objects inside the array might not trigger signal updates directly 
    // without creating a new array reference. 
    // For now, we keep the mutation approach as it matches the original logic, 
    // but we might need to update the signal with a new array reference if the UI doesn't update.
    this.chips.update(chips => [...chips]);

    return chipSelected;
  }

  checkRequired(chipSelected: ChipInGroup): void {
    const selectedChips = this.chips().filter((chip) => chip.selected);
    if (!selectedChips.length) {
      chipSelected.selected = true;
    }
  }

  chipEvents(event: ChipEvent): void {
    if (event.closeDropdown) {
      this.clearChips();
      this.chips.update(chips => [...chips]);
    }
  }

  dropdownEvents(options: DropdownItem[]): void {
    if (options) {
      this.dropdown.emit(options);
    }
  }

  private clearChips(): void {
    this.chips().forEach((chip) => {
      chip.selected = false;
    });
  }
}
