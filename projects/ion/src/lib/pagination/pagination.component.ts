import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DropdownItem } from '../core/types/dropdown';
import { IonPaginationProps, Page, PageEvent } from '../core/types/pagination';

export const ITEMS_PER_PAGE_DEFAULT = 10;
export const LIST_OF_PAGE_OPTIONS = [10, 20, 30, 40, 46];

@Component({
  selector: 'ion-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class IonPaginationComponent implements OnChanges, OnInit {
  @Input() total: IonPaginationProps['total'];
  @Input() itemsPerPage: IonPaginationProps['itemsPerPage'] =
    ITEMS_PER_PAGE_DEFAULT;
  @Input() size: IonPaginationProps['size'] = 'md';
  @Input() allowChangeQtdItems: IonPaginationProps['allowChangeQtdItems'];
  @Input() loading = false;
  @Input() page = 0;
  @Output() events = new EventEmitter<PageEvent>();

  public optionsPage?: DropdownItem[] = [];
  public labelPerPage = '';

  pages: Page[] = [];
  hidePreviousQuantity = 2;
  hideNextQuantity = 2;
  currentPageNumber: number;

  changeItemsPerPage(itemsSelected: DropdownItem[]): void {
    this.itemsPerPage = Number(itemsSelected[0].label.split(' / página')[0]);
    this.remountPages();
    this.labelPerPage = this.getSelectedItemsPerPageLabel(this.optionsPage);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.total) {
      this.remountPages();
    }
    if (changes.page && changes.page.currentValue) {
      this.setPage(changes.page.currentValue);
    }
  }

  ngOnInit(): void {
    this.optionsPage = this.getOptionsPage();
    this.labelPerPage = this.getSelectedItemsPerPageLabel(this.optionsPage);
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

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private hasSelected() {
    this.pages &&
      this.pages.forEach((pageEach) => {
        pageEach.selected = false;
      });
  }

  private selectPage(pageNumber = 1): void {
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

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private selectedPageCondition(pageNumber: number) {
    let page: Page;
    if (this.totalPages() >= 10) {
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

  // eslint-disable-next-line @typescript-eslint/member-ordering
  hasPrevious(): boolean {
    return !this.inFirstPage();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  hasNext(): boolean {
    const selecteds = this.pages.filter((page) => page.selected);
    return selecteds.length > 0 && !this.inLastPage();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  previous(): void {
    if (!this.inFirstPage()) {
      this.selectPage(this.currentPageNumber - 1);
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  next(): void {
    if (!this.inLastPage()) {
      this.selectPage(this.currentPageNumber + 1);
    }
  }

  private remountPages(): void {
    this.createPages(this.totalPages());
    this.selectPage(1);
  }

  private totalPages(): number {
    const numberOfPages = Math.ceil(this.total / this.itemsPerPage);
    return numberOfPages;
  }

  private getSelectedItemsPerPageLabel(options: DropdownItem[]): string {
    const option = options.find((pageOption) => pageOption.selected);
    return (option && option.label) || this.generateLabel(this.itemsPerPage);
  }

  private createPages(qtdOfPages: number): void {
    this.pages = [];
    for (let index = 0; index < qtdOfPages; index++) {
      if (qtdOfPages >= 10) {
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

  private createBothEllipsis(number: number): number {
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

  private generateLabel(page: number): string {
    return `${page} / página`;
  }

  private getOptionsPage(): DropdownItem[] {
    return LIST_OF_PAGE_OPTIONS.map((quantityOfPages) => {
      return {
        label: this.generateLabel(quantityOfPages),
        selected: this.isASelectedOption(quantityOfPages),
      };
    });
  }

  private isASelectedOption(quantityOfPages: number): boolean {
    return (
      LIST_OF_PAGE_OPTIONS.includes(this.itemsPerPage) &&
      this.itemsPerPage === quantityOfPages
    );
  }

  private hidePages(pageNumber: number): boolean {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    if (this.totalPages() <= 9) {
      return false;
    } else {
      if (pageNumber === -1) {
        const pagesInLeft = this.currentPageNumber - 1;
        const showLeftEllipsis = pagesInLeft > this.hideNextQuantity + 1;
        return !showLeftEllipsis;
      } else if (this.currentPageNumber < 5) {
        if (pageNumber <= 5 || pageNumber === this.totalPages()) {
          return false;
        }
        this.page = this.hidePreviousQuantity && this.hideNextQuantity;
      } else if (this.currentPageNumber >= this.totalPages() - 3) {
        if (pageNumber === 1 || pageNumber >= this.totalPages() - 4) {
          return false;
        }
        if (
          pageNumber >= this.currentPageNumber - this.hidePreviousQuantity &&
          pageNumber <= this.totalPages() - this.hideNextQuantity
        ) {
          return false;
        }
        return true;
      } else if (this.currentPageNumber < 4) {
        if (pageNumber <= 5 || pageNumber === this.totalPages()) {
          return false;
        }
      } else if (this.currentPageNumber > this.totalPages() - 4) {
        if (
          pageNumber === this.totalPages() ||
          pageNumber >= this.totalPages() - 4
        ) {
          return false;
        }
      } else if (this.currentPageNumber === this.totalPages() - 5) {
        if (
          pageNumber === this.totalPages() ||
          pageNumber === this.currentPageNumber + this.hideNextQuantity
        ) {
          return false;
        }
      } else if (pageNumber === 0) {
        const pagesInRight = this.totalPages();
        const showRightEllipsis = pagesInRight > this.hideNextQuantity + 1;
        return !showRightEllipsis;
      }
    }
    return this.hidePageNumber(pageNumber);
  }

  private hidePageNumber(pageNumber: number): boolean {
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
