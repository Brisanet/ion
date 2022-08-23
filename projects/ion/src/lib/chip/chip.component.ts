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
  @Input() showDropDown = false;
  @Input() isOpen = false;
  public chipOptions = [
    {
      label: 'Option 1',
      selected: false,
    },
    {
      label: 'Option 2',
      selected: false,
    },
    {
      label: 'Option 3',
      selected: false,
    },
    {
      label: 'Option 4',
      selected: false,
    },
  ];

  @Output() events = new EventEmitter<ChipEvent>();

  select() {
    this.selected = !this.selected;
    this.events.emit({
      selected: this.selected,
      disabled: this.disabled,
    });
  }

  dropDown() {
    this.showDropDown = !this.showDropDown;
    this.isOpen = !this.isOpen;
  }
}
