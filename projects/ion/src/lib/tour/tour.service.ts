import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
} from '@angular/core';
import { isEmpty, isNull } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';

import { IonTourBackdropComponent } from './tour-backdrop';
import { IonStartTourProps, IonTourPopoverProps } from '../core/types/tour';
import { SafeAny } from '../utils/safe-any';

type StepsMap = Map<IonTourPopoverProps['ionStepId'], IonTourPopoverProps>;

@Injectable()
export class IonTourService {
  public currentStep = new BehaviorSubject<IonTourPopoverProps | null>(null);

  private activeTour = new BehaviorSubject<string | null>(null);
  private _tours: Record<string, StepsMap> = {};
  private backdropRef: ComponentRef<IonTourBackdropComponent> | null = null;

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
    if (!this._tours[step.ionTourId].size) {
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
    this.destroyBackdrop();
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
    this.currentStep$.subscribe((step) => {
      if (this.backdropRef) {
        this.backdropRef.instance.currentStep = step;
      }
    });

    this.activeTour$.subscribe((activeTour) => {
      if (this.backdropRef) {
        this.backdropRef.instance.isActive = !isNull(activeTour);
      }
    });
  }

  private destroyBackdrop(): void {
    if (this.backdropRef) {
      this.appRef.detachView(this.backdropRef.hostView);
      this.backdropRef.destroy();
      this.backdropRef = null;
    }
  }
}
