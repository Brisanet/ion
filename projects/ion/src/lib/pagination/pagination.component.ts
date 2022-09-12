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

@Component({
  selector: 'ion-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() total: IonPaginationProps['total'];
  @Input() itemsPerPage: IonPaginationProps['itemsPerPage'] = 15;
  @Input() size: IonPaginationProps['size'] = 'md';
  @Output() events = new EventEmitter<PageEvent>();

  public pages: Page[] = [];

  public selectPage(pageNumber: number) {
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

  private createPages(qtdOfPages: number) {
    for (let index = 0; index < qtdOfPages; index++) {
      this.pages.push({
        selected: false,
        page_number: index + 1,
      });
    }
  }

  public totalPages(): number {
    const numberOfPages = Math.ceil(this.total / this.itemsPerPage);
    return numberOfPages;
  }

  private currentPage(): Page {
    return this.pages.filter((page) => page.selected)[0];
  }

  private inLastPage() {
    return this.currentPage().page_number === this.totalPages();
  }

  private inFirstPage() {
    return this.currentPage().page_number === 1;
  }

  public hasPrevious() {
    return !this.inFirstPage();
  }

  public hasNext() {
    const selecteds = this.pages.filter((page) => page.selected);
    return selecteds.length > 0 && !this.inLastPage();
  }

  previous() {
    if (!this.inFirstPage()) {
      this.selectPage(this.currentPage().page_number - 1);
    }
  }

  next() {
    if (!this.inLastPage()) {
      this.selectPage(this.currentPage().page_number + 1);
    }
  }

  ngOnInit() {
    this.createPages(this.totalPages());
    this.selectPage(1);
  }
}
