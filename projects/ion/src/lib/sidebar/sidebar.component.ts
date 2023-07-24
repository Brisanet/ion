import { Component, Input } from '@angular/core';
import { IonSidebarProps } from '../core/types/sidebar';
import { callItemAction, selectItemByIndex, unselectAllItems } from './utils';

@Component({
  selector: 'ion-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class IonSidebarComponent {
  @Input() logo!: string;
  @Input() logoAction?: () => void;
  @Input() items: IonSidebarProps['items'] = [];

  public closed = true;

  public checkClikOnPage = (event): EventListenerOrEventListenerObject => {
    const containerElement = document.querySelector('.ion-sidebar--opened');
    const innerElement = event.target;
    if (containerElement && !containerElement.contains(innerElement as Node)) {
      const closeBUtton = document.querySelector(
        '.ion-sidebar--opened .ion-sidebar__header button'
      ) as HTMLElement;
      closeBUtton.click();
      document.removeEventListener('click', this.checkClikOnPage);
    }
    return;
  };

  public toggleVisibility(): void {
    this.closed = !this.closed;
    if (!this.closed) {
      setTimeout(() => {
        document.addEventListener('click', this.checkClikOnPage);
      });
    }
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
