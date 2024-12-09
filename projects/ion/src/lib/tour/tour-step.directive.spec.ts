import { ChangeDetectorRef, ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { cloneDeep } from 'lodash';
import { EMPTY, of } from 'rxjs';

import { IonButtonModule } from '../button/button.module';
import { IonTourStepProps } from '../core/types';
import { IonPopoverModule } from '../popover/popover.module';
import { TourResizingHostComponent } from './mocks/resizing-host-demo.component';
import { TourStepDemoComponent } from './mocks/tour-step-props.component';
import { IonTourModule } from './tour.module';
import { IonTourService } from './tour.service';
import { IonTourStepDirective } from './tour-step.directive';
import { IonPositionService } from '../position/position.service';

const DEFAULT_PROPS: Partial<TourStepDemoComponent> = {
  ionTourId: 'demo-tour',
  ionStepId: 'demo-step',
  ionStepTitle: 'Test Title',
  ionPrevStepBtn: { label: 'Test Prev' },
  ionNextStepBtn: { label: 'Test Next' },
};

const tourServiceMock = {
  saveStep: jest.fn(),
  removeStep: jest.fn(),
  start: jest.fn(),
  finish: jest.fn(),
  prevStep: jest.fn(),
  nextStep: jest.fn(),
  activeTour$: EMPTY,
  currentStep$: EMPTY,
};

const generateRandomDOMRect = (): DOMRect => {
  const data = {
    x: Math.random() * 100,
    y: Math.random() * 100,
    width: Math.random() * 200 + 50,
    height: Math.random() * 200 + 50,
    bottom: Math.random() * 100 + 200,
    right: Math.random() * 100 + 200,
    left: Math.random() * 50,
    top: Math.random() * 50,
  };
  return { ...data, toJSON: () => data } as DOMRect;
};

const elementRefMock = {
  nativeElement: {
    getBoundingClientRect: jest.fn().mockImplementation(generateRandomDOMRect),
  },
};

function setActiveTour(tourId: string): void {
  Object.defineProperty(tourServiceMock, 'activeTour$', { value: of(tourId) });
}

function setCurrentStep(step: Partial<IonTourStepProps>): void {
  Object.defineProperty(tourServiceMock, 'currentStep$', { value: of(step) });
}

jest.useFakeTimers();

const sut = async (
  props: Partial<TourStepDemoComponent> = {}
): Promise<RenderResult<TourStepDemoComponent>> => {
  const result = await render(TourStepDemoComponent, {
    imports: [IonButtonModule, IonTourModule, IonPopoverModule],
    providers: [
      { provide: ElementRef, useValue: elementRefMock },
      { provide: IonTourService, useValue: tourServiceMock },
    ],
    componentProperties: {
      ...DEFAULT_PROPS,
      ...props,
    },
  });
  jest.runOnlyPendingTimers();
  result.fixture.detectChanges();
  return result;
};

const sutResizingHostDemo = (): void => {
  TestBed.configureTestingModule({
    imports: [IonButtonModule, IonTourModule, IonPopoverModule],
    declarations: [TourResizingHostComponent],
    providers: [
      IonTourService,
      IonTourStepDirective,
      IonPositionService,
      ViewContainerRef,
      ChangeDetectorRef,
      { provide: ElementRef, useValue: elementRefMock },
    ],
  });

  TestBed.get(IonTourStepDirective)['hostPositionChanged'] = jest
    .fn()
    .mockReturnValue(true);

  TestBed.createComponent(TourResizingHostComponent).detectChanges();

  jest.runOnlyPendingTimers();
};

describe('IonTourStepDirective', () => {
  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should save step on init', async () => {
    const spy = jest.spyOn(tourServiceMock, 'saveStep');
    await sut();
    expect(spy).toHaveBeenCalled();
  });

  it('should save step onchanges', async () => {
    const { rerender } = await sut();
    const spy = jest.spyOn(tourServiceMock, 'saveStep');
    rerender({ ionStepTitle: 'New Title' });
    expect(spy).toHaveBeenCalled();
  });

  it('should create the popover element when tourService says it is active', async () => {
    const step = cloneDeep(DEFAULT_PROPS) as unknown as IonTourStepProps;

    setActiveTour(step.ionTourId);
    setCurrentStep(step);

    await sut();
    expect(screen.queryByTestId('ion-popover')).toBeInTheDocument();
  });

  it('should update popover when it is active and some prop changes', async () => {
    const step = cloneDeep(DEFAULT_PROPS) as unknown as IonTourStepProps;

    setActiveTour(step.ionTourId);
    setCurrentStep(step);

    const { rerender, fixture } = await sut();
    const newlabel = 'Next button new label';
    rerender({ ionPrevStepBtn: { label: newlabel } });
    fixture.detectChanges();

    expect(screen.queryByText(newlabel)).toBeInTheDocument();
  });

  it('should reposition popover when host position changes', async () => {
    sutResizingHostDemo();

    const directive = TestBed.get(IonTourStepDirective);
    const spy = jest.spyOn(directive, 'repositionPopover');
    directive.observeHostPosition();

    jest.runOnlyPendingTimers();

    expect(spy).toHaveBeenCalled();
  });

  describe('popover actions', () => {
    it('should render a default previous button', async () => {
      const step = cloneDeep(DEFAULT_PROPS) as unknown as IonTourStepProps;

      setActiveTour(step.ionTourId);
      setCurrentStep(step);

      await sut({ ionPrevStepBtn: undefined });

      const defaultPrevButtonlabel = 'Voltar';
      const [prevButton] = screen.getAllByTestId(
        `btn-${defaultPrevButtonlabel}`
      );
      expect(prevButton).toBeInTheDocument();
    });

    it('should render a default next button', async () => {
      const step = cloneDeep(DEFAULT_PROPS) as unknown as IonTourStepProps;

      setActiveTour(step.ionTourId);
      setCurrentStep(step);

      await sut({ ionNextStepBtn: undefined });

      const defaultNextButtonlabel = 'Continuar';
      const [nextButton] = screen.getAllByTestId(
        `btn-${defaultNextButtonlabel}`
      );
      expect(nextButton).toBeInTheDocument();
    });

    it('should call prevStep when prev button is clicked', async () => {
      const step = cloneDeep(DEFAULT_PROPS) as unknown as IonTourStepProps;

      setActiveTour(step.ionTourId);
      setCurrentStep(step);

      await sut();
      const [prevButton] = screen.getAllByTestId(
        `btn-${step.ionPrevStepBtn.label}`
      );
      userEvent.click(prevButton);

      expect(tourServiceMock.prevStep).toHaveBeenCalled();
    });

    it('should call nextStep when next button is clicked', async () => {
      const step = cloneDeep(DEFAULT_PROPS) as unknown as IonTourStepProps;

      setActiveTour(step.ionTourId);
      setCurrentStep(step);

      await sut();
      const [nextButton] = screen.getAllByTestId(
        `btn-${step.ionNextStepBtn.label}`
      );
      userEvent.click(nextButton);

      expect(tourServiceMock.nextStep).toHaveBeenCalled();
    });

    it('should call finish when the close button is clicked', async () => {
      const step = cloneDeep(DEFAULT_PROPS) as unknown as IonTourStepProps;

      setActiveTour(step.ionTourId);
      setCurrentStep(step);

      await sut();
      const [closeButton] = screen.getAllByTestId('btn-popover-close-button');
      fireEvent.click(closeButton);

      expect(tourServiceMock.finish).toHaveBeenCalled();
    });
  });
});
