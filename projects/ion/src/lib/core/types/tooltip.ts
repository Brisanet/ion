import { TemplateRef } from '@angular/core';

export type TooltipColorScheme = 'light' | 'dark';

export enum TooltipPosition {
  CENTER_RIGHT = 'centerRight',
  CENTER_LEFT = 'centerLeft',
  TOP_RIGHT = 'topRight',
  TOP_CENTER = 'topCenter',
  TOP_LEFT = 'topLeft',
  BOTTOM_RIGHT = 'bottomRight',
  BOTTOM_CENTER = 'bottomCenter',
  BOTTOM_LEFT = 'bottomLeft',
  DEFAULT = 'topCenter',
}

export enum TooltipTrigger {
  CLICK = 'click',
  HOVER = 'hover',
  DEFAULT = 'hover',
}

export interface TooltipProps {
  ionTooltipTitle: string;
  ionTooltipColorScheme?: TooltipColorScheme;
  ionTooltipPosition?: TooltipPosition;
  ionTooltipArrowPointAtCenter?: boolean;
  ionTooltipTrigger?: TooltipTrigger;
  ionTooltipShowDelay?: number;
  ionTooltipTemplateRef?: TemplateRef<any>;
  ionTooltipContext?: unknown;
}
