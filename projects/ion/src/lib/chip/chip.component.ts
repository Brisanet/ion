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

  select() {
    this.selected = !this.selected;
  }
}
