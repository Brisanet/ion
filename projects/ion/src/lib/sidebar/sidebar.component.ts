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
  @Input() closeOnSelect = false;

  public closed = true;

  public checkClikOnPageAccess = (event): void => {
    const containerElement = document.querySelector('.ion-sidebar--opened');
    const innerElement = event.target;
    if (containerElement && !containerElement.contains(innerElement)) {
      const closeButton = document.querySelector(
        '.ion-sidebar--opened .ion-sidebar__header button'
      ) as HTMLElement;
      if (closeButton) {
        closeButton.click();
      }
    }
  };

  public toggleSidebarVisibility(): void {
    this.closed = !this.closed;
    if (!this.closed) {
      setTimeout(() => {
        document.addEventListener('click', this.checkClikOnPageAccess);
      });

      return;
    }
    document.removeEventListener('click', this.checkClikOnPageAccess);
  }

  public itemSelected(itemIndex: number): void {
    selectItemByIndex(this.items, itemIndex);
    if (this.closeOnSelect) {
      this.toggleSidebarVisibility();
    }
  }

  public itemOnGroupSelected(groupIndex: number): void {
    unselectAllItems(this.items, groupIndex);
    if (this.closeOnSelect) {
      this.toggleSidebarVisibility();
    }
  }

  public groupSelected(groupIndex: number): void {
    unselectAllItems(this.items);
    callItemAction(this.items, groupIndex);
  }

  public handleLogoClick(): void {
    if (this.logoAction) {
      this.logoAction();
    }

    if (this.closeOnSelect) {
      this.toggleSidebarVisibility();
    }
  }
}
