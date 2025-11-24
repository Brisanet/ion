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
export const LIST_OF_PAGE_OPTIONS = [10, 25, 50, 100];
const VISIBLE_PAGES_DEFAULT_AMOUNT = 5;
const MIN_PAGES_SHOW_ADVANCED_PAG = 10;
const FIRST_PAGE = 1;

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
  @Input() openItemsPerPageAbove? = false;
  @Output() events = new EventEmitter<PageEvent>();

  public optionsPage?: DropdownItem[] = [];
  public labelPerPage = '';

  pages: Page[] = [];

  isAdvanced: boolean;

  moreBtnsConfig = {
    left: { hover: false, visible: true },
    right: { hover: false, visible: true },
  };

  currentVisibleButtons: Page[];

  changeIconHover(side: string, value: boolean): void {
    this.moreBtnsConfig[side].hover = value;
  }

  updateMoreBtnsVisibility(): void {
    const isFirstFourPages =
      this.currentPage().page_number < VISIBLE_PAGES_DEFAULT_AMOUNT;

    const isLastFourPages =
      this.currentPage().page_number > this.pages.length - 4;

    this.moreBtnsConfig.left.visible = !isFirstFourPages;
    this.moreBtnsConfig.right.visible = !isLastFourPages;
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

    if (changes.total) {
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
    this.updateMoreBtnsVisibility();
  }

  setPage(page = 1): void {
    if (page === 1) {
      this.remountPages();
    } else {
      this.selectPage(page);
    }
  }

  selectPageOnClick(pageNumber: number): void {
    if (pageNumber === this.page || this.loading) {
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
    this.updateMoreBtnsVisibility();
    this.currentVisibleButtons = this.nextVisibleButtons();
  }

  updateIsAdvanced(): void {
    this.isAdvanced = this.pages.length > MIN_PAGES_SHOW_ADVANCED_PAG;
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
      const pageToSelect =
        this.page > this.pages.length ? this.pages.length : this.page;
      this.selectPage(pageToSelect || 1, emitEvent);
    }
    this.updateIsAdvanced();
  }

  totalPages(): number {
    const numberOfPages = Math.ceil(this.total / this.itemsPerPage);
    return numberOfPages;
  }

  getSelectedItemsPerPageLabel(options: DropdownItem[]): string {
    const option = options.find((pageOption) => pageOption.selected);
    return (option && option.label) || this.generateLabel(this.itemsPerPage);
  }

  nextVisibleButtons(): Page[] {
    const currentPageIndex = this.pages.indexOf(this.currentPage());

    const startPageIndex = this.getStartPageIndex(currentPageIndex);

    const endPageIndex = this.getLastPageIndex(
      currentPageIndex,
      startPageIndex
    );

    return this.pages.slice(startPageIndex, endPageIndex + 1);
  }

  getStartPageIndex(currentIndex: number): number {
    const isLastThreePages = currentIndex > this.pages.length - 3;

    if (isLastThreePages) {
      return this.pages.length - VISIBLE_PAGES_DEFAULT_AMOUNT;
    } else {
      return Math.max(
        FIRST_PAGE,
        currentIndex - Math.floor(VISIBLE_PAGES_DEFAULT_AMOUNT / 2)
      );
    }
  }

  getLastPageIndex(currentIndex: number, startPageIndex: number): number {
    const isFirstThreePages = currentIndex < 3;

    if (isFirstThreePages) {
      return VISIBLE_PAGES_DEFAULT_AMOUNT - 1;
    } else {
      return Math.min(
        startPageIndex + VISIBLE_PAGES_DEFAULT_AMOUNT - 1,
        this.pages.length - 2
      );
    }
  }

  jumpPagesForward(): void {
    this.moreBtnsConfig.right.hover = false;
    const pageDestination = Math.min(
      this.pages.length,
      this.currentPage().page_number + VISIBLE_PAGES_DEFAULT_AMOUNT
    );
    this.selectPageOnClick(pageDestination);
  }

  jumpPagesBackward(): void {
    this.moreBtnsConfig.left.hover = false;
    const pageDestination = Math.max(
      FIRST_PAGE,
      this.currentPage().page_number - VISIBLE_PAGES_DEFAULT_AMOUNT
    );
    this.selectPageOnClick(pageDestination);
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
