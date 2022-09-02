import { Component, Input, OnInit } from '@angular/core';

interface Page {
  index: number;
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

  private selectPage(index: number) {
    this.pages[index].selected = true;
  }

  private createPages(qtdOfPages: number) {
    for (let index = 0; index < qtdOfPages; index++) {
      this.pages.push({
        selected: false,
        index: index + 1,
      });
    }
  }

  public totalPages(): number {
    const numberOfPages = Math.ceil(this.total / this.itemsPerPage);
    this.createPages(numberOfPages);
    return numberOfPages;
  }

  private currentPage(): Page {
    return this.pages.filter((page) => page.selected)[0];
  }

  public hasNextPage(): boolean {
    return this.currentPage().index !== this.totalPages();
  }

  ngOnInit() {
    this.totalPages();
    this.selectPage(0);
  }
}
