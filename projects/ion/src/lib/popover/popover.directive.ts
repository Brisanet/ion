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
  OnInit,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { IconType } from '../core/types';
import { PopoverButtonsProps, PopoverPosition } from '../core/types/popover';
import { IonPositionService } from '../position/position.service';
import { SafeAny } from './../utils/safe-any';
import { IonPopoverComponent } from './component/popover.component';
import { getPositionsPopover } from './utilsPopover';

@Directive({ selector: '[ionPopover]' })
export class IonPopoverDirective implements OnDestroy, OnInit {
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

  public subscription$: Subscription;
  private popoverComponentRef: ComponentRef<IonPopoverComponent> = null;

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private positionService: IonPositionService<PopoverPosition>,
    private readonly viewRef: ViewContainerRef,
    private elementRef: ElementRef // private cdr: ChangeDetectorRef
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
    this.updatePopoverProps(this.popoverComponentRef.instance);
    this.showPopover();
    this.setComponentPosition();
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

  setComponentPosition(): void {
    const popoverElement = this.popoverComponentRef.location
      .nativeElement as HTMLElement;

    const hostElement = this.elementRef.nativeElement.getBoundingClientRect();

    this.positionService.setHostPosition(hostElement);

    const positions = getPositionsPopover(
      hostElement,
      this.ionPopoverArrowPointAtCenter,
      popoverElement.firstChild as HTMLElement
    );
    this.positionService.setCurrentPosition(
      this.popoverComponentRef.instance.ionPopoverPosition
    );
    const ionPopoverPosition = this.positionService.getNewPosition();

    const props = {
      top: positions[ionPopoverPosition].top + window.scrollY,
      left: positions[ionPopoverPosition].left + window.scrollX,
      position: 'absolute',
    };

    Object.keys(props).forEach((prop) => {
      this.popoverComponentRef.instance[prop] = props[prop];
    });
  }

  showPopover(): void {
    if (this.popoverComponentRef) {
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
    const hostElement = this.viewRef.element.nativeElement as HTMLElement;
    if (this.elementIsEnabled(hostElement)) {
      this.open();
    }
  }

  destroyComponent(): void {
    if (this.popoverComponentRef) {
      this.appRef.detachView(this.popoverComponentRef.hostView);
      this.popoverComponentRef.destroy();
      this.popoverComponentRef = null;
    }
    this.subscription$.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription$ = this.positionService.reposition.subscribe(() => {
      if (this.popoverComponentRef) {
        this.setComponentPosition();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyComponent();
  }
}
