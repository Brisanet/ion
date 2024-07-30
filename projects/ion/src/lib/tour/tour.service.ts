import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
} from '@angular/core';
import { isEmpty, isEqual, isNull } from 'lodash';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IonStartTourProps, IonTourPopoverProps } from '../core/types/tour';
import { SafeAny } from '../utils/safe-any';
import { IonTourBackdropComponent } from './tour-backdrop';

type StepsMap = Map<IonTourPopoverProps['ionStepId'], IonTourPopoverProps>;

@Injectable()
export class IonTourService {
  public currentStep = new BehaviorSubject<IonTourPopoverProps | null>(null);

  private activeTour = new BehaviorSubject<string | null>(null);
  private _tours: Record<string, StepsMap> = {};
  private backdropRef: ComponentRef<IonTourBackdropComponent> | null = null;
  private destroyBackdrop$ = new Subject<void>();

  public get currentStep$(): Observable<IonTourPopoverProps | null> {
    return this.currentStep.asObservable();
  }

  public get activeTour$(): Observable<string | null> {
    return this.activeTour.asObservable();
  }

  public get steps(): IonTourPopoverProps[] {
    return Array.from(this._tours[this.activeTourId].values());
  }

  private get activeTourId(): string {
    return this.activeTour.value || Object.keys(this._tours)[0];
  }

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public saveStep(step: IonTourPopoverProps): void {
    if (!this._tours[step.ionTourId]) {
      this._tours[step.ionTourId] = new Map();
    }

    const current = this.currentStep.value;

    if (
      current &&
      current.ionStepId === step.ionStepId &&
      !this.areDOMRectsEqual(step.target, current.target)
    ) {
      console.log(
        isEqual(step.target, current.target),
        step.target,
        current.target
      );
      this.navigateToStep(step);
    }

    this._tours[step.ionTourId].set(step.ionStepId, step);
  }

  public removeStep(stepId: IonTourPopoverProps['ionStepId']): void {
    this._tours[this.activeTourId].delete(stepId);
  }

  public start(props: IonStartTourProps = {}): void {
    setTimeout(() => {
      if (isEmpty(this._tours)) {
        console.error('No steps found!');
        return;
      }

      const tour = props.tourId || Object.keys(this._tours)[0];
      if (!(tour in this._tours)) {
        console.error('Tour not found!');
        return;
      }

      this.activeTour.next(tour);
      this.navigateToStep(this.getFirstStep());
      this.createBackdrop();
    });
  }

  public finish(): void {
    this.activeTour.next(null);
    this.currentStep.next(null);
    this.closeBackdrop();
  }

  public prevStep(): void {
    const currentStep = this.currentStep.getValue();
    const prevStep = this._tours[this.activeTourId].get(
      currentStep.ionPrevStepId
    );

    if (prevStep) {
      this.navigateToStep(prevStep);
    }
  }

  public nextStep(): void {
    const currentStep = this.currentStep.getValue();
    const nextStep = this._tours[this.activeTourId].get(
      currentStep.ionNextStepId
    );

    if (nextStep) {
      this.navigateToStep(nextStep);
    } else {
      this.finish();
    }
  }

  private getFirstStep(
    step: IonTourPopoverProps = this.steps[0]
  ): IonTourPopoverProps {
    if (step.ionPrevStepId) {
      return this.getFirstStep(
        this._tours[this.activeTourId].get(step.ionPrevStepId)
      );
    }
    return step;
  }

  private navigateToStep(step: IonTourPopoverProps): void {
    this.currentStep.next(step);
  }

  private createBackdrop(): void {
    if (this.backdropRef) {
      this.destroyBackdrop();
    }

    this.backdropRef = this.componentFactoryResolver
      .resolveComponentFactory(IonTourBackdropComponent)
      .create(this.injector);

    this.appRef.attachView(this.backdropRef.hostView);

    const popoverElement = this.backdropRef.location
      .nativeElement as HTMLElement;

    this.document.body.appendChild(popoverElement);
    this.backdropRef.changeDetectorRef.detectChanges();
    this.updateBackdropProps();
  }

  private updateBackdropProps(): void {
    this.currentStep$
      .pipe(takeUntil(this.destroyBackdrop$))
      .subscribe((step) => {
        if (this.backdropRef) {
          this.backdropRef.instance.currentStep = step;
        }
      });

    this.activeTour$
      .pipe(takeUntil(this.destroyBackdrop$))
      .subscribe((activeTour) => {
        if (this.backdropRef) {
          this.backdropRef.instance.isActive = !isNull(activeTour);
        }
      });
  }

  private closeBackdrop(): void {
    if (this.backdropRef) {
      this.backdropRef.instance.performFinalTransition(() => {
        if (this.backdropRef && !this.activeTour.value) {
          this.destroyBackdrop();
        }
      });
    }
  }

  private destroyBackdrop(): void {
    if (this.backdropRef) {
      this.appRef.detachView(this.backdropRef.hostView);
      this.backdropRef.destroy();
      this.backdropRef = null;
      this.destroyBackdrop$.next();
      this.destroyBackdrop$.complete();
    }
  }

  private areDOMRectsEqual(rect1: DOMRect, rect2: DOMRect) {
    return (
      rect1.x === rect2.x &&
      rect1.y === rect2.y &&
      rect1.width === rect2.width &&
      rect1.height === rect2.height &&
      rect1.top === rect2.top &&
      rect1.right === rect2.right &&
      rect1.bottom === rect2.bottom &&
      rect1.left === rect2.left
    );
  }
}
