import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButtonComponent } from '../button/button.component';
import { DropdownItem } from '../core/types/dropdown';
import { IonPaginationProps, Page, PageEvent } from '../core/types/pagination';

export const ITEMS_PER_PAGE_DEFAULT = 10;
export const LIST_OF_PAGE_OPTIONS = [10, 25, 50, 100];
const VISIBLE_PAGES_DEFAULT_AMOUNT = 5;
const MIN_PAGES_SHOW_ADVANCED_PAG = 10;
const FIRST_PAGE = 1;

@Component({
  selector: 'ion-pagination',
  standalone: true,
  imports: [CommonModule, IonButtonComponent],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class IonPaginationComponent {
  total = input.required<IonPaginationProps['total']>();
  itemsPerPage = input<IonPaginationProps['itemsPerPage']>(
    ITEMS_PER_PAGE_DEFAULT
  );
  pageSizeOptions =
    input<IonPaginationProps['pageSizeOptions']>(LIST_OF_PAGE_OPTIONS);
  size = input<IonPaginationProps['size']>('md');
  allowChangeQtdItems = input<IonPaginationProps['allowChangeQtdItems']>(false);
  loading = input<boolean>(false);
  page = input<number>(1);
  openItemsPerPageAbove = input<boolean>(false);

  events = output<PageEvent>();

  public optionsPage = signal<DropdownItem[]>([]);
  public labelPerPage = signal<string>('');
  public pages = signal<Page[]>([]);
  public isAdvanced = signal<boolean>(false);
  public currentPage = signal<number>(1);
  public currentItemsPerPage = signal<number>(ITEMS_PER_PAGE_DEFAULT);

  moreBtnsConfig = signal({
    left: { hover: false, visible: true },
    right: { hover: false, visible: true },
  });

  currentVisibleButtons = computed(() => {
    const pages = this.pages();
    const currentPage = this.currentPage();
    const currentPageIndex = pages.findIndex(
      (p) => p.page_number === currentPage
    );

    if (currentPageIndex === -1) return [];

    const startPageIndex = this.getStartPageIndex(currentPageIndex, pages);
    const endPageIndex = this.getLastPageIndex(
      currentPageIndex,
      startPageIndex,
      pages
    );

    return this.getMiddlePages(pages, startPageIndex, endPageIndex);
  });

  private getMiddlePages(
    pages: Page[],
    startPageIndex: number,
    endPageIndex: number
  ) {
    // Recorta as páginas do meio
    const middle = pages.slice(startPageIndex, endPageIndex + 1);

    // Se houver 2 páginas ou menos, nada a excluir
    if (pages.length <= 2) return middle;

    // Identifica a primeira e última página da lista completa
    const firstPageNumber = pages[0].page_number;
    const lastPageNumber = pages[pages.length - 1].page_number;

    // Remove do meio as páginas inicial e final
    return middle.filter(
      (p) =>
        p.page_number !== firstPageNumber && p.page_number !== lastPageNumber
    );
  }

  constructor() {
    effect(() => {
      // Initialize state from inputs
      this.currentItemsPerPage.set(this.itemsPerPage() as number);
      this.currentPage.set(this.page() || 1);
    });

    effect(() => {
      this.total();
      this.currentItemsPerPage();
      untracked(() => this.remountPages());
    });

    effect(() => {
      this.updateOptionsPage();
    });
  }

  changeIconHover(side: 'left' | 'right', value: boolean): void {
    this.moreBtnsConfig.update((config) => ({
      ...config,
      [side]: { ...config[side], hover: value },
    }));
  }

  updateMoreBtnsVisibility(): void {
    const currentPage = this.currentPage();
    const totalPages = this.pages().length;

    const isFirstFourPages = currentPage < VISIBLE_PAGES_DEFAULT_AMOUNT;
    const isLastFourPages = currentPage > totalPages - 4;

    this.moreBtnsConfig.update((config) => ({
      left: { ...config.left, visible: !isFirstFourPages },
      right: { ...config.right, visible: !isLastFourPages },
    }));
  }

  changeItemsPerPage(itemsSelected: DropdownItem[]): void {
    if (!this.loading()) {
      const newItemsPerPage = Number(
        itemsSelected[0].label.split(' / página')[0]
      );
      this.currentItemsPerPage.set(newItemsPerPage);
      this.remountPages();
      this.updateOptionsPage();
    }
  }

  setPage(page = 1): void {
    if (page === 1) {
      this.remountPages();
    } else {
      this.selectPage(page);
    }
  }

  selectPageOnClick(pageNumber: number): void {
    if (pageNumber === this.currentPage() || this.loading()) {
      return;
    }
    this.selectPage(pageNumber);
  }

  selectPage(pageNumber = 1, emitEvent = true): void {
    const pages = this.pages();
    if (pages.length === 0 && !this.loading()) return;

    // Update selected status in pages array (if needed for display, though we use currentPage signal)
    const updatedPages = pages.map((p) => ({
      ...p,
      selected: p.page_number === pageNumber,
    }));
    this.pages.set(updatedPages);
    this.currentPage.set(pageNumber);

    if (emitEvent) {
      this.events.emit({
        actual: pageNumber,
        itemsPerPage: this.currentItemsPerPage(),
        offset: (pageNumber - 1) * this.currentItemsPerPage(),
      });
    }

    this.updateMoreBtnsVisibility();
  }

  hasPrevious(): boolean {
    return this.currentPage() > 1;
  }

  hasNext(): boolean {
    return this.currentPage() < this.totalPages();
  }

  previous(): void {
    if (this.hasPrevious() && !this.loading()) {
      this.selectPage(this.currentPage() - 1);
    }
  }

  next(): void {
    if (this.hasNext() && !this.loading()) {
      this.selectPage(this.currentPage() + 1);
    }
  }

  remountPages(emitEvent = true): void {
    const total = this.total();
    const itemsPerPage = this.currentItemsPerPage();
    const numberOfPages = Math.ceil(total / itemsPerPage);

    const newPages: Page[] = [];
    for (let index = 0; index < numberOfPages; index++) {
      newPages.push({
        selected: false,
        page_number: index + 1,
      });
    }
    this.pages.set(newPages);

    if (newPages.length) {
      const pageToSelect =
        (this.currentPage() || 1) > newPages.length
          ? newPages.length
          : ((this.currentPage() || 1) as number);
      this.selectPage(pageToSelect, emitEvent);
    }

    this.isAdvanced.set(newPages.length > MIN_PAGES_SHOW_ADVANCED_PAG);
    this.updateMoreBtnsVisibility();
  }

  totalPages(): number {
    return Math.ceil(this.total() / this.currentItemsPerPage());
  }

  getSelectedItemsPerPageLabel(options: DropdownItem[]): string {
    const option = options.find((pageOption) => pageOption.selected);
    return (
      (option && option.label) || this.generateLabel(this.currentItemsPerPage())
    );
  }

  getStartPageIndex(currentIndex: number, pages: Page[]): number {
    const isLastThreePages = currentIndex > pages.length - 3;

    if (isLastThreePages) {
      return pages.length - VISIBLE_PAGES_DEFAULT_AMOUNT;
    } else {
      return Math.max(
        0, // Index is 0-based
        currentIndex - Math.floor(VISIBLE_PAGES_DEFAULT_AMOUNT / 2)
      );
    }
  }

  getLastPageIndex(
    currentIndex: number,
    startPageIndex: number,
    pages: Page[]
  ): number {
    const isFirstThreePages = currentIndex < 3;

    if (isFirstThreePages) {
      return VISIBLE_PAGES_DEFAULT_AMOUNT - 1;
    } else {
      return Math.min(
        startPageIndex + VISIBLE_PAGES_DEFAULT_AMOUNT - 1,
        pages.length - 1 // Index is 0-based
      );
    }
  }

  jumpPagesForward(): void {
    this.changeIconHover('right', false);
    const pageDestination = Math.min(
      this.pages().length,
      this.currentPage() + VISIBLE_PAGES_DEFAULT_AMOUNT
    );
    this.selectPageOnClick(pageDestination);
  }

  jumpPagesBackward(): void {
    this.changeIconHover('left', false);
    const pageDestination = Math.max(
      FIRST_PAGE,
      this.currentPage() - VISIBLE_PAGES_DEFAULT_AMOUNT
    );
    this.selectPageOnClick(pageDestination);
  }

  private generateLabel(page: number): string {
    return `${page} / página`;
  }

  private updateOptionsPage(): void {
    const pageSizeOptions = this.pageSizeOptions() || [];
    const options = pageSizeOptions.map((quantityOfPages) => {
      return {
        label: this.generateLabel(quantityOfPages),
        selected: this.isASelectedOption(quantityOfPages),
      };
    });
    this.optionsPage.set(options);
    this.labelPerPage.set(this.getSelectedItemsPerPageLabel(options));
  }

  private isASelectedOption(quantityOfPages: number): boolean {
    const pageSizeOptions = this.pageSizeOptions() || [];
    return (
      pageSizeOptions.includes(this.currentItemsPerPage()) &&
      this.currentItemsPerPage() === quantityOfPages
    );
  }
}
