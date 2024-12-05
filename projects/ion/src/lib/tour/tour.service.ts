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

import { IonStartTourProps, IonTourStepProps } from '../core/types/tour';
import { SafeAny } from '../utils/safe-any';
import { IonTourBackdropComponent } from './tour-backdrop';

type StepsMap = Map<IonTourStepProps['ionStepId'], IonTourStepProps>;

@Injectable()
export class IonTourService {
  public currentStep = new BehaviorSubject<IonTourStepProps | null>(null);
  public activeTour = new BehaviorSubject<string | null>(null);

  private _tours: Record<string, StepsMap> = {};
  private backdropRef: ComponentRef<IonTourBackdropComponent> | null = null;
  private destroyBackdrop$ = new Subject<void>();

  public get currentStep$(): Observable<IonTourStepProps | null> {
    return this.currentStep.asObservable();
  }

  public get activeTour$(): Observable<string | null> {
    return this.activeTour.asObservable();
  }

  public get steps(): IonTourStepProps[] {
    return Array.from(this._tours[this.activeTourId].values());
  }

  private get activeTourId(): string {
    return this.activeTour.value || Object.keys(this._tours)[0];
  }

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  public saveStep(step: IonTourStepProps): void {
    if (!this._tours[step.ionTourId]) {
      this._tours[step.ionTourId] = new Map();
    }

    const current = this.currentStep.value;

    if (
      current &&
      current.ionStepId === step.ionStepId &&
      !isEqual(step.target.toJSON(), current.target.toJSON())
    ) {
      this.navigateToStep(step);
    }

    this._tours[step.ionTourId].set(step.ionStepId, step);
  }

  public removeStep(stepId: IonTourStepProps['ionStepId']): void {
    if (this._tours[this.activeTourId]) {
      this._tours[this.activeTourId].delete(stepId);
    }
  }

  public start(props: IonStartTourProps = {}): void {
    setTimeout(() => {
      if (isEmpty(this._tours)) {
        // eslint-disable-next-line no-console
        console.error('No steps found!');
        return;
      }

      const tour = props.tourId || Object.keys(this._tours)[0];
      if (!(tour in this._tours)) {
        // eslint-disable-next-line no-console
        console.error('Tour not found!');
        return;
      }

      this.activeTour.next(tour);
      this.navigateToStep(this.getFirstStep());
      this.createBackdrop();
    });
  }

  public finish(): void {
    if (this.currentStep.value) {
      this.currentStep.value.ionOnFinishTour.emit();
    }
    this.activeTour.next(null);
    this.currentStep.next(null);
    this.closeBackdrop();
  }

  public prevStep(): void {
    const currentStep = this.currentStep.getValue();
    currentStep.ionOnPrevStep.emit();

    const prevStep = this._tours[this.activeTourId].get(
      currentStep.ionPrevStepId
    );

    if (prevStep) {
      this.navigateToStep(prevStep);
    } else {
      this.finish();
    }
  }

  public nextStep(): void {
    const currentStep = this.currentStep.getValue();
    currentStep.ionOnNextStep.emit();

    if (!currentStep.ionNextStepId) {
      this.finish();
      return;
    }

    setTimeout(() => {
      const nextStep = this._tours[this.activeTourId].get(
        currentStep.ionNextStepId
      );

      this.navigateToStep(nextStep);
    });
  }

  private getFirstStep(
    step: IonTourStepProps = this.steps[0]
  ): IonTourStepProps {
    if (step.ionPrevStepId) {
      return this.getFirstStep(
        this._tours[this.activeTourId].get(step.ionPrevStepId)
      );
    }
    return step;
  }

  private navigateToStep(step: IonTourStepProps): void {
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
}
