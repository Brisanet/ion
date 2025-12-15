import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IonIconComponent } from '../../icon/icon.component';
import { IonTooltipDirective } from '../../tooltip/tooltip.directive';
import { IconType, TooltipPosition } from '../../core/types';

@Component({
  selector: 'ion-sidebar-item',
  standalone: true,
  imports: [CommonModule, IonIconComponent, IonTooltipDirective],
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonSidebarItemComponent {
  public TooltipPosition = TooltipPosition;
  title = input<string>('');
  icon = input<IconType>('');
  selectable = input<boolean>(true);
  selected = input<boolean>(false);
  disabled = input<boolean>(false);
  shrinkMode = input<boolean>(false);
  sidebarClosed = input<boolean>(true);
  inGroup = input<boolean>(false);
  atClick = output<MouseEvent>();

  public selectItem(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }
    this.atClick.emit(event);
  }
}
