import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Injector,
  input,
  output,
  ViewContainerRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IonPopConfirmComponent } from './popconfirm.component';
import { StatusType } from '../core/types';
import { SafeAny } from '../utils/safe-any';

export interface PopPosition {
  top: number;
  left: number;
  width: number;
  hostHeight?: number;
}

export interface PopOffset {
  top: number;
  left: number;
  width: number;
  screenOffset: number;
}

@Directive({
  selector: '[ionPopConfirm]',
  standalone: true,
})
export class IonPopConfirmDirective {
  ionPopConfirmTitle = input<string>('Tem certeza?');
  ionPopConfirmDesc = input<string>('');
  ionPopConfirmType = input<StatusType>('warning');
  ionConfirmText = input<string>('Confirmar');
  ionCancelText = input<string>('Cancelar');
  ionPopConfirmCloseOnScroll = input<boolean>(false);

  ionOnConfirm = output<void>();
  ionOnClose = output<void>();

  private IonPopConfirmComponentRef!: ComponentRef<IonPopConfirmComponent> | null;
  private isBottomIcon = false;
  private marginBetweenComponents = 10;

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private appRef: ApplicationRef,
    private injector: Injector,
    private viewRef: ViewContainerRef,
    private elementRef: ElementRef
  ) {}

  open(): void {
    this.closeAllPopsConfirm();
    this.createPopConfirm();
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

    const arrowSpacing = 24;

    const offsetToLeft =
      position.left + arrowSpacing - popConfirmWidth + position.width / 2;

    const offsetToRight = position.left - arrowSpacing + position.width / 2;

    const screenOffset = docWidth - position.left;

    const leftOffset =
      screenOffset < popConfirmWidth ? offsetToLeft : offsetToRight;

    const indicatorIcon = 9;

    const elementSize = element.offsetHeight + indicatorIcon;

    this.isBottomIcon = false;

    if (this.isBiggerThenWindow(position, elementSize)) {
      this.isBottomIcon = true;
      this.setUpPositionPopconfirm(position, elementSize);
    }

    const scrollDocument = document.scrollingElement
      ? document.scrollingElement.scrollTop
      : 0;

    const offset = {
      top: position.top + scrollDocument,
      left: leftOffset,
      width: popConfirmWidth,
      screenOffset: screenOffset,
    };

    return offset;
  }

  isBiggerThenWindow(position: PopPosition, elementSize: number): boolean {
    return position.top + elementSize >= window.innerHeight;
  }

  setUpPositionPopconfirm(position: PopPosition, elementSize: number): void {
    position.top =
      position.top -
      elementSize -
      (position.hostHeight || 0) -
      this.marginBetweenComponents;
  }

  closeAllPopsConfirm(): void {
    const existingPopConfirms = document.querySelectorAll('ion-popconfirm');
    if (existingPopConfirms) {
      this.closePopConfirm();
      existingPopConfirms.forEach((popConfirm) => {
        popConfirm.remove();
      });
    }
  }

  createPopConfirm(): void {
    // Create the component using createComponent from @angular/core to avoid attaching to ViewContainerRef
    // This allows us to manually attach to ApplicationRef and append to body
    const environmentInjector = this.appRef.injector;
    this.IonPopConfirmComponentRef = createComponent(IonPopConfirmComponent, {
      environmentInjector,
      elementInjector: this.injector,
    });

    this.IonPopConfirmComponentRef.setInput('ionPopConfirmTitle', this.ionPopConfirmTitle());
    this.IonPopConfirmComponentRef.setInput('ionPopConfirmDesc', this.ionPopConfirmDesc());
    this.IonPopConfirmComponentRef.setInput('ionPopConfirmType', this.ionPopConfirmType());
    this.IonPopConfirmComponentRef.setInput('ionConfirmText', this.ionConfirmText());
    this.IonPopConfirmComponentRef.setInput('ionCancelText', this.ionCancelText());

    this.appRef.attachView(this.IonPopConfirmComponentRef.hostView);
    
    const popconfirmElement = this.IonPopConfirmComponentRef.location.nativeElement as HTMLElement;
    this.document.body.appendChild(popconfirmElement);

    this.IonPopConfirmComponentRef.instance.ionOnConfirm.subscribe(() => {
      this.closePopConfirm();
      this.ionOnConfirm.emit();
    });

    this.IonPopConfirmComponentRef.instance.ionOnClose.subscribe(() => {
      this.closePopConfirm();
      this.ionOnClose.emit();
    });
    
    this.IonPopConfirmComponentRef.changeDetectorRef.detectChanges();

    requestAnimationFrame(() => {
      const docWidth = document.body.clientWidth;
      const hostElement = this.elementRef.nativeElement as HTMLElement;
      const position = hostElement.getBoundingClientRect() as DOMRect;

      if (popconfirmElement) {
        // We need to find the sup-container inside the component
        const container = popconfirmElement.querySelector('.sup-container') as HTMLElement;
        if (container) {
          const offsetPosition = this.setPosition(container, docWidth, {
            top: position.top + position.height,
            left: position.left,
            width: position.width,
            hostHeight: position.height,
          });
          this.setStyle(container, offsetPosition);
        }
      }
    });
  }

  setStyle(element: HTMLElement, offset: PopOffset): void {
    element.style.position = 'absolute';
    element.style.left = offset.left + 'px';
    element.style.top = offset.top + 'px';

    if (offset.screenOffset < offset.width) {
      element.classList.replace('sup-container', 'sup-container-right');
    }

    if (this.isBottomIcon) {
      element.classList.add('sup-container-bottom');
    }
  }

  elementChildIsEnabled(element: HTMLElement): boolean {
    if (!element.firstElementChild) {
      return true;
    }
    return element.firstElementChild.getAttribute('disabled') !== '';
  }

  elementChildIsLoading(element: HTMLElement): boolean {
    if (!element.firstElementChild) {
      return false;
    }
    return element.firstElementChild.getAttribute('loading') === 'true';
  }

  hostElementIsEnabled(element: HTMLElement): boolean {
    return element.getAttribute('disabled') !== '';
  }

  elementsAreEnabled(element: HTMLElement): boolean {
    return (
      this.elementChildIsEnabled(element) &&
      !this.elementChildIsLoading(element) &&
      this.hostElementIsEnabled(element)
    );
  }

  @HostListener('click') onClick(): void {
    const hostElement = this.elementRef.nativeElement as HTMLElement;

    if (this.elementsAreEnabled(hostElement)) {
      this.open();
    }
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('document:scroll', ['$event'])
  @HostListener('body:scroll', ['$event'])
  @HostListener('window:wheel', ['$event'])
  onScroll({ target }: Event): void {
    if (
      this.ionPopConfirmCloseOnScroll() &&
      target instanceof HTMLElement &&
      !target.closest('ion-popconfirm')
    ) {
      this.closeAllPopsConfirm();
    }
  }
}
