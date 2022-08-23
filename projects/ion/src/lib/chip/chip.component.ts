import { IconType } from './../icon/icon.component';
import { Component, Input } from '@angular/core';

export type ChipSize = 'sm' | 'md';
export interface IonChipProps {
  label: string;
  disabled?: boolean;
  selected?: boolean;
  size?: ChipSize;
}

@Component({
  selector: 'ion-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Input('label') label!: string;
  @Input('disabled') disabled? = false;
  @Input('selected') selected? = false;
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

  select() {
    this.selected = !this.selected;
  }

  dropDown() {
    this.showDropDown = !this.showDropDown;
    this.isOpen = !this.isOpen;
  }
}
