import {
  Directive,
  Input,
  HostListener,
  Component,
  ComponentFactoryResolver,
  Injector,
  Inject,
  ComponentRef,
  ApplicationRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SafeAny } from './../utils/safe-any';

@Directive({
  selector: '[ionPopConfirm]',
})
export class PopConfirmDirective {
  @Input() ionPopConfirmTitle = 'Tem certeza?';
  private popconfirmComponentRef!: ComponentRef<PopConfirmComponent>;

  constructor(
    // TODO: SafeAny used due to an issue in Angular 8 (https://github.com/angular/angular/issues/20351). When projects are updated to v9, change "SafeAny" to "Document";
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open(): void {
    const popover = this.componentFactoryResolver
      .resolveComponentFactory(PopConfirmComponent)
      .create(this.injector);

    this.popconfirmComponentRef = popover;

    this.appRef.attachView(this.popconfirmComponentRef.hostView);
    this.popconfirmComponentRef.changeDetectorRef.detectChanges();

    const popconfirmElement =
      this.popconfirmComponentRef.location.nativeElement;
    this.document.body.appendChild(popconfirmElement);
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.open();
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.appRef.detachView(this.popconfirmComponentRef.hostView);
    this.popconfirmComponentRef.destroy();
  }
}

@Component({
  selector: 'ion-popconfirm',
  template: `
    <div>
      <h2>OLLAAA!</h2>
    </div>
  `,
  exportAs: 'PopConfirmComponent',
})
export class PopConfirmComponent {}
