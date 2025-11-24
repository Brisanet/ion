import { EventEmitter } from '@angular/core';
import { IconType } from './icon';

export interface Item {
  title: string;
  icon: IconType;
  selected?: boolean;
  disabled?: boolean;
  action?: (event?: MouseEvent) => void;
}

export interface IonSidebarProps {
  logo: string;
  logoAction?: () => void;
  items: (Item & { options?: [Item, ...Item[]] })[];
  closeOnSelect?: boolean;
  shrinkMode?: boolean;
  keepShrunken?: boolean;
  ionOnSidebarToggle?: EventEmitter<boolean>;
}
