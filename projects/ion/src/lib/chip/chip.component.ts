import { IconType } from './../icon/icon.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ChipSize = 'sm' | 'md';

interface ChipEvent {
  selected: boolean;
  disabled: boolean;
}
export interface IonChipProps {
  label: string;
  disabled?: boolean;
  selected?: boolean;
  size?: ChipSize;
  events?: EventEmitter<ChipEvent>;
}

@Component({
  selector: 'ion-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Input() label!: string;
  @Input() disabled? = false;
  @Input() selected? = false;
  @Input() size?: ChipSize = 'sm';
  @Input() icon?: IconType;

  @Output() events = new EventEmitter<ChipEvent>();

  select() {
    this.selected = !this.selected;
    this.events.emit({
      selected: this.selected,
      disabled: this.disabled,
    });
  }
}
