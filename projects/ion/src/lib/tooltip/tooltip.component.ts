import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { TooltipColorScheme, TooltipPosition } from '../core/types';

@Component({
  selector: 'ion-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class IonTooltipComponent {
  @ViewChild('tooltip', { static: true }) tooltip: ElementRef;

  ionTooltipTitle: string;
  ionTooltipTemplateRef: TemplateRef<void>;
  ionTooltipColorScheme: TooltipColorScheme = 'dark';
  ionTooltipPosition: TooltipPosition = TooltipPosition.DEFAULT;
  ionTooltipVisible = false;
  left = 0;
  top = 0;

  getCoordinates() {
    return this.tooltip.nativeElement.getBoundingClientRect();
  }
}
