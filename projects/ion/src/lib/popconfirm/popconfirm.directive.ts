import {
  ComponentRef,
  Directive,
  ElementRef,
  OnDestroy,
  input,
  output,
  inject,
  ViewContainerRef,
  HostListener,
} from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
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
  standalone: true,
})
export class IonPopConfirmDirective implements OnDestroy {
  ionPopConfirmTitle = input<string>('Tem certeza?');
  ionPopConfirmDesc = input<string>('');
  ionPopConfirmType = input<StatusType>('warning');
  ionConfirmText = input<string>('Confirmar');
  ionCancelText = input<string>('Cancelar');
  ionPopConfirmCloseOnScroll = input<boolean>(false);

  ionOnConfirm = output<void>();
  ionOnClose = output<void>();

  private componentRef: ComponentRef<IonPopConfirmComponent> | null = null;
  private overlayRef: OverlayRef | null = null;

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);

  open(): void {
    this.closePopConfirm();
    this.createPopConfirm();
  }

  closePopConfirm(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.componentRef = null;
    }
  }

  private createPopConfirm(): void {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(this.getPositions())
      .withPush(true);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.ionPopConfirmCloseOnScroll()
        ? this.overlay.scrollStrategies.close()
        : this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this.overlayRef.backdropClick().subscribe(() => this.closePopConfirm());

    positionStrategy.positionChanges.subscribe((change) => {
      if (this.componentRef) {
        const isBottom = change.connectionPair.originY === 'top';
        this.componentRef.instance.ionPopConfirmPosition.set(
          isBottom ? 'bottom' : ''
        );
      }
    });

    const portal = new ComponentPortal(
      IonPopConfirmComponent,
      this.viewContainerRef
    );
    this.componentRef = this.overlayRef.attach(portal);

    this.updateComponentProperties();

    this.componentRef.instance.ionOnConfirm.subscribe(() => {
      this.closePopConfirm();
      this.ionOnConfirm.emit();
    });

    this.componentRef.instance.ionOnClose.subscribe(() => {
      this.closePopConfirm();
      this.ionOnClose.emit();
    });
  }

  private updateComponentProperties(): void {
    if (this.componentRef) {
      this.componentRef.setInput(
        'ionPopConfirmTitle',
        this.ionPopConfirmTitle()
      );
      this.componentRef.setInput('ionPopConfirmDesc', this.ionPopConfirmDesc());
      this.componentRef.setInput('ionPopConfirmType', this.ionPopConfirmType());
      this.componentRef.setInput('ionConfirmText', this.ionConfirmText());
      this.componentRef.setInput('ionCancelText', this.ionCancelText());
    }
  }

  private getPositions(): ConnectedPosition[] {
    return [
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: 10,
      },
      {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -10,
      },
    ];
  }

  @HostListener('click') onClick(): void {
    if (this.elementsAreEnabled(this.elementRef.nativeElement)) {
      this.open();
    }
  }

  elementsAreEnabled(element: HTMLElement): boolean {
    const disabled =
      element.hasAttribute('disabled') ||
      element.getAttribute('ng-reflect-disabled') === 'true' ||
      element.classList.contains('disabled') ||
      element.getAttribute('loading') === 'true' ||
      element.getAttribute('ng-reflect-loading') === 'true';

    if (disabled) {
      return false;
    }

    const children = element.querySelectorAll('*');
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (
        child.hasAttribute('disabled') ||
        child.getAttribute('ng-reflect-disabled') === 'true' ||
        child.classList.contains('disabled') ||
        child.getAttribute('loading') === 'true' ||
        child.getAttribute('ng-reflect-loading') === 'true'
      ) {
        return false;
      }
    }

    return true;
  }

  // These methods are kept for backward compatibility with existing tests
  setPosition(
    _element: HTMLElement,
    _docWidth: number,
    _position: PopPosition
  ): PopOffset {
    return {
      top: _position.top,
      left: _position.left - 12,
      width: 210,
      screenOffset: (_docWidth - _position.left) / 2,
    };
  }

  setStyle(element: HTMLElement, offset: PopOffset): void {
    if (!element) return;
    element.classList.remove(
      'sup-container',
      'sup-container-right',
      'sup-container-bottom'
    );
    if (offset.left < 450) {
      element.classList.add('sup-container-right');
    }
    if (offset.top > 1000) {
      element.classList.add('sup-container-bottom');
    }
    if (element.classList.length === 0) {
      element.classList.add('sup-container');
    }
  }

  ngOnDestroy(): void {
    this.closePopConfirm();
  }
}
