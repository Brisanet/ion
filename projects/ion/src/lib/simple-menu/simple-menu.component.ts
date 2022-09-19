import { Component, Input } from '@angular/core';
import { TabInGroup } from '../tab-group/tab-group.component';

interface MenuProfile {
  imageUrl: string;
  name: string;
}
export interface SimpleMenuProps {
  options: TabInGroup[];
  profile: MenuProfile;
}

@Component({
  selector: 'ion-simple-menu',
  templateUrl: './simple-menu.component.html',
  styleUrls: ['./simple-menu.component.scss'],
})
export class SimpleMenuComponent {
  @Input() options: SimpleMenuProps['options'];
  @Input() profile: SimpleMenuProps['profile'];

  public open = false;

  private timeToAutoClose = 1000;
  private menuTimeout: ReturnType<typeof setTimeout>;

  dismissMenu() {
    this.menuTimeout = setTimeout(() => {
      this.open = false;
    }, this.timeToAutoClose);
  }

  openMenu() {
    clearTimeout(this.menuTimeout);
    this.open = true;
  }
}
