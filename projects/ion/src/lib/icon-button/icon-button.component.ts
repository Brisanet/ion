import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { IconType } from '../core/types/icon';
import { IonIconComponent } from '../icon/icon.component';
import {
  IconButtonRounding,
  IconButtonSize,
  IconButtonVariant,
} from '../core/types/icon-button';

@Component({
  selector: 'ion-icon-button',
  imports: [IonIconComponent],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonIconButtonComponent {
  ariaLabel = input.required<string>();
  icon = input.required<IconType>();
  variant = input<IconButtonVariant>('primary');
  size = input<IconButtonSize>('medium');
  rounding = input<IconButtonRounding>('default');
  danger = input(false);
  disabled = input(false);
  ionOnClick = output<void>();

  iconSize = computed(() => {
    const sizes: Record<IconButtonSize, number> = {
      small: 16,
      medium: 16,
      large: 24,
    };

    return sizes[this.size()];
  });
}