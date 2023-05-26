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
  @Input() pageSizeOptions: IonPaginationProps['pageSizeOptions'] =
    LIST_OF_PAGE_OPTIONS;
  @Input() size: IonPaginationProps['size'] = 'md';
  @Input() allowChangeQtdItems: IonPaginationProps['allowChangeQtdItems'];
  @Input() loading = false;
  @Input() page = 0;
  @Output() events = new EventEmitter<PageEvent>();

  public optionsPage?: DropdownItem[] = [];
  public labelPerPage = '';

  pages: Page[] = [];

  hoverControl = {
    left: false,
    right: false,
  };

  isAdvanced: boolean;

  changeHover(side: string, value: boolean): void {
    this.hoverControl[side] = value;
  }

  changeItemsPerPage(itemsSelected: DropdownItem[]): void {
    if (!this.loading) {
      this.itemsPerPage = Number(itemsSelected[0].label.split(' / página')[0]);
      this.remountPages();
      this.labelPerPage = this.getSelectedItemsPerPageLabel(this.optionsPage);
      this.updateIsAdvanced();
    }
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
    this.updateIsAdvanced();
  }

  setPage(page = 1): void {
    if (page === 1) {
      this.remountPages();
    } else {
      this.selectPage(page);
    }
  }

  selectPageOnClick(pageNumber: number): void {
    if (pageNumber === this.page) {
      return;
    }
    this.selectPage(pageNumber);
  }

  selectPage(pageNumber = 1, emitEvent = true): void {
    if (this.pages && !this.loading) {
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

  updateIsAdvanced(): void {
    this.isAdvanced = this.pages.length > 10;
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
    if (!this.inFirstPage() && !this.loading) {
      this.selectPage(this.currentPage().page_number - 1);
    }
  }

  next(): void {
    if (!this.inLastPage() && !this.loading) {
      this.selectPage(this.currentPage().page_number + 1);
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

  getSelectedItemsPerPageLabel(options: DropdownItem[]): string {
    const option = options.find((pageOption) => pageOption.selected);
    return (option && option.label) || this.generateLabel(this.itemsPerPage);
  }

  visiblePages(): Page[] {
    const currentPage = this.currentPage().page_number;
    const pagesLength = this.pages.length;
    const currentPageIndex = this.pages.indexOf(this.currentPage());

    if (currentPage < 4) {
      return this.pages.slice(1, 5);
    } else if (currentPage === 4) {
      return this.pages.slice(1, 6);
    } else if (currentPage <= pagesLength - 3) {
      return this.pages.slice(currentPageIndex - 2, currentPageIndex + 3);
    } else if (currentPage < pagesLength - 2) {
      return this.pages.slice(currentPageIndex - 1, currentPageIndex + 3);
    } else if (currentPage < pagesLength - 1) {
      return this.pages.slice(currentPageIndex - 2, currentPageIndex + 2);
    } else if (currentPage < pagesLength) {
      return this.pages.slice(currentPageIndex - 3, currentPageIndex + 1);
    } else {
      return this.pages.slice(currentPageIndex - 4, currentPageIndex);
    }
  }

  skipPages(): void {
    if (this.currentPage().page_number >= this.pages.length - 4) {
      this.selectPageOnClick(this.pages.length);
      return;
    }
    this.selectPageOnClick(this.currentPage().page_number + 5);
  }

  jumpBackwards(): void {
    if (this.currentPage().page_number <= 6) {
      this.selectPageOnClick(1);
      return;
    }
    this.selectPageOnClick(this.currentPage().page_number - 5);
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
    const currentPageCopy = this.currentPage();
    return currentPageCopy && currentPageCopy.page_number === this.totalPages();
  }

  private inFirstPage(): boolean {
    const currentPageCopy = this.currentPage();
    return currentPageCopy && currentPageCopy.page_number === 1;
  }

  private generateLabel(page: number): string {
    return `${page} / página`;
  }

  private getOptionsPage(): DropdownItem[] {
    return this.pageSizeOptions.map((quantityOfPages) => {
      return {
        label: this.generateLabel(quantityOfPages),
        selected: this.isASelectedOption(quantityOfPages),
      };
    });
  }

  private isASelectedOption(quantityOfPages: number): boolean {
    return (
      this.pageSizeOptions.includes(this.itemsPerPage) &&
      this.itemsPerPage === quantityOfPages
    );
  }
}
