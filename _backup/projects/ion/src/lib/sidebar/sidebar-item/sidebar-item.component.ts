import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconType } from '../../core/types';

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

  public selectItem(event: MouseEvent): void {
    this.atClick.emit(event);
    if (!this.selectable) {
      return;
    }
    this.selected = true;
  }
}
