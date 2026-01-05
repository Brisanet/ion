import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonIconComponent } from '../icon/icon.component';
import { IonTooltipDirective } from '../tooltip/tooltip.directive';
import { TooltipProps } from '../core/types/tooltip';
import { TooltipPosition, TooltipTrigger } from '../core/types/tooltip';

@Component({
  selector: 'ion-card-header',
  standalone: true,
  imports: [CommonModule, IonIconComponent, IonTooltipDirective],
  template: `
    <div class="card-ion-header-title">
      @if (icon()) {
        <ion-icon
          [type]="icon()!"
          class="icon-title"
          data-testid="icon-title"
        ></ion-icon>
      }
      @if (title()) {
        <h4 data-testid="cardHeader">{{ title() }}</h4>
      } @else {
        <ng-content></ng-content>
      }
      @if (tooltip(); as tooltipConfig) {
        <ion-icon
          type="information"
          class="icon-info"
          data-testid="icon-info"
          [size]="16"
          ionTooltip
          [ionTooltipTitle]="tooltipConfig.ionTooltipTitle"
          [ionTooltipPosition]="
            tooltipConfig.ionTooltipPosition ?? TooltipPosition.CENTER_LEFT
          "
          [ionTooltipArrowPointAtCenter]="
            tooltipConfig.ionTooltipArrowPointAtCenter || true
          "
          [ionTooltipColorScheme]="
            tooltipConfig.ionTooltipColorScheme || 'dark'
          "
          [ionTooltipTrigger]="
            tooltipConfig.ionTooltipTrigger ?? TooltipTrigger.HOVER
          "
          [ionTooltipShowDelay]="tooltipConfig.ionTooltipShowDelay || 0"
        ></ion-icon>
      }
    </div>
    <div class="card-ion-header-actions" data-testid="header-actions">
      <ng-content select="[slot=actions]"></ng-content>
    </div>
  `,
  styleUrls: ['./card-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonCardHeaderComponent {
  title = input<string>();
  icon = input<string>();
  tooltip = input<TooltipProps>();

  protected readonly TooltipPosition = TooltipPosition;
  protected readonly TooltipTrigger = TooltipTrigger;
}
