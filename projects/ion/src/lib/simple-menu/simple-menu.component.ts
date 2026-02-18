import { Component, input, output, signal } from '@angular/core';

import { SafeAny } from '../utils/safe-any';
import { TabInGroup } from '../core/types/tab-group';
import { MenuProfile, Image } from '../core/types/simple-menu';
import { IonAvatarComponent } from '../avatar/avatar.component';
import { IonButtonComponent } from '../button/button.component';
import { IonTabGroupComponent } from '../tab-group/tab-group.component';
import { AvatarType } from '../core/types/avatar';

@Component({
  selector: 'ion-simple-menu',
  imports: [
    IonAvatarComponent,
    IonButtonComponent,
    IonTabGroupComponent
],
  templateUrl: './simple-menu.component.html',
  styleUrls: ['./simple-menu.component.scss'],
})
export class IonSimpleMenuComponent {
  options = input.required<TabInGroup[]>();
  profile = input.required<MenuProfile>();
  logo = input<Image>();

  selected = output<TabInGroup>();
  logoutClick = output<SafeAny>();

  open = signal(false);

  // Enum access for template
  readonly AvatarType = AvatarType;

  private timeToAutoClose = 1000;
  private menuTimeout!: ReturnType<typeof setTimeout>;

  changeTab(tabSelected: TabInGroup): void {
    this.selected.emit(tabSelected);
  }

  dismissMenu(): void {
    this.menuTimeout = setTimeout(() => {
      this.open.set(false);
    }, this.timeToAutoClose);
  }

  openMenu(): void {
    clearTimeout(this.menuTimeout);
    this.open.set(true);
  }

  logout(): void {
    this.logoutClick.emit(null);
  }
}
