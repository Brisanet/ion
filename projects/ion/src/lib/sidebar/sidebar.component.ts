import { Component, Input } from '@angular/core';
import { IonSidebarProps } from '../core/types/sidebar';

@Component({
  selector: 'ion-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class IonSidebarComponent {
  @Input() logo!: string;
  @Input() items: IonSidebarProps['items'] = [];

  public closed = true;

  public toggleVisibility(): void {
    this.closed = !this.closed;
  }

  public itemSelected(itemIndex: number): void {
    this.items.forEach((item) => (item.selected = false));
    this.items[itemIndex].selected = true;

    if (this.items[itemIndex].action) {
      this.items[itemIndex].action();
    }
  }
}
