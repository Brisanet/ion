import { Component, SimpleChange } from '@angular/core';
import { fireEvent, render, screen } from '@testing-library/angular';
import { TripleToggleProps } from '../core/types';
import { IonSharedModule } from '../shared.module';
import { IonTooltipModule } from '../tooltip/tooltip.module';
import { SafeAny } from '../utils/safe-any';
import { IonTripleToggleComponent } from './triple-toggle.component';
import userEvent from '@testing-library/user-event';

@Component({
  template: `
    <div>
      <ion-triple-toggle data-testid="first-triple-toggle"></ion-triple-toggle>
      <ion-triple-toggle data-testid="second-triple-toggle"></ion-triple-toggle>
    </div>
  `,
  selector: 'test-multiple-triple-toggle',
})
class MultipleTripleToggleComponent {}

const tripleToggleId = 'ion-triple-toggle';
const firstOptionId = 'btn-Sim';
const middleOptionId = 'btn--';
const lastOptionId = 'btn-Não';
const selectedOption = 'ion-btn-primary';
const notSelectedOption = 'ion-btn-secondary';

const clickEvent = jest.fn();

const sut = async (customProps: TripleToggleProps = {}): Promise<SafeAny> => {
  return await render(IonTripleToggleComponent, {
    componentProperties: customProps,
    imports: [IonSharedModule, IonTooltipModule],
  });
};

describe('IonTripleToggleComponent', () => {
  describe('component basics', () => {
    beforeEach(async () => {
      await sut({
        ionClick: {
          emit: clickEvent,
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
      const firstOption = screen.getByTestId(firstOptionId);
      fireEvent.click(firstOption);
      expect(screen.getByTestId(firstOptionId)).toHaveClass(selectedOption);
    });

    it('should show default options when has not custom options applied', async () => {
      expect(screen.getByTestId(firstOptionId)).toHaveClass(notSelectedOption);
      expect(screen.getByTestId(middleOptionId)).toHaveClass(selectedOption);
      expect(screen.getByTestId(lastOptionId)).toHaveClass(notSelectedOption);
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

    it.each(options)('should not emit event when disabled', async (option) => {
      await sut({
        disabled: true,
        ionClick: {
          emit: clickEvent,
        } as SafeAny,
      });
      const element = screen.getByTestId(option);
      fireEvent.click(element);
      expect(clickEvent).not.toHaveBeenCalled();
    });

    it.each(options)(
      'should emit one event when click at %s option',
      async (option) => {
        await sut({
          ionClick: {
            emit: clickEvent,
          } as SafeAny,
        });
        const element = screen.getByTestId(option);
        fireEvent.click(element);
        expect(clickEvent).toHaveBeenCalledTimes(1);
      }
    );

    it('should show the selected option when started with it', async () => {
      const customProps: TripleToggleProps = {
        value: true,
      };

      const { fixture } = await sut(customProps);
      fixture.componentInstance.ngOnChanges({
        value: new SimpleChange(null, { ...customProps }, false),
      });
      fixture.detectChanges();

      expect(screen.getByTestId(firstOptionId)).toHaveClass(selectedOption);
    });

    it.only('should show the selected option when started with it', async () => {
      await sut({
        ionClick: {
          emit: clickEvent,
        } as SafeAny,
        middleValue: null,
      });
      const element = screen.getByTestId(middleOptionId);
      fireEvent.click(element);
      expect(clickEvent).toHaveBeenCalledWith(null);
    });

    it('should show selected middle option when none option are selected initially', async () => {
      await sut({
        options: [
          {
            label: 'Sim',
            value: true,
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

  afterEach(() => {
    const middleOption = screen.getByTestId(middleOptionId);
    fireEvent.click(middleOption);
    clickEvent.mockClear();
  });
});

describe('MultipleTripleToggleComponent', () => {
  const options = [firstOptionId, middleOptionId, lastOptionId];

  it.each(options)(
    'should select %s from the first triple Toggle, without modifying the second tripleToggle',
    async (btns) => {
      await render(MultipleTripleToggleComponent, {
        declarations: [IonTripleToggleComponent],
        imports: [IonSharedModule, IonTooltipModule],
      });
      const btnNeltralSecond = screen.getAllByRole('button')[4];
      const [btn1] = screen.getAllByTestId(btns);

      await userEvent.click(btn1);
      expect(btn1).toHaveClass(selectedOption);
      expect(btnNeltralSecond).toHaveClass(selectedOption);
    }
  );
});
