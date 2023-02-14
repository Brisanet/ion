import { Component, Input } from '@angular/core';
import { IconType } from '../core/types';

export interface Item {
  title: string;
  icon: IconType;
  selected?: boolean;
}

export interface IonSidebarProps {
  logo: string;
  items: (Item & { options?: [Item, ...Item[]] })[];
}

@Component({
  selector: 'ion-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() logo!: string;
  @Input() items: IonSidebarProps['items'] = [];

  public closed = true;

  public toggleVisibility(): void {
    this.closed = !this.closed;
  }

  public itemSelected(itemIndex: number): void {
    this.items.forEach((item) => (item.selected = false));
    this.items[itemIndex].selected = true;
  }
}
