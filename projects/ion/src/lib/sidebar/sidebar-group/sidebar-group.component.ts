import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IconType } from '../../core/types';

interface Item {
  title: string;
  icon: IconType;
  selected?: boolean;
  action: () => void;
}

@Component({
  selector: 'ion-sidebar-group',
  templateUrl: './sidebar-group.component.html',
  styleUrls: ['./sidebar-group.component.scss'],
})
export class SidebarGroupComponent implements OnChanges {
  @Input() title = '';
  @Input() icon!: IconType;
  @Input() items: Item[] = [];
  @Input() selected = false;
  @Output() atClick = new EventEmitter();

  public closed = true;

  public itemSelected(itemIndex: number): void {
    this.selected = true;
    this.items.forEach((item) => (item.selected = false));
    this.items[itemIndex].selected = true;
    if (this.items[itemIndex].action) {
      this.items[itemIndex].action();
    }
    this.atClick.emit();
  }

  public toggleItemsVisibility(): void {
    this.closed = !this.closed;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      !changes.firstChange &&
      changes.selected &&
      !changes.selected.currentValue
    ) {
      this.items.forEach((item) => (item.selected = false));
    }
  }
}
