import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonTabProps } from '../tab/tab.component';

export interface TabInGroup extends IonTabProps {
  selected: boolean;
}

export type TabGroupDirection = 'horizontal' | 'vertical';

export interface TabGroupProps {
  tabs: TabInGroup[];
  direction: TabGroupDirection;
  selected: EventEmitter<TabInGroup>;
}

@Component({
  selector: 'ion-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class TabGroupComponent {
  @Input() tabs: TabInGroup[];
  @Input() direction: TabGroupDirection = 'horizontal';
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
