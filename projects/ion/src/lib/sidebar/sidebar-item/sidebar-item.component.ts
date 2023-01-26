import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconType } from '../../icon/icon.component';

@Component({
  selector: 'ion-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
})
export class SidebarItemComponent {
  @Input() title = '';
  @Input() icon: IconType = '';
  @Input() selected = false;
  @Input() disabled = false;
  @Output() atClick = new EventEmitter();

  public selectItem(): void {
    this.selected = true;
    this.atClick.emit();
  }
}
