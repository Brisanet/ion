import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BorderDirectionType, DirectionType } from '../core/types';
import { IonTabProps, TabSize } from '../tab/tab.component';

export interface TabInGroup extends IonTabProps {
  selected: boolean;
}

export interface TabGroupProps {
  tabs: TabInGroup[];
  border?: BorderDirectionType;
  direction: DirectionType;
  size?: TabSize;
  selected: EventEmitter<TabInGroup>;
}

@Component({
  selector: 'ion-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class TabGroupComponent implements OnInit {
  @Input() tabs: TabInGroup[];
  @Input() direction: DirectionType = 'horizontal';
  @Input() border: BorderDirectionType;
  @Input() size: TabSize = 'sm';

  @Output() selected = new EventEmitter<TabInGroup>();

  ngOnInit(): void {
    this.border = this.getBorderByDirection(this.direction);
  }

  selectTab(tabSelected: TabInGroup): void {
    this.clearTabs();
    tabSelected.selected = true;
    this.selected.emit(tabSelected);
  }

  private getBorderByDirection(direction: DirectionType): BorderDirectionType {
    const directions = {
      horizontal: 'bottom',
      vertical: 'right',
    };

    if (this.border) {
      return this.border;
    }

    return directions[direction] as BorderDirectionType;
  }

  private clearTabs(): void {
    this.tabs.forEach((tab) => {
      tab.selected = false;
    });
  }
}
