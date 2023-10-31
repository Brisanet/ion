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
  });

  describe('component with variants', () => {
    it('should render disabled options on triple toggle', async () => {
      await sut({ disabled: true });
      expect(screen.getByTestId(firstOptionId)).toBeDisabled();
      expect(screen.getByTestId(middleOptionId)).toBeDisabled();
      expect(screen.getByTestId(lastOptionId)).toBeDisabled();
    });

    const options = [firstOptionId, middleOptionId, lastOptionId];

    it.each(options)(
      'should not emit event when select a disabled %s option',
      async (option) => {
        const clickEvent = jest.fn();
        await sut({
          disabled: true,
          ionClick: {
            emit: clickEvent,
          } as SafeAny,
        });
        const element = screen.getByTestId(option);
        fireEvent.click(element);
        expect(clickEvent).not.toHaveBeenCalled();
      }
    );

    it.each(options)(
      'should emit an event when click at %s option',
      async (option) => {
        const clickEvent = jest.fn();
        await sut({
          ionClick: {
            emit: clickEvent,
          } as SafeAny,
        });
        const element = screen.getByTestId(option);
        fireEvent.click(element);
        expect(clickEvent).toHaveBeenCalled();
      }
    );

    it('should show the selected option when started with it', async () => {
      await sut({ value: true });
      expect(screen.getByTestId(firstOptionId)).toHaveClass(selectedOption);
    });

    it('should show default options when has not custom options applied', async () => {
      await sut();
      expect(screen.getByTestId(firstOptionId)).toHaveClass(notSelectedOption);
      expect(screen.getByTestId(middleOptionId)).toHaveClass(selectedOption);
      expect(screen.getByTestId(lastOptionId)).toHaveClass(notSelectedOption);
    });

    it('should show selected middle option when none option are selected initially', async () => {
      await sut({
        options: [
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
