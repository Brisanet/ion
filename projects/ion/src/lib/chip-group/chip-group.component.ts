import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ChipSize,
  IconDirection,
  IonChipProps,
  RightBadge,
} from '../core/types';
import { ChipInGroup } from '../core/types/chip-group';
import { DropdownItem } from '../core/types/dropdown';

@Component({
  selector: 'ion-chip-group',
  templateUrl: './chip-group.component.html',
  styleUrls: ['./chip-group.component.scss'],
})
export class IonChipGroupComponent {
  @Input() chips: ChipInGroup[] = [];
  @Input() size?: ChipSize = 'sm';
  @Input() infoBadge?: IonChipProps['infoBadge'];
  @Input() iconPosition?: IconDirection = 'left';
  @Input() rightBadge?: RightBadge;
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() required = false;

  @Output() selected? = new EventEmitter<ChipInGroup>();
  @Output() dropdown? = new EventEmitter<DropdownItem[]>();

  selectChip(chipSelected: ChipInGroup): void {
    if (chipSelected.multiple && chipSelected.selected) {
      return;
    }

    const isChipSelected = chipSelected.selected;

    if (!this.multiple) {
      this.clearChips();
    }

    if (!chipSelected.multiple || !isChipSelected) {
      chipSelected.selected = !isChipSelected;
    }

    if (this.required) {
      this.checkRequired(chipSelected);
    }

    this.selected.emit(chipSelected);
  }

  checkRequired(chipSelected: ChipInGroup) {
    const selectedChips = this.chips.filter((chip) => chip.selected);
    if (!selectedChips.length) {
      chipSelected.selected = true;
    }
  }

  dropdownEvents(options: DropdownItem[]): void {
    if (options) {
      this.dropdown.emit(options);
    }
  }

  private clearChips(): void {
    this.chips.forEach((chip) => {
      chip.selected = false;
    });
  }
}
