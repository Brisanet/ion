import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  BorderDirectionType,
  DirectionType,
  TabInGroup,
  TabSize,
} from '../core/types';

@Component({
  selector: 'ion-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class IonTabGroupComponent implements OnInit, OnChanges {
  @Input() tabs: TabInGroup[];
  @Input() direction: DirectionType = 'horizontal';
  @Input() border: BorderDirectionType = 'bottom';
  @Input() size: TabSize = 'sm';

  @Output() selected = new EventEmitter<TabInGroup>();

  ngOnInit(): void {
    this.border = this.getBorderByDirection(this.direction);
    this.direction = this.getDirectionByBorder(this.border);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.direction) {
      this.border = this.getBorderByDirection(this.direction);
    }
    if (changes.border) {
      this.direction = this.getDirectionByBorder(this.border);
    }
  }

  selectTab(tabSelected: TabInGroup): void {
    this.clearTabs();
    tabSelected.selected = true;
    this.selected.emit(tabSelected);
  }

  private getBorderByDirection(direction: DirectionType): BorderDirectionType {
    const directions: { [key in DirectionType]: BorderDirectionType } = {
      horizontal: 'bottom',
      vertical: 'right',
    };

    if (this.isBorderDirectionCorrect(direction)) {
      return this.border;
    }

    return directions[direction];
  }

  private getDirectionByBorder(border: BorderDirectionType): DirectionType {
    const directions: {
      [key in BorderDirectionType]: DirectionType;
    } = {
      left: 'vertical',
      right: 'vertical',
      top: 'horizontal',
      bottom: 'horizontal',
    };

    return directions[border];
  }

  private isBorderDirectionCorrect(direction: DirectionType): boolean {
    const directions = {
      horizontal: this.border === 'top' || this.border === 'bottom',
      vertical: this.border === 'left' || this.border === 'right',
    };

    return directions[direction];
  }

  private clearTabs(): void {
    this.tabs.forEach((tab) => {
      tab.selected = false;
    });
  }
}
