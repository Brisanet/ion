import { Component, Input } from '@angular/core';

export type Size = 'sm' | 'md' | 'lg';
export type Direction = 'bottom' | 'top' | 'right' | 'left';

@Component({
  selector: 'ion-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  @Input() label!: string;
  @Input('disabled') disabled?: boolean;
  @Input('selected') selected?: boolean;
  @Input('direction') direction?: Direction = 'bottom';
  @Input('size') size?: Size = 'sm';

  select() {
    this.selected = !this.selected;
  }
}
