import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TooltipColorScheme, TooltipPosition } from '../core/types';
import { TooltipService } from './tooltip.service';

const PADDING = 16;
const TOOLTIP_MAX_WIDTH = 208 + PADDING;

type PositionCheck = {
  check: () => boolean;
  position: TooltipPosition;
};

@Component({
  selector: 'ion-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class IonTooltipComponent implements AfterViewChecked {
  @ViewChild('tooltip', { static: true }) tooltip: ElementRef;

  ionTooltipTitle: string;
  ionTooltipTemplateRef: TemplateRef<void>;
  ionTooltipColorScheme: TooltipColorScheme = 'dark';
  ionTooltipPosition: TooltipPosition = TooltipPosition.DEFAULT;
  ionTooltipVisible = false;
  left = 0;
  top = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private tooltipService: TooltipService
  ) {}

  ngAfterViewChecked(): void {
    this.checkHostPositionOnPage();
    this.tooltipService.rerender.next(true);
    this.cdr.detectChanges();
  }

  private checkHostPositionOnPage(): void {
    const { left, height } = this.getCoordinates();

    const hostPosition = this.tooltipService.hostPosition;

    const { clientWidth, clientHeight } = document.body;

    if (!hostPosition) {
      return;
    }

    const positionChecks: PositionCheck[] = [
      {
        check: () => this.atRightEdge(clientWidth, hostPosition.right),
        position: TooltipPosition.CENTER_RIGHT,
      },
      {
        check: () =>
          this.atBottomEdge(clientHeight, hostPosition.bottom, height),
        position: TooltipPosition.BOTTOM_CENTER,
      },
      {
        check: () => this.atLeftEdge(left),
        position: TooltipPosition.CENTER_LEFT,
      },
      {
        check: () =>
          this.atTopEdge(hostPosition.top, height) &&
          this.atRightEdge(clientWidth, hostPosition.right),
        position: TooltipPosition.TOP_RIGHT,
      },
      {
        check: () =>
          this.atBottomEdge(clientHeight, hostPosition.bottom, height) &&
          this.atLeftEdge(left),
        position: TooltipPosition.BOTTOM_LEFT,
      },
      {
        check: () =>
          this.atTopEdge(hostPosition.top, height) && this.atLeftEdge(left),
        position: TooltipPosition.TOP_LEFT,
      },
      {
        check: () =>
          this.atBottomEdge(clientHeight, hostPosition.bottom, height) &&
          this.atRightEdge(clientWidth, hostPosition.right),
        position: TooltipPosition.BOTTOM_RIGHT,
      },
    ];

    for (const { check, position } of positionChecks) {
      if (check()) {
        this.ionTooltipPosition = position;
      }
    }
  }

  private getCoordinates(): DOMRect {
    return this.tooltip.nativeElement.getBoundingClientRect();
  }

  private atTopEdge(hostTop: number, height: number): boolean {
    return hostTop < (height + PADDING) / 2;
  }

  private atBottomEdge(
    screenHeight: number,
    hostBottom: number,
    height: number
  ): boolean {
    return screenHeight - hostBottom < height + PADDING;
  }

  private atLeftEdge(left: number): boolean {
    return left < TOOLTIP_MAX_WIDTH / 2;
  }

  private atRightEdge(screenWidth: number, hostRight: number): boolean {
    return screenWidth - hostRight < TOOLTIP_MAX_WIDTH / 2;
  }
}
