import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';

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
  @Input() public ionTourId!: IonTourStepProps['ionTourId'];
  @Input() public ionStepId!: IonTourStepProps['ionStepId'];
  @Input() public ionStepTitle?: IonTourStepProps['ionStepTitle'];
  @Input() public ionStepContent?: IonTourStepProps['ionStepContent'];
  @Input() public ionStepPrevBtnTitle: IonTourStepProps['ionStepPrevBtnTitle'] =
    'Previous';
  @Input()
  public ionStepNextBtnTitle?: IonTourStepProps['ionStepNextBtnTitle'] = 'Next';
  @Input()
  public ionStepFinishBtnTitle?: IonTourStepProps['ionStepFinishBtnTitle'] =
    'Finish';
  @Input() public ionPrevStepId?: IonTourStepProps['ionPrevStepId'];
  @Input() public ionNextStepId?: IonTourStepProps['ionNextStepId'];
  @Input() public ionStepZIndex?: IonTourStepProps['ionStepZIndex'] = 101;
  @Input() public ionStepPosition: IonTourStepProps['ionStepPosition'] =
    IonTourStepPositions.BOTTOM_CENTER;
  @Input()
  public ionStepMarginToContent: IonTourStepProps['ionStepMarginToContent'] = 15;
  @Input() public ionStepWidth: IonTourStepProps['ionStepWidth'] = 'auto';
  @Input() public ionStepHeight: IonTourStepProps['ionStepHeight'] = 'auto';
  @Input()
  public ionStepBackdropPadding: IonTourStepProps['ionStepBackdropPadding'] = 10;
  @Input()
  public ionStepBackdropdZIndex: IonTourStepProps['ionStepBackdropdZIndex'] = 100;

  @Output() public ionOnPrevStep: IonTourStepProps['ionOnPrevStep'] =
    new EventEmitter();
  @Output() public ionOnNextStep: IonTourStepProps['ionOnNextStep'] =
    new EventEmitter();
  @Output() public ionOnFinishTour: IonTourStepProps['ionOnFinishTour'] =
    new EventEmitter();

  private popoverRef: ComponentRef<IonTourPopoverComponent> | null = null;

  private isStepSelected = false;
  private isTourActive = false;

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private readonly viewRef: ViewContainerRef,
    private elementRef: ElementRef,
    private injector: Injector,
    private tourService: IonTourService
  ) {}

  public ngOnInit(): void {
    this.tourService.saveStep(this.getStepProps());

    this.tourService.activeTour$.subscribe((isActive) => {
      this.isTourActive = isActive === this.ionTourId;
      this.checkPopoverVisibility();
    });

    this.tourService.currentStep$.subscribe((step) => {
      this.isStepSelected = step && step.ionStepId === this.ionStepId;
      this.checkPopoverVisibility();
    });
  }

  public ngOnChanges(): void {
    this.tourService.saveStep(this.getStepProps());
    this.checkPopoverVisibility();
  }

  public ngOnDestroy(): void {
    this.viewRef.clear();
    this.destroyPopoverElement();
    this.tourService.removeStep(this.ionStepId);
  }

  private checkPopoverVisibility(): void {
    this.tourService.saveStep(this.getStepProps());
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
    Object.assign(this.popoverRef.instance, this.getStepProps());
  }

  private destroyPopoverElement(): void {
    if (this.popoverRef) {
      this.appRef.detachView(this.popoverRef.hostView);
      this.popoverRef.destroy();
      this.popoverRef = null;
    }
  }

  private getStepProps(): IonTourPopoverProps {
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
      ionStepZIndex: this.ionStepZIndex,
      ionStepPosition: this.ionStepPosition,
      ionStepMarginToContent: this.ionStepMarginToContent,
      ionStepWidth: this.ionStepWidth,
      ionStepHeight: this.ionStepHeight,
      ionStepBackdropPadding: this.ionStepBackdropPadding,
      ionStepBackdropdZIndex: this.ionStepBackdropdZIndex,
      ionOnPrevStep: this.ionOnPrevStep,
      ionOnNextStep: this.ionOnNextStep,
      ionOnFinishTour: this.ionOnFinishTour,
      target: this.elementRef.nativeElement.getBoundingClientRect(),
    };
  }
}
