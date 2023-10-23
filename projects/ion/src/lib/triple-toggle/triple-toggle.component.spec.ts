import { fireEvent, render, screen } from '@testing-library/angular';
import { TripleToggleProps } from '../core/types';
import { IonSharedModule } from '../shared.module';
import { IonTooltipModule } from '../tooltip/tooltip.module';
import { SafeAny } from '../utils/safe-any';
import { IonTripleToggleComponent } from './triple-toggle.component';

const tripleToggleId = 'ion-triple-toggle';
const firstOptionId = 'btn-Sim';
const middleOptionId = 'btn--';
const lastOptionId = 'btn-Não';
const selectedOption = 'ion-btn-primary';
const notSelectedOption = 'ion-btn-secondary';

const sut = async (customProps: TripleToggleProps = {}): Promise<void> => {
  await render(IonTripleToggleComponent, {
    componentProperties: customProps,
    imports: [IonSharedModule, IonTooltipModule],
  });
};

describe('IonTripleToggleComponent', () => {
  describe('component basics', () => {
    const checkEvent = jest.fn();

    beforeEach(async () => {
      await sut({
        ionClick: {
          emit: checkEvent,
        } as SafeAny,
      });
    });
    it('should render triple toggle', async () => {
      expect(screen.getByTestId(tripleToggleId)).toBeInTheDocument();
    });
    it('should render middle option selected', async () => {
      expect(screen.getByTestId(middleOptionId)).toHaveClass(selectedOption);
    });
    it('should render first and last option not selected', async () => {
      expect(screen.getByTestId(firstOptionId)).not.toHaveClass(
        'ion-btn-primary'
      );
      expect(screen.getByTestId(lastOptionId)).not.toHaveClass(
        'ion-btn-primary'
      );
    });
    it('should select when clicked', async () => {
      const element = screen.getByTestId(firstOptionId);
      fireEvent.click(element);
      expect(screen.getByTestId(firstOptionId)).toHaveClass(selectedOption);
    });
    afterEach(() => {
      checkEvent.mockClear();
    });
  });

  describe('component with variants', () => {
    it('should render disabled options on triple toggle', async () => {
      await sut({ disabled: true });
      expect(screen.getByTestId(firstOptionId)).toBeDisabled();
      expect(screen.getByTestId(middleOptionId)).toBeDisabled();
      expect(screen.getByTestId(lastOptionId)).toBeDisabled();
    });

    it('should not emit event when disabled', async () => {
      const clickEvent = jest.fn();
      await sut({
        disabled: true,
        ionClick: {
          emit: clickEvent,
        } as SafeAny,
      });
      const element = screen.getByTestId(firstOptionId);
      fireEvent.click(element);
      expect(clickEvent).not.toHaveBeenCalled();
    });

    it('should emit a event in every click', async () => {
      const clickEvent = jest.fn();
      await sut({
        ionClick: {
          emit: clickEvent,
        } as SafeAny,
      });
      const amount = 5;
      const element = screen.getByTestId(firstOptionId);

      for (let i = 0; i < amount; i++) {
        fireEvent.click(element);
      }

      expect(clickEvent).toHaveBeenCalledTimes(amount);
    });

    it('should show the selected option when started with it', async () => {
      await sut({ value: true });
      expect(screen.getByTestId(firstOptionId)).toHaveClass(selectedOption);
    });

    it('should show default configuration when options applied contains less than three options', async () => {
      await sut({
        configuration: [
          {
            label: 'Test',
            value: 'value 1',
          },
        ],
      });
      expect(screen.getByTestId(firstOptionId)).toHaveClass(notSelectedOption);
      expect(screen.getByTestId(middleOptionId)).toHaveClass(selectedOption);
      expect(screen.getByTestId(lastOptionId)).toHaveClass(notSelectedOption);
    });

    it('should show default configuration when options applied contains more than three options', async () => {
      await sut({
        configuration: [
          {
            label: 'Test 1',
            value: 'value 1',
          },
          {
            label: 'Test 2',
            value: 'value 2',
          },
          {
            label: 'Test 3',
            value: 'value 3',
          },
          {
            label: 'Test 4',
            value: 'value 4',
          },
        ],
      });
      expect(screen.getByTestId(firstOptionId)).toHaveClass(notSelectedOption);
      expect(screen.getByTestId(middleOptionId)).toHaveClass(selectedOption);
      expect(screen.getByTestId(lastOptionId)).toHaveClass(notSelectedOption);
    });

    it('should show selected middle option when none option are selected initially', async () => {
      await sut({
        configuration: [
          {
            label: 'Sim',
            value: true,
          },
          {
            label: '-',
            value: undefined,
          },
          {
            label: 'Não',
            value: false,
          },
        ],
      });
      expect(screen.getByTestId(middleOptionId)).toHaveClass(selectedOption);
    });
  });
});
