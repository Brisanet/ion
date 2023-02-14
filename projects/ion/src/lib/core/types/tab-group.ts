import { EventEmitter } from '@angular/core';
import { BorderDirectionType, DirectionType } from './direction';
import { IonTabProps, TabSize } from './tab';

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
