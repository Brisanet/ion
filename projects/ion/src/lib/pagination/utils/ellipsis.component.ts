import { IonPaginationComponent } from '../pagination.component';

export class IonPaginationEllipsisComponent {
  constructor(private paginationComponent: IonPaginationComponent) {}

  createEllipsis(index: number, qtdOfPages: number): void {
    if (index == 1) {
      this.createBothEllipsis(-1);
    } else if (index == qtdOfPages - 1) {
      this.createBothEllipsis(0);
    }
    this.paginationComponent.pages.push({
      selected: false,
      page_number: index + 1,
    });
  }

  createBothEllipsis(number: number): number {
    return this.paginationComponent.pages.push({
      selected: false,
      page_number: number,
    });
  }

  skipEllipsis(pageNumber: number): number {
    if (pageNumber === 1) return pageNumber - 1;
    else if (pageNumber === this.paginationComponent.pages.length - 2)
      return pageNumber + 1;
    else return pageNumber;
  }

  hidePageNumber(pageNumber: number): boolean {
    return (
      (pageNumber <
        this.paginationComponent.currentPageNumber -
          this.paginationComponent.previousNextQuantity ||
        pageNumber >
          this.paginationComponent.currentPageNumber +
            this.paginationComponent.previousNextQuantity) &&
      pageNumber !== this.paginationComponent.totalPages() &&
      pageNumber !== 1 &&
      pageNumber !== -1 &&
      pageNumber !== 0
    );
  }
}
