import { IonPaginationComponent } from '../pagination.component';

export interface Limit {
  leftLimit: number;
  showLeftEllipsis: boolean;
  firstPages: boolean;
}
export class IonPaginationEllipsisComponent {
  constructor(private paginationComponent: IonPaginationComponent) {}

  createEllipsis(index: number, qtdOfPages: number): void {
    if (index === 1) {
      this.createBothEllipsis(-1);
    }
    if (index === qtdOfPages - 1) {
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
    if (pageNumber === this.paginationComponent.pages.length - 2)
      return pageNumber + 1;
    else return pageNumber;
  }

  shouldHide(pageNumber: number): boolean {
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

  isLimit(pageNumber: number): Limit {
    const leftLimit =
      this.paginationComponent.currentPageNumber -
      this.paginationComponent.previousNextQuantity;
    const showLeftEllipsis =
      this.paginationComponent.currentPageNumber - 1 >
      this.paginationComponent.previousNextQuantity + 1;
    const firstPages =
      this.paginationComponent.currentPageNumber < 5 && pageNumber <= 5;

    return {
      leftLimit,
      showLeftEllipsis,
      firstPages,
    };
  }

  shouldShowPageNumber(pageNumber: number, limitFunction: Limit): boolean {
    if (
      limitFunction.firstPages ||
      pageNumber === this.paginationComponent.totalPages()
    ) {
      return false;
    }
    if (this.withinEndRange()) {
      return this.isPageNearEnd(pageNumber, limitFunction);
    }
    return this.shouldHide(pageNumber);
  }

  pageRangeEllipsis(pageNumber: number): boolean {
    const limitFunction = this.isLimit(pageNumber);
    if (this.paginationComponent.totalPages() <= 9) {
      return false;
    }
    if (pageNumber === -1) {
      return !limitFunction.showLeftEllipsis;
    }
    return this.shouldShowPageNumber(pageNumber, limitFunction);
  }

  withinEndRange(): boolean {
    return (
      this.paginationComponent.currentPageNumber >=
      this.paginationComponent.totalPages() - 3
    );
  }

  isPageNearEnd(pageNumber: number, limitFunction: Limit): boolean {
    if (this.withinEndRange()) {
      const isLast =
        pageNumber === 1 ||
        pageNumber >= this.paginationComponent.totalPages() - 4;
      const beyondPages = pageNumber >= limitFunction.leftLimit;
      return !isLast && !beyondPages;
    }
    return false;
  }
}
