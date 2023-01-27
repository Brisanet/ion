import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DropdownItem } from './../dropdown/dropdown.component';

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
  page?: number;
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
  @Input() page = 0;
  @Output() events = new EventEmitter<PageEvent>();

  public optionsPage = [
    { label: `${ITEMS_PER_PAGE_DEFAULT} / página`, selected: true },
    { label: '20 / página' },
    { label: '30 / página' },
    { label: '40 / página' },
    { label: '46 / página' },
  ];

  pages: Page[] = [];
  hidePreviousQuantity = 2;
  hideNextQuantity = 2;
  currentPageNumber: number;

  changeItemsPerPage(itemsSelected: DropdownItem[]): void {
    this.itemsPerPage = Number(itemsSelected[0].label.split(' / página')[0]);
    this.remountPages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.total) {
      this.remountPages();
    }
    if (changes.page && changes.page.currentValue) {
      this.setPage(changes.page.currentValue);
    }
  }

  setPage(page = 1): void {
    if (page === 1) {
      this.remountPages();
    } else {
      this.selectPage(page);
    }
  }

  private skipEllipsis(pageNumber: number): number {
    if (pageNumber === 1) {
      return pageNumber - 1;
    } else if (pageNumber === this.pages.length - 2) {
      return pageNumber + 1;
    } else {
      return pageNumber;
    }
  }

  hasSelected() {
    this.pages &&
      this.pages.forEach((pageEach) => {
        pageEach.selected = false;
      });
  }

  selectPage(pageNumber = 1): void {
    if (pageNumber == -1) {
      this.hidePreviousQuantity += 5;
      this.selectedPageCondition(this.currentPageNumber);
    } else if (pageNumber == 0) {
      this.hideNextQuantity += 5;
      this.selectedPageCondition(this.currentPageNumber);
    } else {
      this.hasSelected();
      this.selectedPageCondition(pageNumber);
    }
  }

  selectedPageCondition(pageNumber: number) {
    let page: Page;
    if (this.totalPages() >= 20) {
      page = this.pages[this.skipEllipsis(pageNumber)];
      pageNumber === 0 || pageNumber === -1
        ? (page.selected = false)
        : (page.selected = true);
    } else {
      page = this.pages[pageNumber - 1];
      page.selected = true;
    }
    this.events.emit({
      actual: page.page_number,
      itemsPerPage: this.itemsPerPage,
      offset: (page.page_number - 1) * this.itemsPerPage,
    });
    this.currentPageNumber = page.page_number;
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
      this.selectPage(this.currentPageNumber - 1);
    }
  }

  next(): void {
    if (!this.inLastPage()) {
      this.selectPage(this.currentPageNumber + 1);
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
      if (qtdOfPages >= 20) {
        this.createEllipsis(index, qtdOfPages);
      } else {
        this.pages.push({
          selected: false,
          page_number: index + 1,
        });
      }
    }
  }

  private createEllipsis(index: number, qtdOfPages: number): void {
    if (index == 1) {
      this.createBothEllipsis(-1);
    } else if (index == qtdOfPages - 1) {
      this.createBothEllipsis(0);
    }
    this.pages.push({
      selected: false,
      page_number: index + 1,
    });
  }

  createBothEllipsis(number: number): number {
    return this.pages.push({
      selected: false,
      page_number: number,
    });
  }

  private inLastPage(): boolean {
    if (this.totalPages() === this.currentPageNumber) this.hideNextQuantity = 2;
    return this.currentPageNumber === this.totalPages();
  }

  private inFirstPage(): boolean {
    if (this.currentPageNumber === 1) this.hidePreviousQuantity = 2;
    return this.currentPageNumber === 1;
  }

  hidePages(pageNumber: number): boolean {
    if (this.totalPages() <= 20) {
      return false;
    } else {
      if (pageNumber === -1) {
        const pagesInLeft = this.currentPageNumber - 1;
        const showLeftElipsis = pagesInLeft > this.hidePreviousQuantity + 1;
        return !showLeftElipsis;
      } else if (pageNumber === 0) {
        const pagesInRight = this.totalPages() - this.currentPageNumber - 1;
        const showRightElipsis = pagesInRight > this.hideNextQuantity + 1;
        return !showRightElipsis;
      }
      return this.hidePageNumber(pageNumber);
    }
  }

  hidePageNumber(pageNumber: number): boolean {
    return (
      (pageNumber < this.currentPageNumber - this.hidePreviousQuantity ||
        pageNumber > this.currentPageNumber + this.hideNextQuantity) &&
      pageNumber !== this.totalPages() &&
      pageNumber !== 1 &&
      pageNumber !== -1 &&
      pageNumber !== 0
    );
  }
}
