import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BadgeType } from '../badge/badge.component';
import { ChipSize, IconDirection, IonChipProps } from '../chip/chip.component';
import { DirectionType } from '../core/types';

export interface ChipInGroup extends IonChipProps {
  selected?: boolean;
}

export interface ChipGroupProps {
  chips?: Array<IonChipProps>;
  disabled?: boolean;
  size?: ChipSize;
  events?: EventEmitter<ChipEvent>;
  direction?: DirectionType;
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
  selector: 'ion-tab-group',
  templateUrl: './chip-group.component.html',
  styleUrls: ['./chip-group.component.scss'],
})
export class ChipGroupComponent {
  @Input() chips: ChipInGroup[];
  @Input() direction: DirectionType = 'horizontal';
  @Input() size?: ChipSize = 'sm';
  @Input() infoBadge?: IonChipProps['infoBadge'];
  @Input() iconPosition?: IconDirection = 'left';
  @Input() rightBadge?: RightBadge;
  @Input() disabled = false;

  @Output() selected = new EventEmitter<ChipInGroup>();

  selectChip(chipSelected: ChipInGroup): void {
    this.clearChips();
    chipSelected.selected = true;
    this.selected.emit(chipSelected);
  }

  private clearChips(): void {
    this.chips.forEach((chip) => {
      chip.selected = false;
    });
  }
}
