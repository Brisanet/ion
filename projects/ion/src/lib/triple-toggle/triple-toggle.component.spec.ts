import { fireEvent, render, screen } from '@testing-library/angular';
import { IonTripleToggleComponent } from './triple-toggle.component';
import { SafeAny } from '../utils/safe-any';
import userEvent from '@testing-library/user-event';
import { Component } from '@angular/core';

@Component({
  template: `
    <div>
      <ion-triple-toggle data-testid="first-triple-toggle"></ion-triple-toggle>
      <ion-triple-toggle data-testid="second-triple-toggle"></ion-triple-toggle>
    </div>
  `,
  selector: 'test-multiple-triple-toggle',
  standalone: true,
  imports: [IonTripleToggleComponent],
})
class MultipleTripleToggleComponent {}

const tripleToggleId = 'ion-triple-toggle';
const firstOptionId = 'btn-Sim';
const middleOptionId = 'btn--';
const lastOptionId = 'btn-Não';
const selectedOption = 'ion-btn-primary';
const notSelectedOption = 'ion-btn-secondary';

const clickEvent = jest.fn();

const sut = async (customProps: SafeAny = {}): Promise<SafeAny> => {
  return await render(IonTripleToggleComponent, {
    componentInputs: customProps,
  });
};

describe('IonTripleToggleComponent', () => {
  describe('component basics', () => {
    beforeEach(async () => {
      clickEvent.mockClear();
      await sut();
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
      const { fixture } = await sut({ disabled: true });
      const component = fixture.componentInstance;
      component.ionClick.subscribe(clickEvent);

      const element = screen.getByTestId(option);
      fireEvent.click(element);
      expect(clickEvent).not.toHaveBeenCalled();
    });

    it.each(options)(
      'should emit one event when click at %s option',
      async (option) => {
        const { fixture } = await sut();
        const component = fixture.componentInstance;
        component.ionClick.subscribe(clickEvent);

        const element = screen.getByTestId(option);
        fireEvent.click(element);
        expect(clickEvent).toHaveBeenCalledTimes(1);
      }
    );

    it('should show the selected option when started with it', async () => {
      await sut({ value: true });
      expect(screen.getByTestId(firstOptionId)).toHaveClass(selectedOption);
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
    clickEvent.mockClear();
  });
});

describe('MultipleTripleToggleComponent', () => {
  const options = [firstOptionId, middleOptionId, lastOptionId];

  it.each(options)(
    'should select %s from the first triple Toggle, without modifying the second tripleToggle',
    async (btns) => {
      await render(MultipleTripleToggleComponent);
      const btnNeutralSecond = screen.getAllByRole('button')[4];
      const [btn1] = screen.getAllByTestId(btns);

      await userEvent.click(btn1);
      expect(btn1).toHaveClass(selectedOption);
      expect(btnNeutralSecond).toHaveClass(selectedOption);
    }
  );
});
