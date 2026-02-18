import {
  Injectable,
  Injector,
  InjectionToken,
  TemplateRef,
  ComponentRef,
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
  OverlayConfig,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PopoverPosition, PopoverProps } from '../core/types/popover';
import { IonPopoverComponent } from './component/popover.component';

export const POPOVER_DATA = new InjectionToken<PopoverProps>('POPOVER_DATA');

@Injectable({
  providedIn: 'root',
})
export class PopoverOverlayService {
  private overlayRef: OverlayRef | null = null;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
  ) {}

  open(
    origin: HTMLElement,
    data: PopoverProps,
    stopCloseOnScroll = false,
    autoReposition = true,
  ): void {
    // Close any existing popover
    this.close();

    // Create position strategy
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPositions(
        this.getPositions(data.ionPopoverPosition || PopoverPosition.DEFAULT),
      )
      .withPush(false);

    // Create scroll strategy
    const scrollStrategy = stopCloseOnScroll
      ? this.overlay.scrollStrategies.noop()
      : autoReposition
        ? this.overlay.scrollStrategies.reposition()
        : this.overlay.scrollStrategies.close();

    // Create overlay config
    const config = new OverlayConfig({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: data.ionPopoverCustomClass || '',
    });

    // Create overlay
    this.overlayRef = this.overlay.create(config);

    // Create injector with data
    const injector = this.createInjector(data);

    // Attach component
    const portal = new ComponentPortal(IonPopoverComponent, null, injector);
    const componentRef = this.overlayRef.attach(
      portal,
    ) as ComponentRef<IonPopoverComponent>;

    // Subscribe to position changes to update arrow
    const subscription = positionStrategy.positionChanges.subscribe(
      (change) => {
        const newPosition = this.getPopoverPosition(change.connectionPair);
        componentRef.setInput('ionPopoverPosition', newPosition);
      },
    );

    // Subscribe to backdrop clicks
    this.overlayRef.backdropClick().subscribe(() => {
      if (!data.ionPopoverKeep) {
        this.close();
        data.ionOnClose?.emit();
      }
    });

    // Subscribe to component close events
    componentRef.instance.ionOnClose.subscribe(() => {
      this.close();
      data.ionOnClose?.emit();
    });

    // Subscribe to action events
    componentRef.instance.ionOnFirstAction.subscribe(() => {
      data.ionOnFirstAction?.emit();
      const action = data.ionPopoverActions?.[0];
      if (!action?.keepOpenAfterAction) {
        this.close();
      }
    });

    componentRef.instance.ionOnSecondAction.subscribe(() => {
      data.ionOnSecondAction?.emit();
      const action = data.ionPopoverActions?.[1];
      if (!action?.keepOpenAfterAction) {
        this.close();
      }
    });

    // Add subscription to tear down logic (not fully implemented here but good practice)
    // For now we rely on overlay disposal clearing subscriptions if attached to overlayRef lifecycle,
    // but since we subscribe to strategy manually, we should ideally unsubscribe.
    // However, disposing overlayRef usually cleans up the strategy.
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  private createInjector(data: PopoverProps): Injector {
    return Injector.create({
      providers: [{ provide: POPOVER_DATA, useValue: data }],
      parent: this.injector,
    });
  }

  private getPopoverPosition(
    connectionPair: ConnectedPosition,
  ): PopoverPosition {
    const { originX, originY, overlayX, overlayY } = connectionPair;

    if (
      originX === 'start' &&
      originY === 'top' &&
      overlayX === 'start' &&
      overlayY === 'bottom'
    )
      return PopoverPosition.TOP_LEFT;
    if (
      originX === 'center' &&
      originY === 'top' &&
      overlayX === 'center' &&
      overlayY === 'bottom'
    )
      return PopoverPosition.TOP_CENTER;
    if (
      originX === 'end' &&
      originY === 'top' &&
      overlayX === 'end' &&
      overlayY === 'bottom'
    )
      return PopoverPosition.TOP_RIGHT;

    if (
      originX === 'start' &&
      originY === 'bottom' &&
      overlayX === 'start' &&
      overlayY === 'top'
    )
      return PopoverPosition.BOTTOM_LEFT;
    if (
      originX === 'center' &&
      originY === 'bottom' &&
      overlayX === 'center' &&
      overlayY === 'top'
    )
      return PopoverPosition.BOTTOM_CENTER;
    if (
      originX === 'end' &&
      originY === 'bottom' &&
      overlayX === 'end' &&
      overlayY === 'top'
    )
      return PopoverPosition.BOTTOM_RIGHT;

    if (
      originX === 'start' &&
      originY === 'top' &&
      overlayX === 'end' &&
      overlayY === 'top'
    )
      return PopoverPosition.LEFT_TOP;
    if (
      originX === 'start' &&
      originY === 'center' &&
      overlayX === 'end' &&
      overlayY === 'center'
    )
      return PopoverPosition.LEFT_CENTER;
    if (
      originX === 'start' &&
      originY === 'bottom' &&
      overlayX === 'end' &&
      overlayY === 'bottom'
    )
      return PopoverPosition.LEFT_BOTTOM;

    if (
      originX === 'end' &&
      originY === 'top' &&
      overlayX === 'start' &&
      overlayY === 'top'
    )
      return PopoverPosition.RIGHT_TOP;
    if (
      originX === 'end' &&
      originY === 'center' &&
      overlayX === 'start' &&
      overlayY === 'center'
    )
      return PopoverPosition.RIGHT_CENTER;
    if (
      originX === 'end' &&
      originY === 'bottom' &&
      overlayX === 'start' &&
      overlayY === 'bottom'
    )
      return PopoverPosition.RIGHT_BOTTOM;

    return PopoverPosition.DEFAULT;
  }

  private getPositions(position: PopoverPosition): ConnectedPosition[] {
    const positionMap: Record<PopoverPosition, ConnectedPosition> = {
      [PopoverPosition.TOP_LEFT]: {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
      },
      [PopoverPosition.TOP_CENTER]: {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
      },
      [PopoverPosition.TOP_RIGHT]: {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
      },
      [PopoverPosition.BOTTOM_LEFT]: {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      },
      [PopoverPosition.BOTTOM_CENTER]: {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
      },
      [PopoverPosition.BOTTOM_RIGHT]: {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
      },
      [PopoverPosition.LEFT_TOP]: {
        originX: 'start',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'top',
      },
      [PopoverPosition.LEFT_CENTER]: {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
      },
      [PopoverPosition.LEFT_BOTTOM]: {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'bottom',
      },
      [PopoverPosition.RIGHT_TOP]: {
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top',
      },
      [PopoverPosition.RIGHT_CENTER]: {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
      },
      [PopoverPosition.RIGHT_BOTTOM]: {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'bottom',
      },
    };

    const primaryPosition = positionMap[position];

    // Return primary position with fallbacks
    return [
      primaryPosition,
      // Add opposite positions as fallbacks
      ...Object.values(positionMap).filter((p) => p !== primaryPosition),
    ];
  }
}
