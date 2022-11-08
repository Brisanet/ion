import { DropdownItem } from './../dropdown/dropdown.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Page {
  page_number: number;
  selected: boolean;
}

interface PageEvent {
  actual: number;
}

export interface IonPaginationProps {
  total: number;
  itemsPerPage?: number;
  size?: string;
  events?: EventEmitter<PageEvent>;
  allowChangeQtdItems?: boolean;
}

const defaultItemsPerPage = 10;

@Component({
  selector: 'ion-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() total: IonPaginationProps['total'];
  @Input() itemsPerPage: IonPaginationProps['itemsPerPage'] =
    defaultItemsPerPage;
  @Input() size: IonPaginationProps['size'] = 'md';
  @Input() allowChangeQtdItems: IonPaginationProps['allowChangeQtdItems'];
  @Output() events = new EventEmitter<PageEvent>();

  pages: Page[] = [];

  optionsPage = [
    { label: '10', selected: true },
    { label: '30' },
    { label: '40' },
    { label: '46' },
  ];

  labelSelect = '10';

  showDropdown = false;
  onClickSelect(): void {
    this.showDropdown = !this.showDropdown;
  }

  remountPages(pagina: number): void {
    this.pages = [];
    this.createPages(this.totalPages());
    this.selectPage(pagina);
  }

  SelectDropdown(selectedItems: DropdownItem[]): void {
    this.remountPages(
      Math.ceil(parseInt(selectedItems[0].label) / this.itemsPerPage)
    );
  }

  ngOnInit(): void {
    this.createPages(this.totalPages());
    this.selectPage(1);
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

  totalPages(): number {
    const numberOfPages = Math.ceil(this.total / this.itemsPerPage);
    return numberOfPages;
  }

  private createPages(qtdOfPages: number): void {
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
