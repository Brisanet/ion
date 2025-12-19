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
import { MOUSE_BUTTONS } from '../../utils/mouse-buttons';

@Component({
  selector: 'ion-sidebar-item',
  standalone: true,
  imports: [CommonModule, IonIconComponent, IonTooltipDirective],
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(mousedown)': 'onMouseDown($event)',
  },
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

  public onMouseDown(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }

    if (
      event.button === MOUSE_BUTTONS.LEFT ||
      event.button === MOUSE_BUTTONS.MIDDLE
    ) {
      if (event.button === MOUSE_BUTTONS.MIDDLE) {
        event.preventDefault();
        event.stopPropagation();
      }

      this.atClick.emit(event);
    }
  }
}
