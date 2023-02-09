import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { IconType } from '../icon/icon.component';
import { SafeAny } from '../utils/safe-any';
import { IonButtonProps } from '../button/button.component';

import { PopoverPosition } from '../core/types/popover';

export interface PopoverProps {
  ionPopoverTitle: string;
  ionPopoverBody: SafeAny;
  ionPopoverActions?: IonButtonProps[];
  ionPopoverIcon?: IconType;
  ionPopoverIconClose?: boolean;
  ionPopoverPosition?: PopoverPosition;
}

@Component({
  selector: 'ion-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  exportAs: 'PopoverComponent',
})
export class IonPopoverComponent {
  @Input() ionPopoverTitle: string;
  @Input() ionPopoverBody: SafeAny;
  @Input() ionPopoverActions?: IonButtonProps[];
  @Input() ionPopoverIcon?: IconType;
  @Input() ionPopoverIconClose?: boolean = false;
  @Input() ionPopoverPosition?: PopoverPosition = PopoverPosition.DEFAULT;
  left = 0;
  top = 0;

  readonly ionOnClose = new Subject<void>();
  readonly ionOnFirstAction = new Subject<void>();
  readonly ionOnSecondAction = new Subject<void>();

  close(): void {
    this.ionOnClose.next();
  }

  firstAction(): void {
    this.ionOnFirstAction.next();
  }

  secondAction(): void {
    this.ionOnSecondAction.next();
  }
}
