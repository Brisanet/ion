import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabInGroup } from '../core/types';
import { SimpleMenuProps } from '../core/types/simple-menu';

@Component({
  selector: 'ion-simple-menu',
  templateUrl: './simple-menu.component.html',
  styleUrls: ['./simple-menu.component.scss'],
})
export class IonSimpleMenuComponent {
  @Input() options: SimpleMenuProps['options'];
  @Input() profile: SimpleMenuProps['profile'];
  @Input() logo?: SimpleMenuProps['logo'];

  @Output() selected = new EventEmitter<TabInGroup>();
  @Output() logoutClick = new EventEmitter();

  open = false;

  private timeToAutoClose = 1000;
  private menuTimeout: ReturnType<typeof setTimeout>;

  changeTab(tabSelected: TabInGroup): void {
    this.selected.emit(tabSelected);
  }

  dismissMenu(): void {
    this.menuTimeout = setTimeout(() => {
      this.open = false;
    }, this.timeToAutoClose);
  }

  openMenu(): void {
    clearTimeout(this.menuTimeout);
    this.open = true;
  }

  logout(): void {
    this.logoutClick.emit();
  }
}
