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
  @Input() shrinkMode = false;
  @Input() sidebarClosed = true;
  @Output() atClick = new EventEmitter<MouseEvent>();
  @Output() atGroupClick = new EventEmitter();

  public closed = true;

  headerIconHovered = false;

  public changeIconHover(mouseEnter: boolean): void {
    if ((this.shrinkMode && !this.sidebarClosed) || !this.shrinkMode) {
      return;
    }

    this.headerIconHovered = mouseEnter;
  }

  public toggleItemsVisibility(): void {
    this.closed = !this.closed;
  }

  public itemSelected(itemIndex: number, event: MouseEvent): void {
    this.selected = true;
    selectItemByIndex(this.items, itemIndex, event);
    this.atClick.emit(event);
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
