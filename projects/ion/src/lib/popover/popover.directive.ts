import {
  Directive,
  Input,
  HostListener,
  ComponentFactoryResolver,
  Injector,
  Inject,
  ComponentRef,
  ApplicationRef,
  Output,
  EventEmitter,
  ViewContainerRef,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SafeAny } from './../utils/safe-any';
import { IonPopoverComponent } from './component/popover.component';
import { PopoverPosition } from '../core/types/popover';
import { getPositionsPopover } from './utilsPopover';
import { IonButtonProps, IconType } from '../core/types';
import { pick } from 'lodash';

@Directive({ selector: '[ionPopover]' })
export class IonPopoverDirective implements OnDestroy {
  @Input() ionPopoverTitle: string;
  @Input() ionPopoverBody: TemplateRef<void>;
  @Input() ionPopoverActions?: IonButtonProps[];
  @Input() ionPopoverIcon?: IconType;
  @Input() ionPopoverIconClose? = false;
  @Input() ionPopoverPosition?: PopoverPosition = PopoverPosition.DEFAULT;
  @Input() ionPopoverArrowPointAtCenter = true;
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
      ionPopoverBody: this.ionPopoverBody,
      ionPopoverActions: this.ionPopoverActions,
      ionPopoverIcon: this.ionPopoverIcon,
      ionPopoverIconClose: this.ionPopoverIconClose,
      ionPopoverPosition: this.ionPopoverPosition,
    };
    Object.keys(instanceProps).forEach((prop) => {
      popoverInstance[prop] = instanceProps[prop];
    });

    const eventSubscriptions: [string, EventEmitter<void>][] = [
      ['ionOnFirstAction', this.ionOnFirstAction],
      ['ionOnSecondAction', this.ionOnSecondAction],
      ['ionOnClose', this.ionOnClose],
    ];
    eventSubscriptions.forEach(([event, emitter]) => {
      popoverInstance[event].subscribe(() => {
        this.closePopover();
        emitter.emit();
      });
    });
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

  setComponentPosition(hostElement: SafeAny): void {
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
}
