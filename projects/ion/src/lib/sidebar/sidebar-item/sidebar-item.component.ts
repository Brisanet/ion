import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

import { IconType } from '../../core/types';
import { MOUSE_BUTTONS } from '../../utils/mouse-buttons';

@Component({
  selector: 'ion-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
})
export class IonSidebarItemComponent {
  @Input() title = '';
  @Input() icon: IconType = '';
  @Input() selectable = true;
  @Input() selected = false;
  @Input() disabled = false;
  @Input() shrinkMode = false;
  @Input() sidebarClosed = true;
  @Input() inGroup = false;
  @Output() atClick = new EventEmitter<MouseEvent>();

  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: MouseEvent): void {
    if (
      event.button === MOUSE_BUTTONS.LEFT ||
      event.button === MOUSE_BUTTONS.MIDDLE
    ) {
      if (event.button === MOUSE_BUTTONS.MIDDLE) {
        event.preventDefault();
        event.stopPropagation();
      }

      this.atClick.emit(event);

      if (event.button === MOUSE_BUTTONS.LEFT && this.selectable) {
        this.selected = true;
      }
    }
  }
}
