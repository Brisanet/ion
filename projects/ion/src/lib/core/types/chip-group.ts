import { EventEmitter } from '@angular/core';
import { ChipSize, IonChipProps } from './chip';

export interface ChipInGroup extends IonChipProps {
  selected?: boolean;
}
export interface ChipGroupProps {
  chips?: Array<IonChipProps>;
  disabled?: boolean;
  size?: ChipSize;
  multiple?: boolean;
  required?: boolean;
  events?: EventEmitter<ChipEvent>;
  selected?: EventEmitter<ChipInGroup>;
}

interface ChipEvent {
  selected: boolean;
  disabled: boolean;
}
