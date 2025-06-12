import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Injector,
  Input,
  OnDestroy,
  Output,
  ViewContainerRef,
} from '@angular/core';

import {
  PopoverPosition,
  PopoverDirectiveProps,
  PopoverTrigger,
} from '../core/types/popover';
import { IonPositionService } from '../position/position.service';
import { SafeAny } from './../utils/safe-any';
import { IonPopoverComponent } from './component/popover.component';
import { getPositionsPopover } from './utilsPopover';

@Directive({ selector: '[ionPopover]' })
export class IonPopoverDirective implements OnDestroy {
  @Input() ionPopoverTitle: PopoverDirectiveProps['ionPopoverTitle'];
  @Input() ionPopoverKeep: PopoverDirectiveProps['ionPopoverKeep'] = false;
  @Input() ionPopoverBody: PopoverDirectiveProps['ionPopoverBody'];
  @Input() ionPopoverActions?: PopoverDirectiveProps['ionPopoverActions'];
  @Input() ionPopoverIcon?: PopoverDirectiveProps['ionPopoverIcon'];
  @Input() ionPopoverIconColor?: PopoverDirectiveProps['ionPopoverIconColor'];
  @Input() ionPopoverIconClose?: PopoverDirectiveProps['ionPopoverIconClose'] =
    false;
  @Input() ionPopoverPosition?: PopoverDirectiveProps['ionPopoverPosition'] =
    PopoverPosition.DEFAULT;
  @Input()
  ionPopoverArrowPointAtCenter: PopoverDirectiveProps['ionPopoverArrowPointAtCenter'] =
    true;
  @Input()
  ionPopoverCustomClass?: PopoverDirectiveProps['ionPopoverCustomClass'];
  @Input() ionPopoverTrigger: PopoverDirectiveProps['ionPopoverTrigger'] =
    PopoverTrigger.DEFAULT;
  @Input() ionPopoverClose?: PopoverDirectiveProps['ionPopoverClose'];
  @Input()
  ionPopoverStopCloseOnScroll: PopoverDirectiveProps['ionPopoverStopCloseOnScroll'] =
    false;
  @Input()
  ionPopoverAutoReposition: PopoverDirectiveProps['ionPopoverAutoReposition'] =
    true;
  @Output() ionOnFirstAction: PopoverDirectiveProps['ionOnFirstAction'] =
    new EventEmitter<void>();
  @Output() ionOnSecondAction: PopoverDirectiveProps['ionOnSecondAction'] =
    new EventEmitter<void>();
  @Output() ionOnClose: PopoverDirectiveProps['ionOnClose'] =
    new EventEmitter<void>();

  private popoverComponentRef: ComponentRef<IonPopoverComponent> = null;

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private positionService: IonPositionService,
    private readonly viewRef: ViewContainerRef,
    private elementRef: ElementRef,
    private injector: Injector
  ) {}

  open(): void {
    this.closeAllPopovers();
    this.createPopover();
  }

  createPopover(): void {
    this.popoverComponentRef = this.componentFactoryResolver
      .resolveComponentFactory(IonPopoverComponent)
      .create(this.injector);

    this.appRef.attachView(this.popoverComponentRef.hostView);

    const popoverElement = this.popoverComponentRef.location
      .nativeElement as HTMLElement;

    this.document.body.appendChild(popoverElement);
    this.popoverComponentRef.changeDetectorRef.detectChanges();
    this.updatePopoverDirectiveProps(this.popoverComponentRef.instance);
    this.showPopover();
    this.setComponentPosition();

    if (this.ionPopoverClose) {
      this.ionPopoverClose.subscribe(() => {
        this.closeAllPopovers();
        this.ionOnClose.emit();
      });
    }
  }

  updatePopoverDirectiveProps(popoverInstance: IonPopoverComponent): void {
    const instanceProps = {
      ionPopoverTitle: this.ionPopoverTitle,
      ionPopoverKeep: this.ionPopoverKeep,
      ionPopoverBody: this.ionPopoverBody,
      ionPopoverActions: this.ionPopoverActions,
      ionPopoverIcon: this.ionPopoverIcon,
      ionPopoverIconColor: this.ionPopoverIconColor,
      ionPopoverIconClose: this.ionPopoverIconClose,
      ionPopoverPosition: this.ionPopoverPosition,
      ionPopoverCustomClass: this.ionPopoverCustomClass,
    };
    Object.keys(instanceProps).forEach((prop) => {
      popoverInstance[prop] = instanceProps[prop];
    });

    const eventSubscriptions: [string, EventEmitter<void>][] = [
      ['ionOnFirstAction', this.ionOnFirstAction],
      ['ionOnSecondAction', this.ionOnSecondAction],
      ['ionOnClose', this.ionOnClose],
    ];
    eventSubscriptions.forEach(([event, emitter], index) => {
      popoverInstance[event].subscribe(() => {
        this.handlePopoverAction(index);
        emitter.emit();
      });
    });
  }

  handlePopoverAction(index: number): void {
    const action = this.ionPopoverActions && this.ionPopoverActions[index];
    if (!action || !action.keepOpenAfterAction) {
      this.destroyComponent();
    }
  }

  setComponentPosition(): void {
    const hostElement = this.elementRef.nativeElement.getBoundingClientRect();

    this.positionService.setHostPosition(hostElement);

    this.positionService.setChoosedPosition(
      this.popoverComponentRef.instance.ionPopoverPosition
    );

    this.positionService.setPointAtCenter(this.ionPopoverArrowPointAtCenter);
    this.positionService.setAutoReposition(this.ionPopoverAutoReposition);

    const ionPopoverPosition =
      this.positionService.getNewPosition(getPositionsPopover);

    const props = {
      top: ionPopoverPosition.top + window.scrollY,
      left: ionPopoverPosition.left + window.scrollX,
      position: 'absolute',
      ionPopoverTrigger: this.ionPopoverTrigger,
    };

    Object.keys(props).forEach((prop) => {
      this.popoverComponentRef.instance[prop] = props[prop];
    });
  }

  showPopover(): void {
    if (!this.isComponentRefNull()) {
      this.popoverComponentRef.instance.ionPopoverVisible = true;
    }
  }

  closeAllPopovers(): void {
    const existingPopovers = document.querySelectorAll('ion-popover');
    if (existingPopovers) {
      existingPopovers.forEach((popover) => {
        popover.remove();
      });
      this.destroyComponent();
    }
  }

  elementIsEnabled(element: HTMLElement): boolean {
    return (
      !element.getAttribute('ng-reflect-disabled') ||
      (element.getAttribute('ng-reflect-disabled') &&
        element.getAttribute('ng-reflect-disabled') == 'false')
    );
  }

  @HostListener('click') onClick(): void {
    this.handlePopoverTrigger(PopoverTrigger.CLICK);
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.handlePopoverTrigger(PopoverTrigger.HOVER);
    if (
      this.isPopoverTrigger(PopoverTrigger.HOVER) &&
      !this.isComponentRefNull()
    ) {
      this.popoverComponentRef.location.nativeElement.addEventListener(
        'mouseleave',
        (e: MouseEvent) => {
          this.handleHoverOutside(e);
        }
      );
    }
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(
    event: MouseEvent
  ): void {
    if (
      this.isPopoverTrigger(PopoverTrigger.HOVER) &&
      !this.isComponentRefNull()
    ) {
      this.handleHoverOutside(event);
    }
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('document:scroll', ['$event'])
  @HostListener('body:scroll', ['$event'])
  @HostListener('window:wheel', ['$event'])
  onScroll(event: Event): void {
    const targetElement = event.target;
    if (
      !this.ionPopoverStopCloseOnScroll &&
      targetElement instanceof HTMLElement &&
      !targetElement.closest('ion-popover')
    ) {
      this.destroyComponent();
    }
  }

  handleHoverOutside(event: MouseEvent): void {
    const popoverElement = this.popoverComponentRef.location.nativeElement;
    const hostElement = this.viewRef.element.nativeElement as HTMLElement;
    const isInsidePopoverOrHost =
      popoverElement.contains(event.relatedTarget as Node) ||
      hostElement.contains(event.relatedTarget as Node);

    if (!isInsidePopoverOrHost) {
      this.destroyComponent();
    }
  }

  handlePopoverTrigger(trigger: PopoverTrigger): void {
    const hostElement = this.viewRef.element.nativeElement as HTMLElement;
    if (this.isPopoverTrigger(trigger) && this.elementIsEnabled(hostElement)) {
      this.open();
    }
  }

  destroyComponent(): void {
    if (!this.isComponentRefNull()) {
      this.appRef.detachView(this.popoverComponentRef.hostView);
      this.popoverComponentRef.destroy();
      this.popoverComponentRef = null;
    }
  }

  isPopoverTrigger(trigger: PopoverTrigger): boolean {
    return this.ionPopoverTrigger === trigger;
  }

  isComponentRefNull(): boolean {
    return this.popoverComponentRef === null;
  }

  ngOnDestroy(): void {
    this.destroyComponent();
  }
}
