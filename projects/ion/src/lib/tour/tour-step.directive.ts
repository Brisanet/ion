import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Injector,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PopoverPosition } from '../core/types';
import { IonTourStepProps as StepProps } from '../core/types/tour';
import { IonPopoverComponent } from '../popover/component/popover.component';
import { IonPositionService } from '../position/position.service';
import { SafeAny } from '../utils/safe-any';
import { generatePositionCallback } from './tour-position.calculator';
import { IonTourService } from './tour.service';

@Directive({ selector: '[ionTourStep]' })
export class IonTourStepDirective implements OnInit, OnChanges, OnDestroy {
  @Input() ionTourId!: StepProps['ionTourId'];
  @Input() ionStepId!: StepProps['ionStepId'];
  @Input() ionStepTitle?: StepProps['ionStepTitle'];
  @Input() ionStepBody?: StepProps['ionStepBody'];
  @Input() ionPrevStepBtn?: StepProps['ionPrevStepBtn'];
  @Input() ionNextStepBtn?: StepProps['ionNextStepBtn'];
  @Input() ionPrevStepId?: StepProps['ionPrevStepId'];
  @Input() ionNextStepId?: StepProps['ionNextStepId'];
  @Input() ionStepPosition?: StepProps['ionStepPosition'] =
    PopoverPosition.BOTTOM_CENTER;
  @Input() ionStepMarginToContent?: StepProps['ionStepMarginToContent'] = 0;
  @Input() ionStepBackdropPadding?: StepProps['ionStepBackdropPadding'] = 8;
  @Input() ionStepCustomClass?: StepProps['ionStepBackdropCustomClass'];
  @Input() ionStepBackdropCustomClass?: StepProps['ionStepBackdropCustomClass'];

  @Output() ionOnPrevStep: StepProps['ionOnPrevStep'] = new EventEmitter();
  @Output() ionOnNextStep: StepProps['ionOnNextStep'] = new EventEmitter();
  @Output() ionOnFinishTour: StepProps['ionOnFinishTour'] = new EventEmitter();

  private popoverRef: ComponentRef<IonPopoverComponent> | null = null;

  private isStepSelected = false;
  private isTourActive = false;
  private destroy$ = new Subject<void>();

  private interval: ReturnType<typeof setInterval>;
  private hostPosition: DOMRect;

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private readonly viewRef: ViewContainerRef,
    private elementRef: ElementRef,
    private injector: Injector,
    private cdr: ChangeDetectorRef,
    private tourService: IonTourService,
    private positionService: IonPositionService,
    private ngZone: NgZone
  ) {}

  public ngOnInit(): void {
    this.tourService.saveStep(this.toJSON());

    this.tourService.activeTour$
      .pipe(takeUntil(this.destroy$))
      .subscribe((activeTourId) => {
        this.isTourActive = activeTourId === this.ionTourId;
        this.checkPopoverVisibility();
      });

    this.tourService.currentStep$
      .pipe(takeUntil(this.destroy$))
      .subscribe((step) => {
        if (step) {
          const isSameStep = step.ionStepId === this.ionStepId;
          if (this.isStepSelected !== isSameStep) {
            this.isStepSelected = isSameStep;
            this.checkPopoverVisibility();
          }
        } else {
          this.isStepSelected = false;
        }
      });
  }

  public ngOnChanges(): void {
    if (this.popoverRef) {
      this.updatePopoverProps();
    }
  }

  public ngOnDestroy(): void {
    this.viewRef.clear();
    this.destroyPopoverElement();
    this.tourService.removeStep(this.ionStepId);
    this.destroy$.next();
    this.destroy$.complete();
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private observeHostPosition(): void {
    this.ngZone.runOutsideAngular(() => {
      const interval30FPSinMs = 1000 / 30;
      this.interval = setInterval(() => {
        this.ngZone.run(() => {
          if (this.hostPositionChanged()) {
            this.repositionPopover();
          }
        });
      }, interval30FPSinMs);
    });
  }

  @HostListener('window:resize', ['$event'])
  private repositionPopover(): void {
    if (this.ionStepId && this.popoverRef) {
      const contentRect =
        this.popoverRef.instance.popover.nativeElement.getBoundingClientRect();

      this.hostPosition = this.elementRef.nativeElement.getBoundingClientRect();
      this.positionService.setHostPosition(this.hostPosition);
      this.positionService.setChoosedPosition(this.ionStepPosition);
      this.positionService.setElementPadding(this.ionStepMarginToContent);
      this.positionService.setcomponentCoordinates(contentRect);

      const position = this.positionService.getNewPosition(
        generatePositionCallback(
          this.ionStepBackdropPadding,
          this.ionStepMarginToContent
        )
      );

      this.popoverRef.instance.top = position.top + window.scrollY;
      this.popoverRef.instance.left = position.left + window.scrollX;

      this.tourService.saveStep(this.toJSON());
    }
  }

  private checkPopoverVisibility(): void {
    this.tourService.saveStep(this.toJSON());
    this.destroyPopoverElement();

    if (this.isTourActive && this.isStepSelected) {
      setTimeout(() => {
        this.createPopoverElement();
        this.observeHostPosition();
      });
    }
  }

  private createPopoverElement(): void {
    this.destroyPopoverElement();

    this.popoverRef = this.componentFactoryResolver
      .resolveComponentFactory(IonPopoverComponent)
      .create(this.injector);

    this.appRef.attachView(this.popoverRef.hostView);

    const popoverElement = this.popoverRef.location
      .nativeElement as HTMLElement;

    this.document.body.appendChild(popoverElement);
    this.popoverRef.changeDetectorRef.detectChanges();

    this.updatePopoverProps();
    this.listenToPopoverEvents();

    setTimeout(() => this.repositionPopover());
  }

  private updatePopoverProps(): void {
    const ionPopoverActions = [
      this.ionPrevStepBtn || { label: 'Voltar' },
      this.ionNextStepBtn || { label: 'Continuar' },
    ];

    const popoverProps: Partial<IonPopoverComponent> = {
      ionPopoverTitle: this.ionStepTitle,
      ionPopoverBody: this.ionStepBody,
      ionPopoverPosition:
        this.positionService.getCurrentPosition() as PopoverPosition,
      ionPopoverIconClose: true,
      ionPopoverKeep: true,
      ionPopoverCustomClass: 'ion-tour-popover ' + this.ionStepCustomClass,
      ionPopoverActions,
    };

    for (const [key, value] of Object.entries(popoverProps)) {
      this.popoverRef.instance[key] = value;
    }

    this.cdr.detectChanges();
    this.repositionPopover();
  }

  private listenToPopoverEvents(): void {
    const eventHandlers: [string, () => void][] = [
      ['ionOnFirstAction', this.tourService.prevStep],
      ['ionOnSecondAction', this.tourService.nextStep],
      ['ionOnClose', this.tourService.finish],
    ];

    eventHandlers.forEach(([event, action]) => {
      this.popoverRef.instance[event]
        .pipe(takeUntil(this.destroy$))
        .subscribe(action.bind(this.tourService));
    });
  }

  private hostPositionChanged(): boolean {
    const newPosition = this.elementRef.nativeElement.getBoundingClientRect();
    return !(
      this.hostPosition &&
      newPosition &&
      this.hostPosition.x === newPosition.x &&
      this.hostPosition.y === newPosition.y &&
      this.hostPosition.width === newPosition.width &&
      this.hostPosition.height === newPosition.height
    );
  }

  private destroyPopoverElement(): void {
    if (this.popoverRef) {
      this.appRef.detachView(this.popoverRef.hostView);
      this.popoverRef.destroy();
      this.popoverRef = null;
    }
  }

  private toJSON(): StepProps {
    return {
      ionStepId: this.ionStepId,
      ionTourId: this.ionTourId,
      ionStepTitle: this.ionStepTitle,
      ionStepBody: this.ionStepBody,
      ionPrevStepBtn: this.ionPrevStepBtn,
      ionNextStepBtn: this.ionNextStepBtn,
      ionPrevStepId: this.ionPrevStepId,
      ionNextStepId: this.ionNextStepId,
      ionStepPosition: this.ionStepPosition,
      ionStepMarginToContent: this.ionStepMarginToContent,
      ionStepBackdropPadding: this.ionStepBackdropPadding,
      ionStepCustomClass: this.ionStepCustomClass,
      ionStepBackdropCustomClass: this.ionStepBackdropCustomClass,
      ionOnPrevStep: this.ionOnPrevStep,
      ionOnNextStep: this.ionOnNextStep,
      ionOnFinishTour: this.ionOnFinishTour,
      getTarget: () => this.elementRef.nativeElement.getBoundingClientRect(),
    };
  }
}
