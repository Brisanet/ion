import { CommonModule } from '@angular/common';
import { Component, input, output, signal, TemplateRef } from '@angular/core';
import { IonButtonComponent } from '../button/button.component';
import { IonIconComponent } from '../icon/icon.component';
import { IonSidebarGroupComponent } from './sidebar-group/sidebar-group.component';
import { IonSidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { Item } from '../core/types/sidebar';
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

  public toggleVisibility(): void {
    this.closed.update((value) => !value);
    this.ionOnSidebarToggle.emit(!this.closed());
  }

  public itemSelected(itemIndex: number, event: MouseEvent): void {
    unselectAllItems(this.items());
    this.items()[itemIndex].selected = true;
    callItemAction(this.items(), itemIndex, event);
    if (this.closeOnSelect()) {
      this.closed.set(true);
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
