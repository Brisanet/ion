import {
  Component,
  computed,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from '../icon/icon.component';
import { IonDropdownComponent } from '../dropdown/dropdown.component';
import { BreadcrumbItem } from '../core/types/breadcrumb';
import { DropdownItem } from '../core/types/dropdown';

@Component({
  selector: 'ion-breadcrumb',
  standalone: true,
  imports: [CommonModule, IonIconComponent, IonDropdownComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonBreadcrumbComponent {
  breadcrumbs = input.required<BreadcrumbItem[]>();
  truncate = input<boolean>(true);
  selected = output<BreadcrumbItem>();

  public readonly truncateLimit = 5;
  public readonly ellipsesIndex = 1;

  public isDropdownOpen = signal(false);
  public dropdownOrigin = signal<HTMLElement | null>(null);

  public breadcrumbsInDropdown = computed(() => {
    if (!this.truncate()) {
      return [];
    }

    return this.breadcrumbs().reduce((acc, { link, label }, index) => {
      if (
        index >= this.ellipsesIndex &&
        index < this.breadcrumbs().length - this.truncateLimit
      ) {
        acc.push({ key: link, label });
      }
      return acc;
    }, [] as DropdownItem[]);
  });

  public onSelected(item: BreadcrumbItem): void {
    if (item !== this.breadcrumbs()[this.breadcrumbs().length - 1]) {
      this.selected.emit(item);
    }
  }

  public openDropdown(element: HTMLElement): void {
    this.dropdownOrigin.set(element);
    this.isDropdownOpen.set(true);
  }

  public closeDropdown(): void {
    this.isDropdownOpen.set(false);
    this.dropdownOrigin.set(null);
  }

  public selectDropdownItem(selecteds: DropdownItem[]): void {
    const [item] = selecteds;
    if (item) {
      const found = this.breadcrumbs().find(({ link }) => link === item.key);
      if (found) {
        this.onSelected(found);
      }
    }
  }
}
