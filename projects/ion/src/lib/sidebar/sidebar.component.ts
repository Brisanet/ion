import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { IonButtonComponent } from '../button/button.component';
import { IonIconComponent } from '../icon/icon.component';
import { IonSidebarGroupComponent } from './sidebar-group/sidebar-group.component';
import { IonSidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { Item } from '../core/types/sidebar';

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

  ionOnSidebarToggle = output<boolean>();

  public closed = signal(true);

  public toggleVisibility(): void {
    this.closed.update((value) => !value);
    this.ionOnSidebarToggle.emit(!this.closed());
  }

  public itemSelected(itemIndex: number): void {
    this.items()[itemIndex].selected = true;
    this.recalculateItems(this.items(), itemIndex);
    if (this.closeOnSelect()) {
      this.closed.set(true);
    }
  }

  public itemOnGroupSelected(groupIndex: number): void {
    this.recalculateItems(this.items(), groupIndex);
    if (this.closeOnSelect()) {
      this.closed.set(true);
    }
  }

  private recalculateItems(
    items: (Item & { options?: Item[] })[],
    itemIndex: number
  ): void {
    items.forEach((item, index) => {
      if (index !== itemIndex) {
        item.selected = false;
      }
      if (item.options) {
        this.recalculateItems(item.options, -1); // Unselect all in nested groups
      }
    });
  }
}
