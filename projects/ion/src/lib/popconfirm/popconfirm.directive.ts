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
import { PopConfirmComponent } from './popconfirm.component';

export interface PopPosition {
  top: number;
  left: number;
}

@Directive({
  selector: '[ionPopConfirm]',
})
export class PopConfirmDirective {
  @Input() ionPopConfirmTitle = 'Tem certeza?';
  @Input() ionPopConfirmDesc = '';
  @Output() ionOnConfirm = new EventEmitter<void>();
  @Output() ionOnClose = new EventEmitter<void>();

  private popconfirmComponentRef!: ComponentRef<PopConfirmComponent>;

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private readonly viewRef: ViewContainerRef
  ) {}

  open(position: PopPosition): void {
    if (this.popconfirmComponentRef) {
      return;
    }
    const popover = this.componentFactoryResolver
      .resolveComponentFactory(PopConfirmComponent)
      .create(this.injector);

    this.popconfirmComponentRef = popover;

    this.appRef.attachView(this.popconfirmComponentRef.hostView);
    this.popconfirmComponentRef.changeDetectorRef.detectChanges();

    const popconfirmElement = this.popconfirmComponentRef.location
      .nativeElement as HTMLElement;

    this.setStyle(popconfirmElement, position);

    this.document.body.appendChild(popconfirmElement);

    this.popconfirmComponentRef.instance.ionPopConfirmTitle =
      this.ionPopConfirmTitle;

    this.popconfirmComponentRef.instance.ionPopConfirmDesc =
      this.ionPopConfirmDesc;

    this.popconfirmComponentRef.instance.ionOnConfirm.subscribe(() => {
      this.ionOnConfirm.emit();
    });

    this.popconfirmComponentRef.instance.ionOnClose.subscribe(() => {
      this.closePopConfirm();
      this.ionOnClose.emit();
    });
  }

  closePopConfirm(): void {
    if (this.popconfirmComponentRef) {
      this.appRef.detachView(this.popconfirmComponentRef.hostView);
      this.popconfirmComponentRef.destroy();
      this.popconfirmComponentRef = null;
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
