import { Component, Input } from '@angular/core';
import { IconType } from '../../icon/icon.component';

interface Item {
  title: string;
  icon: IconType;
  selected?: boolean;
}

@Component({
  selector: 'ion-sidebar-group',
  templateUrl: './sidebar-group.component.html',
  styleUrls: ['./sidebar-group.component.scss'],
})
export class SidebarGroupComponent {
  @Input() title = '';
  @Input() icon!: IconType;
  @Input() items: Item[] = [];

  public selected = false;
  public closed = true;

  public itemSelected(itemIndex: number): void {
    this.selected = true;
    this.items.forEach((item) => (item.selected = false));
    this.items[itemIndex].selected = true;
  }

  public toggleItemsVisibility(): void {
    this.closed = !this.closed;
  }
}
