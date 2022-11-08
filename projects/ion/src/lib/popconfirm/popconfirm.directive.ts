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
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SafeAny } from './../utils/safe-any';
import { PopConfirmComponent } from './popconfirm.component';

@Directive({
  selector: '[ionPopConfirm]',
})
export class PopConfirmDirective {
  @Input() ionPopConfirmTitle = 'Tem certeza?';
  @Output() ionOnConfirm = new EventEmitter<void>();
  @Output() ionOnClose = new EventEmitter<void>();

  private popconfirmComponentRef!: ComponentRef<PopConfirmComponent>;

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
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

    const popconfirmElement =
      this.popconfirmComponentRef.location.nativeElement;
    this.document.body.appendChild(popconfirmElement);

    this.popconfirmComponentRef.instance.ionPopConfirmTitle =
      this.ionPopConfirmTitle;

    this.popconfirmComponentRef.instance.ionOnConfirm.subscribe(() => {
      this.ionOnConfirm.emit();
    });

    this.popconfirmComponentRef.instance.ionOnClose.subscribe(() => {
      this.closePopConfirm();
      this.ionOnClose.emit();
    });
  }

  closePopConfirm(): void {
    this.appRef.detachView(this.popconfirmComponentRef.hostView);
    this.popconfirmComponentRef.destroy();
    this.popconfirmComponentRef = null;
  }

  @HostListener('click') onClick(): void {
    this.open();
  }
}
