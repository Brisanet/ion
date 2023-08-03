import { Component, Input, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { PopoverPosition } from '../../core/types/popover';
import { IconType, IonButtonProps } from '../../core/types';

const PRIMARY_6 = '#0858ce';

@Component({
  selector: 'ion-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  exportAs: 'PopoverComponent',
})
export class IonPopoverComponent {
  @Input() ionPopoverTitle: string;
  @Input() ionPopoverKeep: boolean;
  @Input() ionPopoverBody: TemplateRef<void>;
  @Input() ionPopoverActions?: IonButtonProps[];
  @Input() ionPopoverIcon?: IconType;
  @Input() ionPopoverIconColor? = PRIMARY_6;
  @Input() ionPopoverIconClose = false;
  @Input() ionPopoverPosition?: PopoverPosition = PopoverPosition.DEFAULT;
  @Input() ionPopoverCustomClass = '';

  left = 0;
  top = 0;
  position = '';
  readonly ionOnClose = new Subject<void>();
  readonly ionOnFirstAction = new Subject<void>();
  readonly ionOnSecondAction = new Subject<void>();
  close(): void {
    this.ionOnClose.next();
  }
  onClickOutside(): void {
    if (this.ionPopoverKeep) {
      return;
    }
    this.close();
  }
  firstAction(): void {
    this.ionOnFirstAction.next();
  }
  secondAction(): void {
    this.ionOnSecondAction.next();
  }
}
