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
export const TOOLTIP_MAX_WIDTH = 208 + PADDING;

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
    this.cdr.detectChanges();
  }

  private repositionTooltip(): void {
    this.sendCoordinates();
    this.tooltipService.screenSize = document.body;
    this.ionTooltipPosition = this.tooltipService.getNewPosition();
    this.tooltipService.reposition.next();
  }

  private sendCoordinates(): void {
    this.tooltipService.tootipCoordinates =
      this.tooltip.nativeElement.getBoundingClientRect();
  }
}
