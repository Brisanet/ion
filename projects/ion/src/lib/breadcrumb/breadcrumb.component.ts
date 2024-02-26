import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DropdownItem } from 'ion/public-api';

export interface BreadcrumbItem {
  label: string;
  link: string;
}

export interface BreadcrumbProps {
  breadcrumbItems: BreadcrumbItem[];
  selected: EventEmitter<BreadcrumbItem>;
  truncate?: boolean;
}

@Component({
  selector: 'ion-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class IonBreadcrumbComponent implements OnInit {
  @Input() breadcrumbs: BreadcrumbProps['breadcrumbItems'];
  @Input() truncate: BreadcrumbProps['truncate'] = true;
  @Output() selected = new EventEmitter<BreadcrumbItem>();

  public readonly truncateLimit = 5;
  public breadcrumbsInDropdown: DropdownItem[] = [];
  public isDropdownOpen = false;

  public onSelected(item: BreadcrumbItem): void {
    this.isDropdownOpen = false;
    if (item !== this.breadcrumbs[this.breadcrumbs.length - 1]) {
      this.selected.emit(item);
    }
  }

  public openDropdown(): void {
    this.isDropdownOpen = true;
  }

  public selectDropdownItem(selecteds: DropdownItem[]): void {
    const [item] = selecteds;
    if (item) {
      this.onSelected(this.breadcrumbs.find(({ link }) => link === item.key));
    }
  }

  public ngOnInit(): void {
    if (this.truncate) {
      this.breadcrumbsInDropdown = this.breadcrumbs.reduce(
        (acc, breadcrumb, index) => {
          if (index && index < this.breadcrumbs.length - this.truncateLimit) {
            acc.push({ key: breadcrumb.link, label: breadcrumb.label });
          }
          return acc;
        },
        [] as DropdownItem[]
      );
    }
  }
}
