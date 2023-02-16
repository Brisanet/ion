import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BadgeType } from '../core/types/badge';
import { ChipSize, IconDirection, IonChipProps } from '../core/types';

export interface ChipInGroup extends IonChipProps {
  selected?: boolean;
}

export interface ChipGroupProps {
  chips?: Array<IonChipProps>;
  disabled?: boolean;
  size?: ChipSize;
  multiple?: boolean;
  events?: EventEmitter<ChipEvent>;
  selected: EventEmitter<ChipInGroup>;
}

interface ChipEvent {
  selected: boolean;
  disabled: boolean;
}

interface RightBadge {
  label: string;
  type: BadgeType;
}

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
  @Output() selected = new EventEmitter<ChipInGroup>();

  selectChip(chipSelected: ChipInGroup): void {
    if (chipSelected.options) {
      this.clearChipsWithDropdown();
    }
    if (!this.multiple) {
      this.clearChips();
    }
    chipSelected.selected = true;
    this.selected.emit(chipSelected);
  }

  private clearChips(): void {
    this.chips.forEach((chip) => {
      chip.selected = false;
    });
  }

  private clearChipsWithDropdown(): void {
    this.chips.forEach((chip) => {
      chip.selected && chip.options ? (chip.selected = false) : '';
    });
  }
}
