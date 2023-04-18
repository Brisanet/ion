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
import { IonPaginationEllipsisComponent } from './utils/ellipsis.component';
export const ITEMS_PER_PAGE_DEFAULT = 10;
export const LIST_OF_PAGE_OPTIONS = [10, 20, 30, 40, 46];
export const LIMIT_TO_ADVANCED_PAGINATION = 10;
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
  pageOffset: number;
  pageShiftQuantity = 5;
  previousNextQuantity = 2;
  currentPageNumber: number;
  paginationEllipsis = new IonPaginationEllipsisComponent(this);

  changeItemsPerPage(itemsSelected: DropdownItem[]): void {
    this.itemsPerPage = Number(itemsSelected[0].label.split(' / página')[0]);
    this.remountPages();
    this.labelPerPage = this.getSelectedItemsPerPageLabel(this.optionsPage);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.total && changes.total.firstChange) {
      this.remountPages();
    }

    if (changes.total && changes.total) {
      this.remountPages(false);
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

  selectPage(pageNumber = 1, emitEvent = true): void {
    if (this.pages) {
      this.pages.forEach((pageEach) => {
        pageEach.selected = false;
      });
    }

    const page = this.pages[pageNumber - 1];
    page.selected = true;

    if (emitEvent) {
      this.events.emit({
        actual: page.page_number,
        itemsPerPage: this.itemsPerPage,
        offset: (page.page_number - 1) * this.itemsPerPage,
      });
    }
    this.page = page.page_number;
  }

  hasPrevious(): boolean {
    const firstPage = this.inFirstPage();
    return firstPage !== undefined && firstPage !== null && !firstPage;
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

  remountPages(emitEvent = true): void {
    this.createPages(this.totalPages());
    if (this.pages.length) {
      this.selectPage(1, emitEvent);
    }
  }
  totalPages(): number {
    const numberOfPages = Math.ceil(this.total / this.itemsPerPage);
    return numberOfPages;
  }

  selectedPageCondition(pageNumber: number): void {
    let page: Page;
    if (this.totalPages() >= LIMIT_TO_ADVANCED_PAGINATION) {
      page = this.pages[this.paginationEllipsis.skipEllipsis(pageNumber)];
      pageNumber === 0 || pageNumber === -1
        ? (page.selected = false)
        : (page.selected = true);
    } else {
      page = this.pages[pageNumber - 1];
      page.selected = true;
    }
    this.currentPageNumber = page.page_number;
    this.events.emit({
      actual: page.page_number,
      itemsPerPage: this.itemsPerPage,
      offset: (page.page_number - 1) * this.itemsPerPage,
    });
  }

  getSelectedItemsPerPageLabel(options: DropdownItem[]): string {
    const option = options.find((pageOption) => pageOption.selected);
    return (option && option.label) || this.generateLabel(this.itemsPerPage);
  }

  hidePages(pageNumber: number): boolean {
    return this.paginationEllipsis.ellipsisInPagination(pageNumber);
  }

  private createPages(qtdOfPages: number): void {
    this.pages = [];
    for (let index = 0; index < qtdOfPages; index++) {
      if (qtdOfPages >= LIMIT_TO_ADVANCED_PAGINATION) {
        this.paginationEllipsis.createEllipsis(index, qtdOfPages);
      } else {
        this.pages.push({
          selected: false,
          page_number: index + 1,
        });
      }
    }
  }

  private inLastPage(): boolean {
    if (this.totalPages() === this.currentPageNumber) {
      this.previousNextQuantity = 2;
    }
    return this.currentPageNumber === this.totalPages();
  }

  private inFirstPage(): boolean {
    if (this.currentPageNumber === 1) this.previousNextQuantity = 2;
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
}
