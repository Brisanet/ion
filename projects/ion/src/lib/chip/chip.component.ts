import { Component, Input } from '@angular/core';
@Component({
  selector: 'ion-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.less'],
})
export class ChipComponent {
  @Input('label') label!: string;
  @Input('disabled') disabled? = false;
  @Input('selected') selected? = false;
  @Input('size') size: 'sm' | 'md' = 'md';

  select() {
    this.selected = !this.selected;
  }
}
