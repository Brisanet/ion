import { Component, Input } from '@angular/core';
import { IonSidebarProps } from '../core/types/sidebar';
import { selectItemByIndex, callItemAction, unselectAllItems } from './utils';

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
    selectItemByIndex(this.items, itemIndex);
  }

  public itemOnGroupSelected(groupIndex: number): void {
    unselectAllItems(this.items, groupIndex);
  }

  public groupSelected(groupIndex: number): void {
    unselectAllItems(this.items);
    callItemAction(this.items, groupIndex);
  }
}
