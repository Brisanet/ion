import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  EventEmitter,
  Injector,
} from '@angular/core';

import { IonTourStepProps } from '../core/types/tour';
import { IonTourBackdropComponent } from './tour-backdrop';
import { IonTourService } from './tour.service';

jest.useFakeTimers();

function performFinalTransition(callback: () => void): void {
  callback();
}

function resolveComponentFactory(): ComponentFactory<IonTourBackdropComponent> {
  return {
    create: () => backdropComponentMock,
  } as unknown as ComponentFactory<IonTourBackdropComponent>;
}

const backdropComponentMock = {
  hostView: {},
  location: { nativeElement: document.createElement('div') },
  changeDetectorRef: { detectChanges: jest.fn() },
  instance: { performFinalTransition },
  destroy: jest.fn(),
};

const componentFactoryResolverMock = {
  resolveComponentFactory,
} as unknown as ComponentFactoryResolver;

const applicationRefMock = {
  attachView: jest.fn(),
  detachView: jest.fn(),
} as unknown as ApplicationRef;

const TARGET_MOCK = {
  x: 300,
  y: 300,
  width: 100,
  height: 100,
  bottom: 400,
  right: 400,
  left: 300,
  top: 300,
  toJSON: () => ({ x: 300, y: 300, width: 100, height: 100 }),
} as DOMRect;

const stepsMock: IonTourStepProps[] = [
  {
    ionTourId: 'tour1',
    ionStepId: 'step1',
    getTarget: () => TARGET_MOCK,
    ionStepTitle: 'Step 1',
    ionNextStepId: 'step2',
    ionOnPrevStep: new EventEmitter(),
    ionOnNextStep: new EventEmitter(),
    ionOnFinishTour: new EventEmitter(),
  },
  {
    ionTourId: 'tour1',
    ionStepId: 'step2',
    getTarget: () => TARGET_MOCK,
    ionStepTitle: 'Step 2',
    ionPrevStepId: 'step1',
    ionOnPrevStep: new EventEmitter(),
    ionOnNextStep: new EventEmitter(),
    ionOnFinishTour: new EventEmitter(),
  },
];

describe('IonTourService', () => {
  let service: IonTourService;

  beforeEach(() => {
    service = new IonTourService(
      document,
      componentFactoryResolverMock,
      {} as Injector,
      applicationRefMock
    );
  });

  afterEach(jest.clearAllMocks);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('steps control', () => {
    it('should save a step', () => {
      const [step] = stepsMock;

      service.saveStep(step);

      expect(service.steps).toEqual([step]);
    });

    it('should remove a step', () => {
      const [step] = stepsMock;

      service.saveStep(step);
      service.removeStep(step.ionStepId);

      expect(service.steps).toEqual([]);
    });

    it('should update a step', () => {
      const [step1, step2] = stepsMock;
      const updatedStep = { ...step2, ionStepId: step1.ionStepId };

      service.saveStep(step1);
      service.saveStep(updatedStep);

      expect(service.steps).toEqual([updatedStep]);
    });

    it('should update the current step data if the host position changes while tour is running', () => {
      const [step1] = stepsMock;

      const updatedStep = {
        ...step1,
        target: { toJSON: () => ({ ...TARGET_MOCK, x: 400 }) },
      } as IonTourStepProps;

      service.saveStep(step1);
      service.start();
      jest.runAllTimers();

      expect(service.currentStep.value).toEqual(step1);
      service.saveStep(updatedStep);
      expect(service.currentStep.value).toEqual(updatedStep);
    });
  });

  describe('start tour', () => {
    it('should start a tour', () => {
      const [step] = stepsMock;

      service.saveStep(step);
      service.start({ tourId: step.ionTourId });
      jest.runAllTimers();

      expect(service.activeTour.value).toBe(step.ionTourId);
      expect(service.currentStep.value).toEqual(step);
    });

    it('should start the first tour if no tourId is provided', () => {
      const [step1, step2] = stepsMock;

      service.saveStep(step1);
      service.saveStep(step2);
      service.start();
      jest.runAllTimers();

      expect(service.activeTour.value).toBe(step1.ionTourId);
    });

    it('should not start a tour if no steps are found', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation();
      service.start();
      jest.runAllTimers();

      expect(service.activeTour.value).toBeNull();
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith('No steps found!');
    });

    it('should not start a tour if the tourId is not found', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation();
      service.saveStep(stepsMock[0]);
      service.start({ tourId: 'invalidTourId' });
      jest.runAllTimers();

      expect(service.activeTour.value).toBeNull();
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith('Tour not found!');
    });

    it('should set the first step as the current step even when they were registered out of order', () => {
      const [step1, step2] = stepsMock;

      service.saveStep(step2);
      service.saveStep(step1);
      service.start({ tourId: step1.ionTourId });
      jest.runAllTimers();

      expect(service.currentStep.value).toEqual(step1);
    });

    it('should create de backdrop when starting a tour', () => {
      const [step] = stepsMock;

      service.saveStep(step);
      service.start({ tourId: step.ionTourId });
      jest.runAllTimers();

      expect(service['backdropRef']).toBeTruthy();
    });

    it('should destroy a previous backdrop when starting a new tour', () => {
      const [step1, step2] = stepsMock;

      service.saveStep(step1);
      service.saveStep(step2);

      service.start({ tourId: step1.ionTourId });
      jest.runAllTimers();
      service.start({ tourId: step2.ionTourId });

      const backdropRef = service['backdropRef'];

      service.start({ tourId: step2.ionTourId });
      jest.runAllTimers();

      expect(backdropRef.destroy).toHaveBeenCalled();
    });
  });

  describe('steps navigation', () => {
    it('should navigate to the next step', () => {
      const ionTourId = 'tour1';

      const [step1, step2] = stepsMock;

      service.saveStep(step1);
      service.saveStep(step2);
      service.start({ tourId: ionTourId });
      jest.runAllTimers();

      expect(service.currentStep.value).toEqual(step1);

      const spy = jest.spyOn(step1.ionOnNextStep, 'emit');
      service.nextStep();
      jest.runAllTimers();

      expect(service.currentStep.value).toEqual(step2);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should navigate to the previous step', () => {
      const [step1, step2] = stepsMock;

      service.saveStep(step1);
      service.saveStep(step2);
      service.start({ tourId: step1.ionTourId });
      jest.runAllTimers();

      service.nextStep();
      jest.runAllTimers();

      expect(service.currentStep.value).toEqual(step2);

      const spy = jest.spyOn(step2.ionOnPrevStep, 'emit');
      service.prevStep();

      expect(service.currentStep.value).toEqual(step1);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should finish the tour if there is no next step and nextStep is called', () => {
      const [step] = stepsMock;

      service.saveStep(step);
      service.start({ tourId: step.ionTourId });
      jest.runAllTimers();

      const spyNext = jest.spyOn(step.ionOnNextStep, 'emit');
      const spyFinish = jest.spyOn(step.ionOnFinishTour, 'emit');
      service.nextStep();
      jest.runAllTimers();

      expect(service.currentStep.value).toBeUndefined();
      expect(service.activeTour.value).toBeUndefined();
      expect(spyNext).toHaveBeenCalledTimes(1);
      expect(spyFinish).toHaveBeenCalledTimes(1);
    });

    it('should finish the tour if there is no previous step and prevStep is called', () => {
      const [step] = stepsMock;

      service.saveStep(step);
      service.start({ tourId: step.ionTourId });
      jest.runAllTimers();

      const spyPrev = jest.spyOn(step.ionOnPrevStep, 'emit');
      const spyFinish = jest.spyOn(step.ionOnFinishTour, 'emit');
      service.prevStep();

      expect(service.currentStep.value).toBeNull();
      expect(service.activeTour.value).toBeNull();
      expect(spyPrev).toHaveBeenCalledTimes(1);
      expect(spyFinish).toHaveBeenCalledTimes(1);
    });
  });

  describe('finish tour', () => {
    it('should finish the tour', () => {
      const spy = jest.spyOn(stepsMock[0].ionOnFinishTour, 'emit');

      const [step] = stepsMock;
      service.saveStep(step);
      service.start();
      jest.runAllTimers();

      service.finish();

      expect(service.currentStep.value).toBeNull();
      expect(service.activeTour.value).toBeNull();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should destroy the backdrop when finishing the tour', () => {
      const [step] = stepsMock;

      service.saveStep(step);
      service.start({ tourId: step.ionTourId });
      jest.runAllTimers();

      service.finish();

      expect(service['backdropRef']).toBeNull();
    });
  });
});
