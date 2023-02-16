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

export interface PopPosition {
  top: number;
  left: number;
}

@Directive({
  selector: '[ionPopConfirm]',
})
export class IonPopConfirmDirective {
  @Input() ionPopConfirmTitle = 'Tem certeza?';
  @Input() ionPopConfirmDesc = '';
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

  open(position: PopPosition): void {
    if (this.IonPopConfirmComponentRef) {
      return;
    }
    const popover = this.componentFactoryResolver
      .resolveComponentFactory(IonPopConfirmComponent)
      .create(this.injector);

    this.IonPopConfirmComponentRef = popover;

    this.appRef.attachView(this.IonPopConfirmComponentRef.hostView);
    this.IonPopConfirmComponentRef.changeDetectorRef.detectChanges();

    const popconfirmElement = this.IonPopConfirmComponentRef.location
      .nativeElement as HTMLElement;

    this.setStyle(popconfirmElement, position);

    this.document.body.appendChild(popconfirmElement);

    this.IonPopConfirmComponentRef.instance.ionPopConfirmTitle =
      this.ionPopConfirmTitle;

    this.IonPopConfirmComponentRef.instance.ionPopConfirmDesc =
      this.ionPopConfirmDesc;

    this.IonPopConfirmComponentRef.instance.ionOnConfirm.subscribe(() => {
      this.closePopConfirm();
      this.ionOnConfirm.emit();
    });

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

  setStyle(element: HTMLElement, position: PopPosition): void {
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
