import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EventEmitter,
  HostListener,
  Inject,
  Injector,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { pick } from 'lodash';

import { IconType } from '../core/types';
import { PopoverButtonsProps, PopoverPosition } from '../core/types/popover';
import { SafeAny } from './../utils/safe-any';
import { IonPopoverComponent } from './component/popover.component';
import { getPositionsPopover } from './utilsPopover';

@Directive({ selector: '[ionPopover]' })
export class IonPopoverDirective implements OnDestroy {
  @Input() ionPopoverTitle: string;
  @Input() ionPopoverKeep = false;
  @Input() ionPopoverBody: TemplateRef<void>;
  @Input() ionPopoverActions?: PopoverButtonsProps[];
  @Input() ionPopoverIcon?: IconType;
  @Input() ionPopoverIconColor?: string;
  @Input() ionPopoverIconClose? = false;
  @Input() ionPopoverPosition?: PopoverPosition = PopoverPosition.DEFAULT;
  @Input() ionPopoverArrowPointAtCenter = true;
  @Input() ionPopoverCustomClass?: string;
  @Output() ionOnFirstAction = new EventEmitter<void>();
  @Output() ionOnSecondAction = new EventEmitter<void>();
  @Output() ionOnClose = new EventEmitter<void>();

  private popoverComponentRef!: ComponentRef<IonPopoverComponent>;

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private readonly viewRef: ViewContainerRef
  ) {}

  open(position: SafeAny): void {
    this.closeAllPopovers();
    this.createPopover();
    this.setComponentPosition(position);
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
    this.updatePopoverProps(this.popoverComponentRef.instance);
  }

  updatePopoverProps(popoverInstance: IonPopoverComponent): void {
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
        if (this.shouldClosePopover(index)) {
          this.closePopover();
        }

        emitter.emit();
      });
    });
  }

  setComponentPosition(hostElement: DOMRect): void {
    const hostPositions = pick(hostElement, ['left', 'right', 'top', 'bottom']);
    const positions = getPositionsPopover(
      hostPositions,
      this.ionPopoverArrowPointAtCenter
    );

    const props = {
      left: positions[this.ionPopoverPosition].left,
      top: positions[this.ionPopoverPosition].top,
      position: 'absolute',
    };

    Object.keys(props).forEach((prop) => {
      this.popoverComponentRef.instance[prop] = props[prop];
    });

    this.popoverComponentRef.changeDetectorRef.detectChanges();
  }

  closeAllPopovers(): void {
    const existingPopovers = document.querySelectorAll('ion-popover');
    if (existingPopovers) {
      this.closePopover();
      existingPopovers.forEach((popover) => {
        popover.remove();
      });
    }
  }

  closePopover(): void {
    if (this.popoverComponentRef) {
      this.appRef.detachView(this.popoverComponentRef.hostView);
      this.popoverComponentRef.destroy();
      this.popoverComponentRef = null;
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
    const hostElement = this.viewRef.element.nativeElement as HTMLElement;
    const position = hostElement.getBoundingClientRect();

    if (this.elementIsEnabled(hostElement)) {
      this.open(position);
    }
  }

  destroyComponent(): void {
    if (this.popoverComponentRef) {
      this.appRef.detachView(this.popoverComponentRef.hostView);
      this.popoverComponentRef.destroy();
      this.popoverComponentRef = null;
    }
  }

  ngOnDestroy(): void {
    this.destroyComponent();
  }

  private shouldClosePopover(index: number): boolean {
    const action = this.ionPopoverActions && this.ionPopoverActions[index];

    return !action || !action.keepOpenAfterAction;
  }
}
