import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
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

import { IconType } from '../core/types';
import { PopoverButtonsProps, PopoverPosition } from '../core/types/popover';
import { SafeAny } from './../utils/safe-any';
import { IonPopoverComponent } from './component/popover.component';
import { getPositionsPopover } from './utilsPopover';

@Directive({ selector: '[ionPopover]' })
export class IonPopoverDirective implements AfterContentInit, OnDestroy {
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

  open(position: DOMRect): void {
    this.closeAllPopovers();
    this.createPopover(position);
  }

  createPopover(position: DOMRect): void {
    this.popoverComponentRef = this.componentFactoryResolver
      .resolveComponentFactory(IonPopoverComponent)
      .create(this.injector);

    this.appRef.attachView(this.popoverComponentRef.hostView);

    const popoverElement = this.popoverComponentRef.location
      .nativeElement as HTMLElement;

    popoverElement.style.visibility = 'hidden';

    this.document.body.appendChild(popoverElement);
    this.popoverComponentRef.changeDetectorRef.detectChanges();
    this.updatePopoverProps(this.popoverComponentRef.instance);

    this.setComponentPosition(position);
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

  setComponentPosition(hostElement: DOMRect): void {
    setTimeout(() => {
      const popoverElement = this.popoverComponentRef.location
        .nativeElement as HTMLElement;
      const positions = getPositionsPopover(
        hostElement,
        this.ionPopoverArrowPointAtCenter,
        popoverElement.firstChild as HTMLElement
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
      popoverElement.style.visibility = 'unset';
    });
  }

  closeAllPopovers(): void {
    const existingPopovers = document.querySelectorAll('ion-popover');
    if (existingPopovers) {
      this.destroyComponent();
      existingPopovers.forEach((popover) => {
        popover.remove();
      });
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
    const position = hostElement.getBoundingClientRect() as DOMRect;

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

  ngAfterContentInit(): void {
    if (this.popoverComponentRef) {
      this.updatePopoverProps(this.popoverComponentRef.instance);
    }
  }

  ngOnDestroy(): void {
    this.destroyComponent();
  }
}
