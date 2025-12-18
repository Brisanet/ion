import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

import { IonSidebarProps } from '../core/types/sidebar';
import { MOUSE_BUTTONS } from '../utils/mouse-buttons';
import { callItemAction, selectItemByIndex, unselectAllItems } from './utils';

@Component({
  selector: 'ion-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class IonSidebarComponent implements AfterViewChecked {
  @Input() logo!: string;
  @Input() logoAction?: () => void;
  @Input() items: IonSidebarProps['items'] = [];
  @Input() closeOnSelect = false;
  @Input() shrinkMode = false;
  @Input() sidebarFooter?: TemplateRef<void>;
  @Input() keepShrunken = false;
  @Output() ionOnSidebarToggle = new EventEmitter<boolean>();

  public closed = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  public checkClikOnPageAccess = (event): void => {
    const containerElement = document.querySelector('.ion-sidebar--opened');
    const innerElement = event.target;
    if (containerElement && !containerElement.contains(innerElement)) {
      const closeButton = document.querySelector(
        '.ion-sidebar--opened .ion-sidebar__header button'
      ) as HTMLElement;
      if (closeButton) {
        closeButton.click();
      }
    }
  };

  public toggleSidebarVisibility(): void {
    this.closed = !this.closed;
    this.ionOnSidebarToggle.emit(this.closed);

    if (!this.closed) {
      setTimeout(() => {
        document.addEventListener('click', this.checkClikOnPageAccess);
      });

      return;
    }
    document.removeEventListener('click', this.checkClikOnPageAccess);
  }

  public itemSelected(itemIndex: number, event: MouseEvent): void {
    selectItemByIndex(this.items, itemIndex, event);
    if (
      event.button !== MOUSE_BUTTONS.MIDDLE &&
      this.closeOnSelect &&
      !(this.shrinkMode && this.closed)
    ) {
      this.toggleSidebarVisibility();
    }
  }

  public itemOnGroupSelected(groupIndex: number): void {
    unselectAllItems(this.items, groupIndex);
    if (this.closeOnSelect && !(this.shrinkMode && this.closed)) {
      this.toggleSidebarVisibility();
    }
  }

  public groupSelected(groupIndex: number, event: MouseEvent): void {
    unselectAllItems(this.items);
    callItemAction(this.items, groupIndex, event);
  }

  public handleLogoClick(): void {
    if (this.logoAction) {
      this.logoAction();
    }

    if (this.closeOnSelect) {
      this.toggleSidebarVisibility();
    }
  }
}
