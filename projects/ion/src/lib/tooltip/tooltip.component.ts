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
import { SafeAny } from '../utils/safe-any';

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
    this.repositionTooltip();
    this.tooltipService.rerender.next(true);
    this.cdr.detectChanges();
  }

  private repositionTooltip(): void {
    const { left, height } = this.getCoordinates();

    const hostPosition = this.tooltipService.hostPosition;

    const { clientWidth, clientHeight } = document.body;

    if (!hostPosition) {
      return;
    }

    const positionChecks: PositionCheck[] = this.getTooltipPositions(
      left,
      height,
      hostPosition,
      clientWidth,
      clientHeight
    );

    this.checkHostPositionOnPage(positionChecks);
  }

  private getCoordinates(): DOMRect {
    return this.tooltip.nativeElement.getBoundingClientRect();
  }

  private getTooltipPositions(
    tooltipLeft: number,
    tooltipHeight: number,
    hostPosition: SafeAny,
    screenWidth: number,
    screenHeight: number
  ): PositionCheck[] {
    return [
      {
        check: () => this.atRightEdge(screenWidth, hostPosition.right),
        position: TooltipPosition.CENTER_RIGHT,
      },
      {
        check: () =>
          this.atBottomEdge(screenHeight, hostPosition.bottom, tooltipHeight),
        position: TooltipPosition.BOTTOM_CENTER,
      },
      {
        check: () => this.atLeftEdge(tooltipLeft),
        position: TooltipPosition.CENTER_LEFT,
      },
      {
        check: () =>
          this.atTopEdge(hostPosition.top, tooltipHeight) &&
          this.atRightEdge(screenWidth, hostPosition.right),
        position: TooltipPosition.TOP_RIGHT,
      },
      {
        check: () =>
          this.atBottomEdge(screenHeight, hostPosition.bottom, tooltipHeight) &&
          this.atLeftEdge(tooltipLeft),
        position: TooltipPosition.BOTTOM_LEFT,
      },
      {
        check: () =>
          this.atTopEdge(hostPosition.top, screenHeight) &&
          this.atLeftEdge(tooltipLeft),
        position: TooltipPosition.TOP_LEFT,
      },
      {
        check: () =>
          this.atBottomEdge(screenHeight, hostPosition.bottom, tooltipHeight) &&
          this.atRightEdge(screenWidth, hostPosition.right),
        position: TooltipPosition.BOTTOM_RIGHT,
      },
    ];
  }

  private atRightEdge(screenWidth: number, hostRight: number): boolean {
    return screenWidth - hostRight < TOOLTIP_MAX_WIDTH / 2;
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

  private atTopEdge(hostTop: number, height: number): boolean {
    return hostTop < (height + PADDING) / 2;
  }

  private checkHostPositionOnPage(positions: PositionCheck[]): void {
    for (const { check, position } of positions) {
      if (check()) {
        this.ionTooltipPosition = position;
      }
    }
  }
}
