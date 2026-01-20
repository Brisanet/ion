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
  DropdownItem,
  UserBadge,
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
  badge = input<UserBadge | undefined>(undefined);
  disabled = input<boolean>(false);
  multiple = input<boolean>(false);
  required = input<boolean>(false);

  selected = output<ChipInGroup>();
  dropdown = output<DropdownItem[]>();

  selectChip(chipSelected: ChipInGroup): void {
    if (this.disabled() || chipSelected.disabled) {
      return;
    }

    const isMultipleDropdownChip =
      chipSelected.multiple && chipSelected.selected && chipSelected.options;
    if (isMultipleDropdownChip) {
      return;
    }

    chipSelected = this.setChip(chipSelected);

    this.selected.emit(chipSelected);
  }

  setChip(chipSelected: ChipInGroup): ChipInGroup {
    const isChipSelected = chipSelected.selected;

    if (!this.multiple()) {
      this.clearChips();
    }

    chipSelected.selected = !isChipSelected;

    if (this.required()) {
      this.checkRequired(chipSelected);
    }

    this.chips.update((chips) => [...chips]);

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
      this.chips.update((chips) => [...chips]);
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
