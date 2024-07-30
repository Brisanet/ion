import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
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

import {
  IonTourPopoverProps,
  IonTourStepPositions,
  IonTourStepProps,
} from '../core/types/tour';
import { SafeAny } from '../utils/safe-any';
import { IonTourPopoverComponent } from './tour-popover';
import { IonTourService } from './tour.service';

@Directive({ selector: '[ionTourStep]' })
export class IonTourStepDirective implements OnInit, OnChanges, OnDestroy {
  @Input() ionTourId!: IonTourStepProps['ionTourId'];
  @Input() ionStepId!: IonTourStepProps['ionStepId'];
  @Input() ionStepTitle?: IonTourStepProps['ionStepTitle'];
  @Input() ionStepContent?: IonTourStepProps['ionStepContent'];
  @Input() ionStepPrevBtnTitle: IonTourStepProps['ionStepPrevBtnTitle'] =
    'Previous';
  @Input()
  public ionStepNextBtnTitle?: IonTourStepProps['ionStepNextBtnTitle'] = 'Next';
  @Input()
  public ionStepFinishBtnTitle?: IonTourStepProps['ionStepFinishBtnTitle'] =
    'Finish';
  @Input() ionPrevStepId?: IonTourStepProps['ionPrevStepId'];
  @Input() ionNextStepId?: IonTourStepProps['ionNextStepId'];
  @Input() ionStepPosition: IonTourStepProps['ionStepPosition'] =
    IonTourStepPositions.BOTTOM_CENTER;
  @Input()
  public ionStepMarginToContent: IonTourStepProps['ionStepMarginToContent'] = 5;
  @Input()
  public ionStepBackdropPadding: IonTourStepProps['ionStepBackdropPadding'] = 10;
  @Input()
  public ionStepCustomClass?: IonTourPopoverProps['ionStepBackdropCustomClass'];
  @Input()
  public ionStepBackdropCustomClass?: IonTourPopoverProps['ionStepBackdropCustomClass'];

  @Output() ionOnPrevStep: IonTourStepProps['ionOnPrevStep'] =
    new EventEmitter();
  @Output() ionOnNextStep: IonTourStepProps['ionOnNextStep'] =
    new EventEmitter();
  @Output() ionOnFinishTour: IonTourStepProps['ionOnFinishTour'] =
    new EventEmitter();

  private popoverRef: ComponentRef<IonTourPopoverComponent> | null = null;

  private isStepSelected = false;
  private isTourActive = false;
  private destroy$ = new Subject<void>();

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private readonly viewRef: ViewContainerRef,
    private elementRef: ElementRef,
    private injector: Injector,
    private tourService: IonTourService
  ) {}

  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    this.checkPopoverVisibility();
  }

  public ngOnInit(): void {
    this.tourService.saveStep(this.getPopoverProps());

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
    this.tourService.saveStep(this.getPopoverProps());
    this.destroyPopoverElement();

    if (this.isTourActive && this.isStepSelected) {
      this.createPopoverElement();
    }
  }

  private createPopoverElement(): void {
    this.popoverRef = this.componentFactoryResolver
      .resolveComponentFactory(IonTourPopoverComponent)
      .create(this.injector);

    this.appRef.attachView(this.popoverRef.hostView);

    const popoverElement = this.popoverRef.location
      .nativeElement as HTMLElement;

    this.document.body.appendChild(popoverElement);
    this.popoverRef.changeDetectorRef.detectChanges();

    for (const [key, value] of Object.entries(this.getPopoverProps())) {
      this.popoverRef.instance[key] = value;
    }
  }

  private destroyPopoverElement(): void {
    if (this.popoverRef) {
      this.appRef.detachView(this.popoverRef.hostView);
      this.popoverRef.destroy();
      this.popoverRef = null;
    }
  }

  private getPopoverProps(): IonTourPopoverProps {
    return {
      ionStepId: this.ionStepId,
      ionTourId: this.ionTourId,
      ionStepTitle: this.ionStepTitle,
      ionStepContent: this.ionStepContent,
      ionStepPrevBtnTitle: this.ionStepPrevBtnTitle,
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
