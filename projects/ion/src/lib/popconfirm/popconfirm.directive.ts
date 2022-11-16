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

@Directive({
  selector: '[ionPopConfirm]',
})
export class PopConfirmDirective {
  @Input() ionPopConfirmTitle = 'Tem certeza?';
  @Input() ionPopConfirmDesc = '';
  @Output() ionOnConfirm = new EventEmitter<void>();
  @Output() ionOnClose = new EventEmitter<void>();

  private popconfirmComponentRef!: ComponentRef<PopConfirmComponent>;
  private absolutePosition: { top: number; left: number };

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private readonly viewRef: ViewContainerRef
  ) {}

  open(): void {
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

    this.setStyle(popconfirmElement);

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

  setStyle(element: HTMLElement): void {
    element.style.position = 'absolute';
    element.style.left = this.absolutePosition.left + 'px';
    element.style.top = this.absolutePosition.top + 'px';
  }

  @HostListener('click') onClick(): void {
    const marginBetweenComponents = 10;
    const position = this.viewRef.element.nativeElement.getBoundingClientRect();

    this.absolutePosition = {
      top: position.top + position.height + marginBetweenComponents,
      left: position.left,
    };

    this.open();
  }
}
