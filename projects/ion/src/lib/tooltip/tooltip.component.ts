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
  ionTooltipCustomClass = '';
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
    const coordinates = this.tooltip.nativeElement.getBoundingClientRect();

    this.tooltipService.setTooltipCoordinates(coordinates);
    this.tooltipService.setCurrentPosition(this.ionTooltipPosition);
    this.ionTooltipPosition = this.tooltipService.getNewPosition();
    this.tooltipService.emitReposition();
  }
}
