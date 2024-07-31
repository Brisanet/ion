import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { cloneDeep } from 'lodash';
import { EMPTY, of } from 'rxjs';

import { IonButtonModule } from '../button/button.module';
import { IonTourPopoverProps } from '../core/types';
import { TourStepDemoComponent } from './mocks/tour-step-props.component';
import { IonTourModule } from './tour.module';
import { IonTourService } from './tour.service';

const DEFAULT_PROPS: Partial<TourStepDemoComponent> = {
  ionTourId: 'demo-tour',
  ionStepId: 'demo-step',
  ionStepTitle: 'Test Title',
  ionStepContent: 'Test Content',
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

function setActiveTour(tourId: string) {
  Object.defineProperty(tourServiceMock, 'activeTour$', { value: of(tourId) });
}

function setCurrentStep(step: Partial<IonTourPopoverProps>) {
  Object.defineProperty(tourServiceMock, 'currentStep$', { value: of(step) });
}

const sut = async (props: Partial<TourStepDemoComponent> = {}) => {
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
    const step = cloneDeep(DEFAULT_PROPS) as IonTourPopoverProps;

    setActiveTour(step.ionTourId);
    setCurrentStep(step);

    await sut();
    expect(screen.queryByTestId('ion-tour-popover')).toBeInTheDocument();
  });
});
