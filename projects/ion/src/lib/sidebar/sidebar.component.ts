import { CommonModule } from '@angular/common';
import { Component, input, output, signal, TemplateRef } from '@angular/core';
import { IonButtonComponent } from '../button/button.component';
import { IonIconComponent } from '../icon/icon.component';
import { IonSidebarGroupComponent } from './sidebar-group/sidebar-group.component';
import { IonSidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { Item } from '../core/types/sidebar';
import { MOUSE_BUTTONS } from '../utils/mouse-buttons';
import { callItemAction, unselectAllItems } from './utils';

@Component({
  selector: 'ion-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    IonButtonComponent,
    IonSidebarGroupComponent,
    IonSidebarItemComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class IonSidebarComponent {
  logo = input<string>('');
  items = input<(Item & { options?: Item[] })[]>([]);
  closeOnSelect = input<boolean>(false);
  shrinkMode = input<boolean>(false);
  sidebarFooter = input<TemplateRef<void>>();
  keepShrunken = input<boolean>(false);
  logoAction = input<() => void>();

  ionOnSidebarToggle = output<boolean>();

  public closed = signal(true);

  public checkClickOnPageAccess = (event: MouseEvent): void => {
    const containerElement = document.querySelector('.ion-sidebar--opened');
    const innerElement = event.target as HTMLElement;
    if (containerElement && !containerElement.contains(innerElement)) {
      const closeButton = document.querySelector(
        '.ion-sidebar--opened .ion-sidebar__header button'
      ) as HTMLElement;
      if (closeButton) {
        closeButton.click();
      }
    }
  };

  public toggleVisibility(): void {
    this.closed.update((value) => !value);
    this.ionOnSidebarToggle.emit(!this.closed());

    if (!this.closed()) {
      setTimeout(() => {
        document.addEventListener('click', this.checkClickOnPageAccess);
      });

      return;
    }
    document.removeEventListener('click', this.checkClickOnPageAccess);
  }

  public itemSelected(itemIndex: number, event: MouseEvent): void {
    unselectAllItems(this.items());
    if (event.button !== MOUSE_BUTTONS.MIDDLE) {
      this.items()[itemIndex].selected = true;
    }
    callItemAction(this.items(), itemIndex, event);
    if (
      event.button !== MOUSE_BUTTONS.MIDDLE &&
      this.closeOnSelect() &&
      !(this.shrinkMode() && this.closed())
    ) {
      this.toggleVisibility();
    }
  }

  public itemOnGroupSelected(groupIndex: number): void {
    unselectAllItems(this.items());
    this.items()[groupIndex].selected = true;
    if (this.closeOnSelect()) {
      this.closed.set(true);
    }
  }

  public groupSelected(groupIndex: number, event: MouseEvent): void {
    this.recalculateItems(this.items());
    callItemAction(this.items(), groupIndex, event);
  }

  public handleLogoClick(): void {
    const logoAction = this.logoAction();
    if (logoAction) {
      logoAction();
    }

    if (this.closeOnSelect() && !this.closed()) {
      this.toggleVisibility();
    }
  }

  private recalculateItems(
    items: (Item & { options?: Item[] })[],
    itemIndex?: number
  ): void {
    items.forEach((item, index) => {
      if (itemIndex !== undefined && index !== itemIndex) {
        item.selected = false;
      }
      if (item.options) {
        this.recalculateItems(item.options, -1); // Unselect all in nested groups
      }
    });
  }
}
