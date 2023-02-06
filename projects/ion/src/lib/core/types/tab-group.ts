import { IonTabProps, TabSize } from '../../tab/tab.component';
import { BorderDirectionType, DirectionType } from './direction';
import { EventEmitter } from '@angular/core';

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
