import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  viewChild,
} from '@angular/core';
import { IconType } from '../core/types/icon';
import { IonIconComponent } from '../icon/icon.component';
import { IonSpinnerComponent } from '../spinner/spinner.component';
import { IonTooltipDirective } from '../tooltip/tooltip.directive';
import {
  IconButtonRounding,
  IconButtonSize,
  IconButtonType,
} from '../core/types/icon-button';

@Component({
  selector: 'ion-icon-button',
  imports: [IonIconComponent, IonSpinnerComponent, IonTooltipDirective],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonIconButtonComponent {
  private tooltipDirective = viewChild(IonTooltipDirective);

  ariaLabel = input.required<string>();
  icon = input.required<IconType>();
  buttonType = input<'button' | 'submit' | 'reset'>('button');
  type = input<IconButtonType>('primary');
  size = input<IconButtonSize>('md');
  rounding = input<IconButtonRounding>('default');
  danger = input(false);
  disabled = input(false);
  ionOnClick = output<void>();
  loading = input(false);
  tooltip = input<string>();

  iconSize = computed(() => {
    const sizes: Record<IconButtonSize, number> = {
      sm: 16,
      md: 16,
      lg: 24,
    };

    return sizes[this.size()];
  });

  handleClick(): void {
    if (!this.loading() && !this.disabled()) {
      this.ionOnClick.emit();
    }
  }

  handleFocusIn(): void {
    this.tooltipDirective()?.onMouseEnter();
  }

  handleFocusOut(): void {
    this.tooltipDirective()?.onMouseLeave();
  }
}