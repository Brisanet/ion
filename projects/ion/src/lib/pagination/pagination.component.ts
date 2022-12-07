import { DropdownItem } from './../dropdown/dropdown.component';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

interface Page {
  page_number: number;
  selected: boolean;
}

export interface PageEvent {
  actual: number;
  itemsPerPage: number;
  offset: number;
}

export interface IonPaginationProps {
  total: number;
  itemsPerPage?: number;
  size?: string;
  events?: EventEmitter<PageEvent>;
  allowChangeQtdItems?: boolean;
  loading?: boolean;
}

export const ITEMS_PER_PAGE_DEFAULT = 10;

@Component({
  selector: 'ion-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() total: IonPaginationProps['total'];
  @Input() itemsPerPage: IonPaginationProps['itemsPerPage'] =
    ITEMS_PER_PAGE_DEFAULT;
  @Input() size: IonPaginationProps['size'] = 'md';
  @Input() allowChangeQtdItems: IonPaginationProps['allowChangeQtdItems'];
  @Input() loading = false;
  @Output() events = new EventEmitter<PageEvent>();

  public optionsPage = [
    { label: `${ITEMS_PER_PAGE_DEFAULT} / página`, selected: true },
    { label: '20 / página' },
    { label: '30 / página' },
    { label: '40 / página' },
    { label: '46 / página' },
  ];

  pages: Page[] = [];

  changeItemsPerPage(itemsSelected: DropdownItem[]): void {
    this.itemsPerPage = Number(itemsSelected[0].label.split(' / página')[0]);
    this.remountPages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.total) {
      this.remountPages();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.total && !changes.total.firstChange) {
      this.remountPages();
    }
  }

  selectPage(pageNumber: number): void {
    this.pages &&
      this.pages.forEach((pageEach) => {
        pageEach.selected = false;
      });

    const page = this.pages[pageNumber - 1];
    page.selected = true;

    this.events.emit({
      actual: page.page_number,
      itemsPerPage: this.itemsPerPage,
      offset: (page.page_number - 1) * this.itemsPerPage,
    });
  }

  hasPrevious(): boolean {
    return !this.inFirstPage();
  }

  hasNext(): boolean {
    const selecteds = this.pages.filter((page) => page.selected);
    return selecteds.length > 0 && !this.inLastPage();
  }

  previous(): void {
    if (!this.inFirstPage()) {
      this.selectPage(this.currentPage().page_number - 1);
    }
  }

  next(): void {
    if (!this.inLastPage()) {
      this.selectPage(this.currentPage().page_number + 1);
    }
  }

  remountPages(): void {
    this.createPages(this.totalPages());
    this.selectPage(1);
  }

  totalPages(): number {
    const numberOfPages = Math.ceil(this.total / this.itemsPerPage);
    return numberOfPages;
  }

  private createPages(qtdOfPages: number): void {
    this.pages = [];
    for (let index = 0; index < qtdOfPages; index++) {
      this.pages.push({
        selected: false,
        page_number: index + 1,
      });
    }
  }

  private currentPage(): Page {
    return this.pages.filter((page) => page.selected)[0];
  }

  private inLastPage(): boolean {
    return this.currentPage().page_number === this.totalPages();
  }

  private inFirstPage(): boolean {
    return this.currentPage().page_number === 1;
  }
}
