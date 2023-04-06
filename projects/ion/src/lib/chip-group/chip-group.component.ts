import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ChipSize,
  IconDirection,
  IonChipProps,
  RightBadge,
} from '../core/types';
import { ChipInGroup } from '../core/types/chip-group';

@Component({
  selector: 'ion-chip-group',
  templateUrl: './chip-group.component.html',
  styleUrls: ['./chip-group.component.scss'],
})
export class IonChipGroupComponent {
  @Input() chips: ChipInGroup[];
  @Input() size?: ChipSize = 'sm';
  @Input() infoBadge?: IonChipProps['infoBadge'];
  @Input() iconPosition?: IconDirection = 'left';
  @Input() rightBadge?: RightBadge;
  @Input() disabled = false;
  @Input() multiple = false;
  @Output() selected? = new EventEmitter<ChipInGroup>();

  selectChip(chipSelected: ChipInGroup): void {
    if (chipSelected.options) {
      this.clearChipsWithDropdown();
    }
    if (!this.multiple) {
      this.clearChips();
    }
    chipSelected.selected = !chipSelected.selected;
    this.selected.emit(chipSelected);
  }

  private clearChips(): void {
    this.chips.forEach((chip) => {
      chip.selected = false;
    });
  }

  private clearChipsWithDropdown(): void {
    this.chips.forEach((chip) => {
      if (chip.selected && chip.options) {
        chip.selected = false;
      }
    });
  }
}
