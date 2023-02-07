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
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SafeAny } from './../utils/safe-any';
import { IonPopoverComponent } from './popover.component';
import { IonButtonProps } from '../button/button.component';
import { IconType } from '../icon/icon.component';
import { PopoverPosition } from '../core/types/popover';

@Directive({
  selector: '[ionPopover]',
})
export class PopoverDirective {
  @Input() ionPopoverTitle = 'Tem certeza?';
  @Input() ionPopoverBody = '';
  @Input() ionPopoverActions?: IonButtonProps[] = [];
  @Input() ionPopoverIcon?: IconType = '';
  @Input() ionPopoverIconClose? = false;
  @Input() ionPopoverPosition?: PopoverPosition = PopoverPosition.DEFAULT;
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
    if (this.popoverComponentRef) {
      return;
    }
    const popover = this.componentFactoryResolver
      .resolveComponentFactory(IonPopoverComponent)
      .create(this.injector);

    this.popoverComponentRef = popover;

    this.appRef.attachView(this.popoverComponentRef.hostView);
    this.popoverComponentRef.changeDetectorRef.detectChanges();

    const popoverElement = this.popoverComponentRef.location
      .nativeElement as HTMLElement;

    this.setStyle(popoverElement, position);

    this.document.body.appendChild(popoverElement);

    this.popoverComponentRef.instance.ionPopoverTitle = this.ionPopoverTitle;

    this.popoverComponentRef.instance.ionPopoverBody = this.ionPopoverBody;

    this.popoverComponentRef.instance.ionPopoverActions =
      this.ionPopoverActions;

    this.popoverComponentRef.instance.ionPopoverIcon = this.ionPopoverIcon;

    this.popoverComponentRef.instance.ionPopoverIconClose =
      this.ionPopoverIconClose;

    this.popoverComponentRef.instance.ionPopoverPosition =
      this.ionPopoverPosition;

    this.popoverComponentRef.instance.ionOnFirstAction.subscribe(() => {
      this.closePopover();
      this.ionOnFirstAction.emit();
    });

    this.popoverComponentRef.instance.ionOnSecondAction.subscribe(() => {
      this.closePopover();
      this.ionOnSecondAction.emit();
    });

    this.popoverComponentRef.instance.ionOnClose.subscribe(() => {
      this.closePopover();
      this.ionOnClose.emit();
    });
  }

  closePopover(): void {
    if (this.popoverComponentRef) {
      this.appRef.detachView(this.popoverComponentRef.hostView);
      this.popoverComponentRef.destroy();
      this.popoverComponentRef = null;
    }
  }

  setStyle(element: HTMLElement, position: PopoverPosition): void {
    element.style.position = 'absolute';
    // element.style.left = position.left + 'px';
    // element.style.top = position.top + 'px';
  }

  elementIsEnabled(element: HTMLElement): boolean {
    return (
      !element.getAttribute('ng-reflect-disabled') ||
      (element.getAttribute('ng-reflect-disabled') &&
        element.getAttribute('ng-reflect-disabled') == 'false')
    );
  }

  @HostListener('click') onClick(): void {
    const marginBetweenComponents = 10;
    const hostElement = this.viewRef.element.nativeElement as HTMLElement;

    const popoverElement = document.getElementById('ion-popover');
    const elementProps = popoverElement.getBoundingClientRect();

    const position = hostElement.getBoundingClientRect();
    const midHostElementInView =
      position.right - position.width / 2 - elementProps.width / 2;

    if (this.elementIsEnabled(hostElement)) {
      // this.open({
      //   top: position.top + position.height + marginBetweenComponents,
      //   left: midHostElementInView,
      // });
    }
  }
}

// arrow-2 = top: position.top + position.height + marginBetweenComponents,
//left: position.left - position.width / 2;,

// arrow-3 = top: position.top + position.height + marginBetweenComponents,
//left: position.right - position.width / 2 - 149.5,
