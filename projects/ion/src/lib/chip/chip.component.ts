import { Component, Input } from '@angular/core';
@Component({
  selector: 'ion-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Input('label') label!: string;
  @Input('disabled') disabled? = true;
  @Input('selected') selected? = false;
  @Input('size') size: 'sm' | 'md' = 'md';

  select() {
    this.selected = !this.selected;
  }
}
