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
import { IonPopConfirmComponent } from './popconfirm.component';
import { StatusType } from '../core/types';

export interface PopPosition {
  top: number;
  left: number;
  width: number;
}

export interface PopOffset {
  top: number;
  left: number;
  width: number;
  screenOffset: number;
}

@Directive({
  selector: '[ionPopConfirm]',
})
export class IonPopConfirmDirective {
  @Input() ionPopConfirmTitle = 'Tem certeza?';
  @Input() ionPopConfirmDesc = '';
  @Input() ionPopConfirmType: StatusType = 'warning';
  @Output() ionOnConfirm = new EventEmitter<void>();
  @Output() ionOnClose = new EventEmitter<void>();

  private IonPopConfirmComponentRef!: ComponentRef<IonPopConfirmComponent>;

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private readonly viewRef: ViewContainerRef
  ) {}

  open(): void {
    this.closeAllPopsConfirm();
    this.createPopConfirm();
    this.IonPopConfirmComponentRef.instance.ionOnClose.subscribe(() => {
      this.closePopConfirm();
      this.ionOnClose.emit();
    });
  }

  closePopConfirm(): void {
    if (this.IonPopConfirmComponentRef) {
      this.appRef.detachView(this.IonPopConfirmComponentRef.hostView);
      this.IonPopConfirmComponentRef.destroy();
      this.IonPopConfirmComponentRef = null;
    }
  }

  setPosition(
    element: HTMLElement,
    docWidth: number,
    position: PopPosition
  ): PopOffset {
    const popConfirmWidth = element.offsetWidth;

    const offsetToLeft = position.left - popConfirmWidth + position.width * 1.5;

    const offsetToRight = position.left - position.width / 2;

    const screenOffset = docWidth - position.left;

    const leftOffset =
      screenOffset < popConfirmWidth ? offsetToLeft : offsetToRight;

    const offset = {
      top: position.top,
      left: leftOffset,
      width: popConfirmWidth,
      screenOffset: screenOffset,
    };

    return offset;
  }

  closeAllPopsConfirm(): void {
    const existingPopConfirms = document.querySelectorAll('ion-popconfirm');
    if (existingPopConfirms) {
      existingPopConfirms.forEach((popConfirm) => {
        popConfirm.remove();
      });
    }
  }

  createPopConfirm(): void {
    const popover = this.componentFactoryResolver
      .resolveComponentFactory(IonPopConfirmComponent)
      .create(this.injector);

    this.IonPopConfirmComponentRef = popover;

    this.appRef.attachView(this.IonPopConfirmComponentRef.hostView);
    this.IonPopConfirmComponentRef.changeDetectorRef.detectChanges();

    const popconfirmElement = this.IonPopConfirmComponentRef.location
      .nativeElement as HTMLElement;

    this.document.body.appendChild(popconfirmElement);

    this.IonPopConfirmComponentRef.instance.ionPopConfirmTitle =
      this.ionPopConfirmTitle;

    this.IonPopConfirmComponentRef.instance.ionPopConfirmDesc =
      this.ionPopConfirmDesc;

    this.IonPopConfirmComponentRef.instance.ionPopConfirmType =
      this.ionPopConfirmType;

    this.IonPopConfirmComponentRef.instance.ionOnConfirm.subscribe(() => {
      this.closePopConfirm();
      this.ionOnConfirm.emit();
    });
  }

  setStyle(element: HTMLElement, offset: PopOffset): void {
    const supContainerEl = document.querySelector('.sup-container');

    element.style.position = 'absolute';
    element.style.left = offset.left + 'px';
    element.style.top = offset.top + 'px';

    if (offset.screenOffset < offset.width) {
      supContainerEl.classList.replace('sup-container', 'sup-container-right');
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
    const docWidth = document.body.clientWidth;

    const marginBetweenComponents = 10;

    const hostElement = this.viewRef.element.nativeElement as HTMLElement;

    const position = hostElement.getBoundingClientRect() as DOMRect;

    if (this.elementIsEnabled(hostElement)) {
      this.open();

      requestAnimationFrame(() => {
        const popconfirmElement = document.querySelector(
          '.sup-container'
        ) as HTMLElement;

        if (popconfirmElement) {
          const offsetPosition = this.setPosition(popconfirmElement, docWidth, {
            top: position.top + position.height + marginBetweenComponents,
            left: position.left,
            width: position.width,
          });
          this.setStyle(popconfirmElement, offsetPosition);
        }
      });
    }
  }
}
