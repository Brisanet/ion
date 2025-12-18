import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { IconType, TooltipPosition } from '../../core/types';
import { Item } from '../../core/types/sidebar';
import { IonIconComponent } from '../../icon/icon.component';
import { IonSidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { selectItemByIndex, unselectAllItems } from '../utils';
import { IonTooltipDirective } from '../../tooltip/tooltip.directive';

@Component({
  selector: 'ion-sidebar-group',
  standalone: true,
  imports: [
    CommonModule,
    IonIconComponent,
    IonSidebarItemComponent,
    IonTooltipDirective,
  ],
  templateUrl: './sidebar-group.component.html',
  styleUrls: ['./sidebar-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonSidebarGroupComponent {
  public TooltipPosition = TooltipPosition;
  title = input<string>('');
  icon = input.required<IconType>();
  items = input<Item[]>([]);
  selected = input<boolean>(false);
  haveGroupAction = input<boolean>(false);
  shrinkMode = input<boolean>(false);
  sidebarClosed = input<boolean>(true);
  atClick = output<MouseEvent>();
  atGroupClick = output<MouseEvent>();

  public closed = signal<boolean>(true);
  public headerIconHovered = signal<boolean>(false);

  public changeIconHover(mouseEnter: boolean): void {
    if ((this.shrinkMode() && !this.sidebarClosed()) || !this.shrinkMode()) {
      return;
    }

    this.headerIconHovered.set(mouseEnter);
  }

  public toggleItemsVisibility(): void {
    this.closed.update((current) => !current);
  }

  public itemSelected(itemIndex: number, event: MouseEvent): void {
    selectItemByIndex(this.items(), itemIndex, event);
    this.atClick.emit(event);
  }

  public groupSelected(event: MouseEvent): void {
    this.atGroupClick.emit(event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedChangedToFalse(changes)) {
      unselectAllItems(this.items());
    }
  }

  private selectedChangedToFalse(changes: SimpleChanges): boolean {
    return (
      !changes['firstChange'] &&
      changes['selected'] &&
      !changes['selected'].currentValue
    );
  }
}
