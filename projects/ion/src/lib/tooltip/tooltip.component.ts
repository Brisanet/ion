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

  checkHostPositionOnPage(): void {
    const { top, left, height } = this.getCoordinates();

    const hostPosition = this.tooltipService.hostPosition;

    const TOOLTIP_MAX_WIDTH = 224;

    const { clientWidth, clientHeight } = document.body;

    if (clientWidth - hostPosition.right < TOOLTIP_MAX_WIDTH / 2) {
      this.ionTooltipPosition = TooltipPosition.CENTER_RIGHT;
    }

    if (clientHeight - hostPosition.bottom < height) {
      this.ionTooltipPosition = TooltipPosition.BOTTOM_CENTER;
    }

    if (left < 0) {
      this.ionTooltipPosition = TooltipPosition.CENTER_LEFT;
    }

    if (top < 0 && clientWidth - hostPosition.right < TOOLTIP_MAX_WIDTH / 2) {
      this.ionTooltipPosition = TooltipPosition.TOP_RIGHT;
    }

    if (
      clientHeight - hostPosition.bottom < height &&
      left < TOOLTIP_MAX_WIDTH / 2
    ) {
      this.ionTooltipPosition = TooltipPosition.BOTTOM_LEFT;
    }

    if (hostPosition.top < height / 2 && left < TOOLTIP_MAX_WIDTH / 2) {
      this.ionTooltipPosition = TooltipPosition.TOP_LEFT;
    }

    if (
      clientHeight - hostPosition.bottom < height &&
      clientWidth - hostPosition.right < TOOLTIP_MAX_WIDTH / 2
    ) {
      this.ionTooltipPosition = TooltipPosition.BOTTOM_RIGHT;
    }
  }

  getCoordinates(): DOMRect {
    return this.tooltip.nativeElement.getBoundingClientRect();
  }
}
