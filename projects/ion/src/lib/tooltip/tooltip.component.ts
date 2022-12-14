import { Component } from '@angular/core';
import { TooltipColorScheme, TooltipPosition } from '../core/types';

export interface TooltipProps {
  ionTooltipTitle: string;
  ionTooltipColorScheme?: TooltipColorScheme;
}

@Component({
  selector: 'ion-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  ionTooltipTitle: string;
  ionTooltipColorScheme: TooltipColorScheme = 'dark';
  ionTooltipPosition: TooltipPosition = TooltipPosition.DEFAULT;
  left = 0;
  top = 0;
}
