import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IconType } from '../../core/types';
import { Item } from '../../core/types/sidebar';

@Component({
  selector: 'ion-sidebar-group',
  templateUrl: './sidebar-group.component.html',
  styleUrls: ['./sidebar-group.component.scss'],
})
export class IonSidebarGroupComponent implements OnChanges {
  @Input() title = '';
  @Input() icon!: IconType;
  @Input() items: Item[] = [];
  @Input() selected = false;
  @Output() atClick = new EventEmitter();

  public closed = true;

  public itemSelected(itemIndex: number): void {
    this.selected = true;
    this.unselectAllItems();
    this.selectItem(itemIndex);
    this.callItemAction(itemIndex);
    this.atClick.emit();
  }

  public toggleItemsVisibility(): void {
    this.closed = !this.closed;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedChangedToFalse(changes)) {
      this.unselectAllItems();
    }
  }

  private selectedChangedToFalse(changes: SimpleChanges): boolean {
    return (
      !changes.firstChange && changes.selected && !changes.selected.currentValue
    );
  }

  private unselectAllItems(): void {
    this.items.forEach((item) => (item.selected = false));
  }

  private selectItem(index: number): void {
    this.items[index].selected = true;
  }

  private callItemAction(index: number): void {
    if (this.items[index].action) {
      this.items[index].action();
    }
  }
}
