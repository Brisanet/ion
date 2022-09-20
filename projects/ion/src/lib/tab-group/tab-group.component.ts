import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonTabProps, TabSize } from '../tab/tab.component';
import { DirectionType, BorderDirectionType } from '../core/types';

export interface TabInGroup extends IonTabProps {
  selected: boolean;
}

export interface TabGroupProps {
  tabs: TabInGroup[];
  border: BorderDirectionType;
  direction: DirectionType;
  size?: TabSize;
  selected: EventEmitter<TabInGroup>;
}

@Component({
  selector: 'ion-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class TabGroupComponent {
  @Input() tabs: TabInGroup[];
  @Input() border: BorderDirectionType = 'right';
  @Input() direction: DirectionType = 'horizontal';
  @Input() size: TabSize = 'sm';

  @Output() selected = new EventEmitter<TabInGroup>();

  private clearTabs() {
    this.tabs.forEach((tab) => {
      tab.selected = false;
    });
  }

  public selectTab(tabSelected: TabInGroup) {
    this.clearTabs();
    tabSelected.selected = true;
    this.selected.emit(tabSelected);
  }
}
