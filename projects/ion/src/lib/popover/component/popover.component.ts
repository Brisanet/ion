import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';

import { IconType } from '../../core/types';
import {
  PopoverButtonsProps,
  PopoverPosition,
  PopoverTrigger,
} from '../../core/types/popover';
import { IonPositionService } from '../../position/position.service';

const PRIMARY_6 = '#0858ce';

@Component({
  selector: 'ion-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  exportAs: 'PopoverComponent',
})
export class IonPopoverComponent implements AfterViewChecked {
  @ViewChild('popover', { static: true }) popover: ElementRef;

  @Input() ionPopoverTitle: string;
  @Input() ionPopoverKeep: boolean;
  @Input() ionPopoverBody: TemplateRef<void>;
  @Input() ionPopoverActions?: PopoverButtonsProps[];
  @Input() ionPopoverIcon?: IconType;
  @Input() ionPopoverIconColor? = PRIMARY_6;
  @Input() ionPopoverIconClose = false;
  @Input() ionPopoverPosition?: PopoverPosition = PopoverPosition.DEFAULT;
  @Input() ionPopoverCustomClass = '';

  ionPopoverVisible = false;
  ionPopoverTrigger = PopoverTrigger.DEFAULT;
  left = 0;
  top = 0;
  position = '';
  readonly ionOnClose = new Subject<void>();
  readonly ionOnFirstAction = new Subject<void>();
  readonly ionOnSecondAction = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private positionService: IonPositionService
  ) {}

  close(): void {
    this.ionOnClose.next();
  }
  onClickOutside(): void {
    if (
      this.ionPopoverKeep ||
      this.ionPopoverTrigger === PopoverTrigger.HOVER
    ) {
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

  ngAfterViewChecked(): void {
    this.repositionPopover();
    this.cdr.detectChanges();
  }

  private repositionPopover(): void {
    const coordinates = this.popover.nativeElement.getBoundingClientRect();

    this.positionService.setcomponentCoordinates(coordinates);
    this.positionService.setChoosedPosition(this.ionPopoverPosition);
    this.ionPopoverPosition =
      this.positionService.getCurrentPosition() as PopoverPosition;
    this.positionService.emitReposition();
  }
}
