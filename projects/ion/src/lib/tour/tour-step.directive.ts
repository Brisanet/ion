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
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PopoverButtonsProps, PopoverPosition } from '../core/types';
import { IonTourStepProps } from '../core/types/tour';
import { IonPopoverComponent } from '../popover/component/popover.component';
import { IonPositionService } from '../position/position.service';
import { SafeAny } from '../utils/safe-any';
import { generatePositionCallback } from './tour-position.calculator';
import { IonTourService } from './tour.service';

interface Position {
  top: number;
  left: number;
}

@Directive({ selector: '[ionTourStep]' })
export class IonTourStepDirective implements OnInit, OnChanges, OnDestroy {
  @Input() ionTourId!: IonTourStepProps['ionTourId'];
  @Input() ionStepId!: IonTourStepProps['ionStepId'];
  @Input() ionStepTitle?: IonTourStepProps['ionStepTitle'];
  @Input() ionStepBody?: IonTourStepProps['ionStepBody'];
  @Input() ionStepPrevBtnTitle?: IonTourStepProps['ionStepPrevBtnTitle'] =
    'Previous';
  @Input() ionStepSkipBtnTitle?: IonTourStepProps['ionStepSkipBtnTitle'] =
    'Skip';
  @Input()
  ionStepNextBtnTitle?: IonTourStepProps['ionStepNextBtnTitle'] = 'Next';
  @Input()
  ionStepFinishBtnTitle?: IonTourStepProps['ionStepFinishBtnTitle'] = 'Finish';
  @Input() ionPrevStepId?: IonTourStepProps['ionPrevStepId'];
  @Input() ionNextStepId?: IonTourStepProps['ionNextStepId'];
  @Input() ionStepPosition?: IonTourStepProps['ionStepPosition'] =
    PopoverPosition.BOTTOM_CENTER;
  @Input()
  ionStepMarginToContent?: IonTourStepProps['ionStepMarginToContent'] = 5;
  @Input()
  ionStepBackdropPadding?: IonTourStepProps['ionStepBackdropPadding'] = 10;
  @Input()
  ionStepCustomClass?: IonTourStepProps['ionStepBackdropCustomClass'];
  @Input()
  ionStepBackdropCustomClass?: IonTourStepProps['ionStepBackdropCustomClass'];

  @Output() ionOnPrevStep: IonTourStepProps['ionOnPrevStep'] =
    new EventEmitter();
  @Output() ionOnNextStep: IonTourStepProps['ionOnNextStep'] =
    new EventEmitter();
  @Output() ionOnFinishTour: IonTourStepProps['ionOnFinishTour'] =
    new EventEmitter();

  private popoverRef: ComponentRef<IonPopoverComponent> | null = null;

  private isStepSelected = false;
  private isTourActive = false;
  private destroy$ = new Subject<void>();

  private popoverPosition: Position = {
    top: 0,
    left: 0,
  };

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private readonly viewRef: ViewContainerRef,
    private elementRef: ElementRef,
    private injector: Injector,
    private cdr: ChangeDetectorRef,
    private tourService: IonTourService,
    private positionService: IonPositionService
  ) {}

  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    this.checkPopoverVisibility();
  }

  public ngOnInit(): void {
    this.tourService.saveStep(this.toJSON());

    this.tourService.activeTour$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isActive) => {
        this.isTourActive = isActive === this.ionTourId;
        this.checkPopoverVisibility();
      });

    this.tourService.currentStep$
      .pipe(takeUntil(this.destroy$))
      .subscribe((step) => {
        this.isStepSelected = step && step.ionStepId === this.ionStepId;
        this.checkPopoverVisibility();
      });
  }

  public ngOnChanges(): void {
    this.checkPopoverVisibility();
  }

  public ngOnDestroy(): void {
    this.viewRef.clear();
    this.destroyPopoverElement();
    this.tourService.removeStep(this.ionStepId);
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkPopoverVisibility(): void {
    this.tourService.saveStep(this.toJSON());
    this.destroyPopoverElement();

    if (this.isTourActive && this.isStepSelected) {
      this.createPopoverElement();
    }
  }

  private createPopoverElement(): void {
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
    const popoverProps: Partial<IonPopoverComponent> = {
      ionPopoverTitle: this.ionStepTitle,
      ionPopoverBody: this.ionStepBody,
      ionPopoverActions: this.generatePopoverActions(),
      ionPopoverPosition:
        this.positionService.getCurrentPosition() as PopoverPosition,
      ionPopoverCustomClass: 'ion-tour-popover ' + this.ionStepCustomClass,
      ionPopoverIconClose: true,
      ionPopoverKeep: true,
      ...this.popoverPosition,
    };

    for (const [key, value] of Object.entries(popoverProps)) {
      this.popoverRef.instance[key] = value;
    }

    this.cdr.detectChanges();
  }

  private generatePopoverActions(): PopoverButtonsProps[] {
    const firstButtonLabel = this.ionPrevStepId
      ? this.ionStepPrevBtnTitle
      : this.ionStepSkipBtnTitle;

    const secondButtonLabel = this.ionNextStepId
      ? this.ionStepNextBtnTitle
      : this.ionStepFinishBtnTitle;

    return [firstButtonLabel, secondButtonLabel].map((label) => ({ label }));
  }

  private listenToPopoverEvents(): void {
    const eventHandlers: [string, () => void][] = [
      ['ionOnFirstAction', () => this.tourService.prevStep()],
      ['ionOnSecondAction', () => this.tourService.nextStep()],
      ['ionOnClose', () => this.tourService.finish()],
    ];

    eventHandlers.forEach(([event, action]) => {
      this.popoverRef.instance[event]
        .pipe(takeUntil(this.destroy$))
        .subscribe(action);
    });
  }

  private repositionPopover(): void {
    if (this.ionStepId) {
      const contentRect =
        this.popoverRef.instance.popover.nativeElement.getBoundingClientRect();

      this.positionService.setHostPosition(
        this.elementRef.nativeElement.getBoundingClientRect()
      );
      this.positionService.setChoosedPosition(this.ionStepPosition);
      this.positionService.setElementPadding(this.ionStepMarginToContent);
      this.positionService.setcomponentCoordinates(contentRect);

      this.popoverPosition = this.positionService.getNewPosition(
        generatePositionCallback(
          this.ionStepBackdropPadding,
          this.ionStepMarginToContent
        )
      );

      this.updatePopoverProps();
    }
  }

  private destroyPopoverElement(): void {
    if (this.popoverRef) {
      this.appRef.detachView(this.popoverRef.hostView);
      this.popoverRef.destroy();
      this.popoverRef = null;
    }
  }

  private toJSON(): IonTourStepProps {
    return {
      ionStepId: this.ionStepId,
      ionTourId: this.ionTourId,
      ionStepTitle: this.ionStepTitle,
      ionStepBody: this.ionStepBody,
      ionStepPrevBtnTitle: this.ionStepPrevBtnTitle,
      ionStepSkipBtnTitle: this.ionStepPrevBtnTitle,
      ionStepNextBtnTitle: this.ionStepNextBtnTitle,
      ionStepFinishBtnTitle: this.ionStepFinishBtnTitle,
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
      target: this.elementRef.nativeElement.getBoundingClientRect(),
    };
  }
}
