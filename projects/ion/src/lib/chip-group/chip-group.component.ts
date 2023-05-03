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

  private isChipWithGroup = true;

  selectChip(chipSelected: ChipInGroup): void {
    const isChipSelected = chipSelected.selected;

    if (!this.multiple) {
      this.clearChips();
    }

    chipSelected.selected = !isChipSelected;
    this.selected.emit(chipSelected);
  }

  private clearChips(): void {
    this.chips.forEach((chip) => {
      chip.selected = false;
    });
  }
}
