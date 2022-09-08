import { Component, Input, OnInit } from '@angular/core';

interface Page {
  page_number: number;
  selected: boolean;
}

export interface IonPaginationProps {
  total: number;
  itemsPerPage?: number;
}

@Component({
  selector: 'ion-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() total: IonPaginationProps['total'];
  @Input() itemsPerPage: IonPaginationProps['itemsPerPage'] = 15;

  public pageList: Page[] = [];

  public selectPage(page: number) {
    this.pageList &&
      this.pageList.forEach((pageEach) => {
        pageEach.selected = false;
      });

    this.pageList[page - 1].selected = true;
  }

  private createPages(qtdOfPages: number) {
    for (let index = 0; index < qtdOfPages; index++) {
      this.pageList.push({
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
    return this.pageList.filter((page) => page.selected)[0];
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
    const selecteds = this.pageList.filter((page) => page.selected);
    return selecteds.length > 0 && !this.inLastPage();
  }

  ngOnInit() {
    this.createPages(this.totalPages());
    this.selectPage(1);
  }
}
