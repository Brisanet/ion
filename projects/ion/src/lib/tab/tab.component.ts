import { Component, Input } from '@angular/core';

export type TabSize = 'sm' | 'md' | 'lg';
export type Direction = 'bottom' | 'top' | 'right' | 'left';

@Component({
  selector: 'ion-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  @Input() label!: string;
  @Input() tabSize?: TabSize = 'sm';
  @Input() disabled?: boolean;
  @Input() selected?: boolean;
  @Input() direction?: Direction = 'bottom';

  select() {
    this.selected = !this.selected;
  }
}
