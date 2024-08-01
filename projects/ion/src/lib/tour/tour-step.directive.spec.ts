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

const DEFAULT_PROPS: Partial<TourStepDemoComponent> = {
  ionTourId: 'demo-tour',
  ionStepId: 'demo-step',
  ionStepTitle: 'Test Title',
  ionStepPrevBtnTitle: 'Test Prev',
  ionStepNextBtnTitle: 'Test Next',
  ionStepFinishBtnTitle: 'Test Finish',
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

const sut = async (
  props: Partial<TourStepDemoComponent> = {}
): Promise<RenderResult<TourStepDemoComponent>> => {
  return render(TourStepDemoComponent, {
    imports: [IonButtonModule, IonTourModule],
    providers: [{ provide: IonTourService, useValue: tourServiceMock }],
    componentProperties: {
      ...DEFAULT_PROPS,
      ...props,
    },
  });
};

describe('IonTourStepDirective', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save step on init', async () => {
    const spy = jest.spyOn(tourServiceMock, 'saveStep');
    await sut();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(DEFAULT_PROPS));
  });

  it('should save step on window resize', async () => {
    await sut();
    jest.clearAllMocks();
    const spy = jest.spyOn(tourServiceMock, 'saveStep');
    fireEvent.resize(window);
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
});
