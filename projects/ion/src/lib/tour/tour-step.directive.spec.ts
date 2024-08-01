import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/angular';
import { cloneDeep } from 'lodash';
import { EMPTY, of } from 'rxjs';

import { IonButtonModule } from '../button/button.module';
import { IonTourStepProps } from '../core/types';
import { TourStepDemoComponent } from './mocks/tour-step-props.component';
import { IonTourModule } from './tour.module';
import { IonTourService } from './tour.service';
import { IonPopoverModule } from '../popover/popover.module';
import userEvent from '@testing-library/user-event';

const DEFAULT_PROPS: Partial<TourStepDemoComponent> = {
  ionTourId: 'demo-tour',
  ionStepId: 'demo-step',
  ionStepTitle: 'Test Title',
  ionStepPrevBtnTitle: 'Test Prev',
  ionStepNextBtnTitle: 'Test Next',
  ionStepFinishBtnTitle: 'Test Finish',
  ionStepSkipBtnTitle: 'Test Skip',
};

const tourServiceMock: Partial<IonTourService> = {
  saveStep: jest.fn(),
  removeStep: jest.fn(),
  start: jest.fn(),
  finish: jest.fn(),
  prevStep: jest.fn(),
  nextStep: jest.fn(),
  activeTour$: EMPTY,
  currentStep$: EMPTY,
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
    providers: [{ provide: IonTourService, useValue: tourServiceMock }],
    componentProperties: {
      ...DEFAULT_PROPS,
      ...props,
    },
  });
  jest.runAllTimers();
  result.fixture.detectChanges();
  return result;
};

describe('IonTourStepDirective', () => {
  afterEach(jest.clearAllMocks);

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

  describe('popover actions', () => {
    it('should call finish when the skip button is clicked', async () => {
      const step = cloneDeep(DEFAULT_PROPS) as unknown as IonTourStepProps;

      setActiveTour(step.ionTourId);
      setCurrentStep(step);

      await sut();
      const [skipButton] = screen.getAllByTestId(
        `btn-${step.ionStepSkipBtnTitle}`
      );
      userEvent.click(skipButton);

      expect(tourServiceMock.finish).toHaveBeenCalled();
    });

    it('should call prevStep when there is a previous step and the prev button is clicked', async () => {
      const step = cloneDeep(DEFAULT_PROPS) as unknown as IonTourStepProps;
      const prevStep = cloneDeep(DEFAULT_PROPS) as unknown as IonTourStepProps;

      setActiveTour(step.ionTourId);
      setCurrentStep(step);

      await sut({ ionPrevStepId: prevStep.ionStepId });
      const [prevButton] = screen.getAllByTestId(
        `btn-${step.ionStepPrevBtnTitle}`
      );
      userEvent.click(prevButton);

      expect(tourServiceMock.prevStep).toHaveBeenCalled();
    });

    it('should call nextStep when there is a next step and the next button is clicked', async () => {
      const step = cloneDeep(DEFAULT_PROPS) as unknown as IonTourStepProps;
      const nextStep = cloneDeep(DEFAULT_PROPS) as unknown as IonTourStepProps;

      setActiveTour(step.ionTourId);
      setCurrentStep(step);

      await sut({ ionNextStepId: nextStep.ionStepId });
      const [nextButton] = screen.getAllByTestId(
        `btn-${step.ionStepNextBtnTitle}`
      );
      userEvent.click(nextButton);

      expect(tourServiceMock.nextStep).toHaveBeenCalled();
    });

    it('should call finish when there is no next step and the next button is clicked', async () => {
      const step = cloneDeep(DEFAULT_PROPS) as unknown as IonTourStepProps;

      setActiveTour(step.ionTourId);
      setCurrentStep(step);

      await sut();
      const [nextButton] = screen.getAllByTestId(
        `btn-${step.ionStepFinishBtnTitle}`
      );
      userEvent.click(nextButton);

      expect(tourServiceMock.finish).toHaveBeenCalled();
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
