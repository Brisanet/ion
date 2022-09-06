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

  private pages: Page[] = [];

  public selectPage(page: number) {
    console.log('page ->', page);
    this.pages &&
      this.pages.forEach((pageEach) => {
        pageEach.selected = false;
      });
    console.log('this.pages ->', this.pages);
    this.pages[page - 1].selected = true;
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

  public hasNextPage(): boolean {
    return this.currentPage().page_number !== this.totalPages();
  }

  ngOnInit() {
    this.createPages(this.totalPages());
    this.selectPage(1);
  }
}
