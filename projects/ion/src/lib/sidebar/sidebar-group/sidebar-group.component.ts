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
import { selectItemByIndex, unselectAllItems } from '../utils';

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
  @Input() haveGroupAction = false;
  @Output() atClick = new EventEmitter();
  @Output() atGroupClick = new EventEmitter();

  public closed = true;

  public toggleItemsVisibility(): void {
    this.closed = !this.closed;
  }

  public itemSelected(itemIndex: number): void {
    this.selected = true;
    selectItemByIndex(this.items, itemIndex);
    this.atClick.emit();
  }

  public groupSelected(): void {
    this.atGroupClick.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedChangedToFalse(changes)) {
      unselectAllItems(this.items);
    }
  }

  private selectedChangedToFalse(changes: SimpleChanges): boolean {
    return (
      !changes.firstChange && changes.selected && !changes.selected.currentValue
    );
  }
}
