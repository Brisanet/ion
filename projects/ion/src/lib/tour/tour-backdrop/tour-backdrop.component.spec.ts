import { render, RenderResult, screen } from '@testing-library/angular';

import { IonTourStepProps } from '../../core/types';
import { IonTourBackdropComponent } from './tour-backdrop.component';

const sut = async (
  props: Partial<IonTourBackdropComponent> = {}
): Promise<RenderResult<IonTourBackdropComponent>> => {
  return render(IonTourBackdropComponent, {
    declarations: [IonTourBackdropComponent],
    componentProperties: {
      ...props,
    },
  });
};

const STEP_MOCK = {
  getTarget: () => ({
    x: 300,
    y: 300,
    width: 100,
    height: 100,
    bottom: 400,
    right: 400,
    left: 300,
    top: 300,
  }),
} as IonTourStepProps;

describe('IonTourBackdropComponent', () => {
  it('should render', async () => {
    await sut();
    expect(screen.queryByTestId('ion-tour-backdrop')).toBeInTheDocument();
  });

  it('should render with custom class', async () => {
    const ionStepBackdropCustomClass = 'custom-class';

    await sut({ currentStep: { ...STEP_MOCK, ionStepBackdropCustomClass } });

    expect(screen.queryByTestId('ion-tour-backdrop')).toHaveClass(
      ionStepBackdropCustomClass
    );
  });

  describe('transitions', () => {
    it('should render with transition', async () => {
      await sut({ inTransition: true });
      expect(screen.queryByTestId('ion-tour-backdrop')).toHaveClass(
        'ion-tour-backdrop-transition'
      );
    });

    it('should stop rendering when the transition ends and the tour remains inactive', async () => {
      const { rerender } = await sut({ inTransition: true, isActive: false });
      rerender({ inTransition: false });
      expect(screen.queryByTestId('ion-tour-backdrop')).not.toBeInTheDocument();
    });

    it('should stop rendering when performFinalTransition is called', async () => {
      jest.useFakeTimers();
      const { fixture } = await sut({ inTransition: true });
      const callback = jest.fn();

      fixture.componentInstance.performFinalTransition(callback);

      jest.runAllTimers();
      expect(screen.queryByTestId('ion-tour-backdrop')).not.toBeInTheDocument();
      expect(callback).toHaveBeenCalled();
    });
  });
});
