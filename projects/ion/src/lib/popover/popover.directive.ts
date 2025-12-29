import {
  Directive,
  ElementRef,
  inject,
  input,
  output,
  OnDestroy,
  HostListener,
  TemplateRef,
  EventEmitter,
} from '@angular/core';
import { Subject } from 'rxjs';

import {
  PopoverPosition,
  PopoverDirectiveProps,
  PopoverTrigger,
  PopoverButtonsProps,
} from '../core/types/popover';
import { IconType } from '../core/types/icon';
import { PopoverOverlayService } from './popover.service';

@Directive({
  selector: '[ionPopover]',
})
export class IonPopoverDirective implements OnDestroy {
  private elementRef = inject(ElementRef);
  private popoverService = inject(PopoverOverlayService);

  // Inputs
  ionPopoverTitle = input.required<string>();
  ionPopoverKeep = input<boolean>(false);
  ionPopoverBody = input.required<TemplateRef<void>>();
  ionPopoverActions = input<PopoverButtonsProps[]>();
  ionPopoverIcon = input<IconType>();
  ionPopoverIconColor = input<string>();
  ionPopoverIconClose = input<boolean>(false);
  ionPopoverPosition = input<PopoverPosition>(PopoverPosition.DEFAULT);
  ionPopoverArrowPointAtCenter = input<boolean>(true);
  ionPopoverCustomClass = input<string>();
  ionPopoverTrigger = input<PopoverTrigger>(PopoverTrigger.DEFAULT);
  ionPopoverClose = input<Subject<void>>();
  ionPopoverStopCloseOnScroll = input<boolean>(false);
  ionPopoverAutoReposition = input<boolean>(true);

  // Outputs
  ionOnFirstAction = output<void>();
  ionOnSecondAction = output<void>();
  ionOnClose = output<void>();

  private hoverTimeout?: number;

  constructor() {
    // Subscribe to external close signal
    const closeSubject = this.ionPopoverClose();
    if (closeSubject) {
      closeSubject.subscribe(() => {
        this.close();
      });
    }
  }

  open(): void {
    const hostElement = this.elementRef.nativeElement as HTMLElement;

    if (!this.elementIsEnabled(hostElement)) {
      return;
    }

    this.popoverService.open(
      hostElement,
      {
        ionPopoverTitle: this.ionPopoverTitle(),
        ionPopoverBody: this.ionPopoverBody(),
        ionPopoverActions: this.ionPopoverActions(),
        ionPopoverIcon: this.ionPopoverIcon(),
        ionPopoverIconColor: this.ionPopoverIconColor(),
        ionPopoverIconClose: this.ionPopoverIconClose(),
        ionPopoverPosition: this.ionPopoverPosition(),
        ionPopoverKeep: this.ionPopoverKeep(),
        ionPopoverCustomClass: this.ionPopoverCustomClass(),
        ionOnFirstAction: new EventEmitter<void>(),
        ionOnSecondAction: new EventEmitter<void>(),
        ionOnClose: new EventEmitter<void>(),
      },
      this.ionPopoverStopCloseOnScroll(),
      this.ionPopoverAutoReposition(),
    );
  }

  close(): void {
    this.popoverService.close();
    this.ionOnClose.emit();
  }

  @HostListener('click')
  onClick(): void {
    if (this.ionPopoverTrigger() === PopoverTrigger.CLICK) {
      this.open();
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.ionPopoverTrigger() === PopoverTrigger.HOVER) {
      this.hoverTimeout = window.setTimeout(() => {
        this.open();
      }, 200);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.ionPopoverTrigger() === PopoverTrigger.HOVER) {
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = undefined;
      }
      // Close with delay to allow moving to popover
      setTimeout(() => {
        this.close();
      }, 300);
    }
  }

  private elementIsEnabled(element: HTMLElement): boolean {
    const disabled = element.getAttribute('ng-reflect-disabled');
    return !disabled || disabled === 'false';
  }

  ngOnDestroy(): void {
    this.close();
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
  }
}
