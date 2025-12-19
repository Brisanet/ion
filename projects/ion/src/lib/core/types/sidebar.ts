import { EventEmitter, TemplateRef } from '@angular/core';
import { IconType } from './icon';

export interface SidebarItem {
  title: string;
  icon: IconType;
  selected?: boolean;
  disabled?: boolean;
  action?: (event?: MouseEvent) => void;
}

export interface IonSidebarProps {
  logo: string;
  logoAction?: () => void;
  items: (SidebarItem & { options?: SidebarItem[] })[];
  closeOnSelect?: boolean;
  shrinkMode?: boolean;
  keepShrunken?: boolean;
  sidebarFooter?: TemplateRef<void>;
  ionOnSidebarToggle?: EventEmitter<boolean>;
}
