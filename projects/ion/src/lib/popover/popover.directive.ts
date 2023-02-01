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
import { PopoverArrow, PopoverComponent } from './popover.component';
import { IonButtonProps } from '../button/button.component';
import { IconType } from '../icon/icon.component';

export interface PopoverPosition {
  top: number;
  left: number;
}

@Directive({
  selector: '[ionPopover]',
})
export class PopoverDirective {
  @Input() ionPopoverTitle = 'Tem certeza?';
  @Input() ionPopoverBody = '';
  @Input() ionPopoverActions?: IonButtonProps[] = [];
  @Input() ionPopoverIcon?: IconType = '';
  @Input() ionPopoverIconClose? = false;
  @Input() ionPopoverArrowPosition?: PopoverArrow = 'arrow-2';
  @Output() ionOnFirstAction = new EventEmitter<void>();
  @Output() ionOnSecondAction = new EventEmitter<void>();
  @Output() ionOnClose = new EventEmitter<void>();

  private popoverComponentRef!: ComponentRef<PopoverComponent>;

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private readonly viewRef: ViewContainerRef
  ) {}

  open(position: PopoverPosition): void {
    if (this.popoverComponentRef) {
      return;
    }
    const popover = this.componentFactoryResolver
      .resolveComponentFactory(PopoverComponent)
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

    this.popoverComponentRef.instance.ionPopoverArrowPosition =
      this.ionPopoverArrowPosition;

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
    element.style.left = position.left + 'px';
    element.style.top = position.top + 'px';
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

    const position = hostElement.getBoundingClientRect();
    const midHostElementInView = position.left - position.width / 2;

    if (this.elementIsEnabled(hostElement)) {
      this.open({
        top: position.top + position.height + marginBetweenComponents,
        left: midHostElementInView,
      });
    }
  }
}
