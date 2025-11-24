import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { DropdownItem } from '../core/types/dropdown';

export interface BreadcrumbItem {
  label: string;
  link: string;
}

export interface BreadcrumbProps {
  breadcrumbs: BreadcrumbItem[];
  selected: EventEmitter<BreadcrumbItem>;
  truncate?: boolean;
}

@Component({
  selector: 'ion-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class IonBreadcrumbComponent implements OnChanges {
  @Input() breadcrumbs: BreadcrumbProps['breadcrumbs'];
  @Input() truncate: BreadcrumbProps['truncate'] = true;
  @Output() selected = new EventEmitter<BreadcrumbItem>();

  public readonly truncateLimit = 5;
  public readonly ellipsesIndex = 1;

  public breadcrumbsInDropdown: DropdownItem[] = [];
  public isDropdownOpen = false;

  public onSelected(item: BreadcrumbItem): void {
    if (item !== this.breadcrumbs[this.breadcrumbs.length - 1]) {
      this.selected.emit(item);
    }
  }

  public openDropdown(): void {
    this.isDropdownOpen = true;
  }

  public closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  public selectDropdownItem(selecteds: DropdownItem[]): void {
    const [item] = selecteds;
    if (item) {
      this.onSelected(this.breadcrumbs.find(({ link }) => link === item.key));
    }
  }

  public ngOnChanges(): void {
    this.breadcrumbsInDropdown = [];

    if (this.truncate) {
      this.formatDropdownItems();
    }
  }

  private formatDropdownItems(): void {
    this.breadcrumbsInDropdown = this.breadcrumbs.reduce(
      (acc, { link, label }, index) => {
        if (
          index >= this.ellipsesIndex &&
          index < this.breadcrumbs.length - this.truncateLimit
        ) {
          acc.push({ key: link, label });
        }
        return acc;
      },
      [] as DropdownItem[]
    );
  }
}
