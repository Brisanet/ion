import { EventEmitter } from '@angular/core';
import {
  render,
  RenderComponentOptions,
  screen,
} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { EMPTY } from 'rxjs';

import { IonButtonModule } from '../../button/button.module';
import { IonTourStepPositions } from '../../core/types';
import { IonPositionService } from '../../position/position.service';
import { IonTourService } from '../tour.service';
import { IonTourPopoverComponent } from './tour-popover.component';
import { cloneDeep } from 'lodash';

const tourServiceMock: Partial<IonTourService> = {
  saveStep: jest.fn(),
  removeStep: jest.fn(),
  start: jest.fn(),
  finish: jest.fn(),
  prevStep: jest.fn(),
  nextStep: jest.fn(),
  currentStep$: EMPTY,
};

const DEFAULT_PROPS: Partial<IonTourPopoverComponent> = {
  target: {
    x: 300,
    y: 300,
    width: 100,
    height: 100,
    bottom: 400,
    right: 400,
    left: 300,
    top: 300,
  } as DOMRect,
  ionStepId: 'test',
  ionStepTitle: 'Title Example',
  ionStepContent: 'Content Example',
  ionStepPrevBtnTitle: 'Back',
  ionStepNextBtnTitle: 'Next',
  ionStepFinishBtnTitle: 'Finish',
  ionStepPosition: IonTourStepPositions.TOP_CENTER,
  ionStepMarginToContent: 5,
  ionStepBackdropPadding: 20,
};

const TOUR_POPOVER_TESTING_MODULE: RenderComponentOptions<IonTourPopoverComponent> =
  {
    declarations: [IonTourPopoverComponent],
    imports: [IonButtonModule],
    providers: [
      IonPositionService,
      { provide: IonTourService, useValue: tourServiceMock },
    ],
  };

enum TestIDs {
  POPOVER = 'ion-tour-popover',
  CLOSE_BUTTON = 'btn-tour-popover__close-button',
  TITLE = 'ion-tour-popover-title',
  CONTENT = 'ion-tour-popover-content',
  PREV_BUTTON = 'tour-popover__prev-button',
  NEXT_BUTTON = 'tour-popover__next-button',
  FINISH_BUTTON = 'tour-popover__finish-button',
}

const sut = async (props: Partial<IonTourPopoverComponent> = {}) => {
  return render(IonTourPopoverComponent, {
    ...TOUR_POPOVER_TESTING_MODULE,
    componentProperties: {
      ...DEFAULT_PROPS,
      ...props,
    },
  });
};

describe('IonTourPopoverComponent', () => {
  afterEach(jest.clearAllMocks);

  it('should create', async () => {
    await sut();
    expect(screen.queryByTestId(TestIDs.POPOVER)).toBeInTheDocument();
  });

  describe('container', () => {
    it('should render with custom class', async () => {
      const ionStepCustomClass = 'custom-class';
      await sut({ ionStepCustomClass });
      expect(screen.queryByTestId(TestIDs.POPOVER)).toHaveClass(
        ionStepCustomClass
      );
    });

    it('should set the position of the popover', async () => {
      const ionStepPosition = IonTourStepPositions.BOTTOM_CENTER;
      await sut({ ionStepPosition });
      expect(screen.queryByTestId(TestIDs.POPOVER)).toHaveClass(
        `ion-tour-popover--${ionStepPosition}`
      );
    });
  });

  describe('close button', () => {
    it('should render close button', async () => {
      await sut();
      expect(screen.queryByTestId(TestIDs.CLOSE_BUTTON)).toBeInTheDocument();
    });

    it('should emit ionOnFinishTour when click on close button', async () => {
      const ionOnFinishTour = new EventEmitter<void>();
      const spy = jest.spyOn(ionOnFinishTour, 'emit');
      await sut({ ionOnFinishTour });

      userEvent.click(screen.getByTestId(TestIDs.CLOSE_BUTTON));

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('body', () => {
    it('should render title', async () => {
      const ionStepTitle = 'Title';
      await sut({ ionStepTitle });
      expect(screen.queryByTestId(TestIDs.TITLE)).toHaveTextContent(
        ionStepTitle
      );
    });

    it('should render content as string', async () => {
      const ionStepContent = 'Content';
      await sut({ ionStepContent });
      expect(screen.queryByTestId(TestIDs.CONTENT)).toHaveTextContent(
        ionStepContent
      );
    });

    it.todo('should render content as template');
  });

  describe('actions', () => {
    describe('previous step button', () => {
      it('should render previous step button when there is a previous step', async () => {
        const ionPrevStepId = 'test';
        await sut({ ionPrevStepId });
        expect(screen.queryByTestId(TestIDs.PREV_BUTTON)).toBeInTheDocument();
      });

      it('should not render previous step button when there is no previous step', async () => {
        await sut();
        expect(
          screen.queryByTestId(TestIDs.PREV_BUTTON)
        ).not.toBeInTheDocument();
      });

      it('should render previous step button with custom label', async () => {
        const ionStepPrevBtnTitle = 'test123';
        await sut({ ionStepPrevBtnTitle, ionPrevStepId: 'test' });
        expect(screen.queryByTestId(TestIDs.PREV_BUTTON)).toHaveTextContent(
          ionStepPrevBtnTitle
        );
      });

      it('should emit ionOnPrevStep when click on previous step button', async () => {
        const ionOnPrevStep = new EventEmitter<void>();
        const spy = jest.spyOn(ionOnPrevStep, 'emit');
        await sut({ ionOnPrevStep, ionPrevStepId: 'test' });

        userEvent.click(screen.getByTestId('btn-Back'));

        expect(spy).toHaveBeenCalledTimes(1);
        expect(tourServiceMock.prevStep).toHaveBeenCalledTimes(1);
      });
    });

    describe('next step button', () => {
      it('should render next step button when there is a next step', async () => {
        const ionNextStepId = 'test';
        await sut({ ionNextStepId });
        expect(screen.queryByTestId(TestIDs.NEXT_BUTTON)).toBeInTheDocument();
      });

      it('should not render next step button when there is no next step', async () => {
        await sut();
        expect(
          screen.queryByTestId(TestIDs.NEXT_BUTTON)
        ).not.toBeInTheDocument();
      });

      it('should render next step button with custom label', async () => {
        const ionStepNextBtnTitle = 'test123';
        await sut({ ionStepNextBtnTitle, ionNextStepId: 'test' });
        expect(screen.queryByTestId(TestIDs.NEXT_BUTTON)).toHaveTextContent(
          ionStepNextBtnTitle
        );
      });

      it('should emit ionOnNextStep when click on next step button', async () => {
        const ionOnNextStep = new EventEmitter<void>();
        const spy = jest.spyOn(ionOnNextStep, 'emit');
        await sut({ ionOnNextStep, ionNextStepId: 'test' });

        userEvent.click(screen.getByTestId('btn-Next'));

        expect(spy).toHaveBeenCalledTimes(1);
        expect(tourServiceMock.nextStep).toHaveBeenCalledTimes(1);
      });
    });

    describe('finish tour button', () => {
      it('should render finish tour button when there is no next step', async () => {
        await sut();
        expect(screen.queryByTestId(TestIDs.FINISH_BUTTON)).toBeInTheDocument();
      });

      it('should not render finish tour button when there is a next step', async () => {
        const ionNextStepId = 'test';
        await sut({ ionNextStepId });
        expect(
          screen.queryByTestId(TestIDs.FINISH_BUTTON)
        ).not.toBeInTheDocument();
      });

      it('should render finish tour button with custom label', async () => {
        const ionStepFinishBtnTitle = 'test123';
        await sut({ ionStepFinishBtnTitle });
        expect(screen.queryByTestId(TestIDs.FINISH_BUTTON)).toHaveTextContent(
          ionStepFinishBtnTitle
        );
      });

      it('should emit ionOnFinishTour when click on finish tour button', async () => {
        const ionOnFinishTour = new EventEmitter<void>();
        const spy = jest.spyOn(ionOnFinishTour, 'emit');
        await sut({ ionOnFinishTour });

        userEvent.click(screen.getByTestId('btn-Finish'));

        expect(spy).toHaveBeenCalledTimes(1);
        expect(tourServiceMock.finish).toHaveBeenCalledTimes(1);
      });
    });

    describe('positioning', () => {
      it('should reposition popover on changes', async () => {
        const { rerender } = await sut();
        const initialStyle = cloneDeep(
          screen.queryByTestId(TestIDs.POPOVER).style
        );

        rerender({
          target: {
            x: 0,
            y: 0,
            width: 50,
            height: 50,
            bottom: 50,
            right: 50,
            left: 0,
            top: 0,
          } as DOMRect,
        });

        expect(screen.getByTestId(TestIDs.POPOVER).style).not.toEqual(
          initialStyle
        );
      });
    });
  });
});
