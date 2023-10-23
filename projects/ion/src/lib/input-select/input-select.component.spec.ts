import userEvent from '@testing-library/user-event';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSharedModule } from '../shared.module';
import {
  IonInputSelectProps,
  SelectOption,
  ValueToEmmit,
} from './../core/types/input-select';
import { IonInputSelectComponent } from './input-select.component';
import { fireEvent, render, screen } from '@testing-library/angular';
import { ComponentFixture } from '@angular/core/testing';
import { SafeAny } from '../utils/safe-any';

const defaultSelectOptions: SelectOption[] = [
  {
    label: 'Entre',
    multiple: true,
    firstPlaceholder: 'Valor inicial',
    secondPlaceholder: 'Valor final',
  },
  {
    label: 'Igual a',
  },
  {
    label: 'Maior ou igual a',
  },
  {
    label: 'Maior que',
  },
  {
    label: 'Menor ou igual a',
  },
  {
    label: 'Menor que',
  },
];

const resetComponentState = (): void => {
  const selectButton = screen.getByTestId('ion-select-button');
  fireEvent.click(selectButton);
  const firstOption = document.getElementById('option-0');
  if (firstOption) {
    fireEvent.click(firstOption);
  }
};

const selectSecondOption = (): HTMLElement => {
  const selectButton = screen.getByTestId('ion-select-button');
  fireEvent.click(selectButton);
  const secondOption = document.getElementById('option-1');
  fireEvent.click(secondOption);

  return selectButton;
};

const getInputFields = (): {
  firstInput: HTMLElement;
  secondInput: HTMLElement;
} => {
  const firstInput = screen.queryByTestId('first-input');
  const secondInput = screen.queryByTestId('second-input');

  return { firstInput, secondInput };
};

const sut = async (
  customProps?: IonInputSelectProps
): Promise<ComponentFixture<IonInputSelectComponent>> => {
  const { fixture } = await render(IonInputSelectComponent, {
    componentProperties: customProps,
    imports: [CommonModule, FormsModule, IonSharedModule],
    declarations: [IonInputSelectComponent],
  });

  return fixture;
};

describe('IonInputSelectComponent', () => {
  afterEach(() => {
    resetComponentState();
  });

  it('should render the input select', async () => {
    await sut();

    const inputSelect = screen.getByTestId('ion-input-select');

    expect(inputSelect).toBeVisible();
  });

  it('should render the select button', async () => {
    await sut();

    const selectButton = screen.getByTestId('ion-select-button');

    expect(selectButton).toBeVisible();
  });

  it('should render without the dropdown', async () => {
    await sut();

    const dropdown = screen.queryByTestId('ion-dropdown');

    expect(dropdown).not.toBeInTheDocument();
  });

  it('should open the dropdown when the select button is clicked', async () => {
    await sut();

    const selectButton = screen.getByTestId('ion-select-button');
    fireEvent.click(selectButton);
    const dropdown = screen.getByTestId('ion-dropdown');

    expect(dropdown).toBeVisible();
  });

  it('should close the dropdown when clicking outside', async () => {
    await sut();

    const selectButton = screen.getByTestId('ion-select-button');
    fireEvent.click(selectButton);
    fireEvent.click(document.body);
    const dropdown = screen.queryByText('ion-dropdown');

    expect(dropdown).not.toBeInTheDocument();
  });

  describe('IonInputSelectComponent - Event emission', () => {
    const valueChange = jest.fn();
    const value = 'input';
    let valueToEmmit: ValueToEmmit = {
      optionSelected: {
        label: 'Igual a',
        selected: true,
      },
      firstValue: value,
      secondValue: '',
    };

    afterEach(() => {
      valueChange.mockClear();
    });

    it('should emit the option selected and the input value on input', async () => {
      await sut({
        name: 'test',
        valueChange: { emit: valueChange } as SafeAny,
      });

      selectSecondOption();
      const { firstInput } = getInputFields();
      userEvent.type(firstInput, value);

      expect(valueChange).toHaveBeenCalledWith(valueToEmmit);
    });

    it('should emit the option selected and the input value on both inputs when multiple', async () => {
      await sut({
        name: 'test',
        valueChange: { emit: valueChange } as SafeAny,
      });

      valueToEmmit = {
        optionSelected: {
          label: 'Entre',
          selected: true,
          multiple: true,
          firstPlaceholder: 'Valor inicial',
          secondPlaceholder: 'Valor final',
        },
        firstValue: value,
        secondValue: value,
      };

      const { firstInput, secondInput } = getInputFields();
      userEvent.type(firstInput, value);
      userEvent.type(secondInput, value);

      expect(valueChange).toHaveBeenCalledWith(valueToEmmit);
    });

    it('should emit the event when another option is selected', async () => {
      await sut({
        name: 'test',
        valueChange: { emit: valueChange } as SafeAny,
      });

      valueToEmmit = {
        optionSelected: {
          label: 'Igual a',
          selected: true,
        },
        firstValue: '',
        secondValue: '',
      };

      selectSecondOption();

      expect(valueChange).toHaveBeenCalledWith(valueToEmmit);
    });
  });

  describe('IonInputSelectComponent - Default options', () => {
    it('should render the first option as the default button label', async () => {
      await sut();

      const selectButtonLabel = screen
        .getByTestId('ion-select-button')
        .textContent.trim();

      expect(selectButtonLabel).toBe(defaultSelectOptions[0].label);
    });

    it('should change the button label', async () => {
      await sut();

      const selectButtonLabel = selectSecondOption().textContent.trim();
      const { firstInput } = getInputFields();

      expect(selectButtonLabel).toBe(defaultSelectOptions[1].label);
      expect(firstInput).toBeVisible();
    });

    it('should render only the single input when the option is not multiple', async () => {
      await sut();

      selectSecondOption();
      const { firstInput, secondInput } = getInputFields();

      expect(firstInput).toBeVisible();
      expect(secondInput).not.toBeInTheDocument();
    });

    it('should render both inputs when the option is multiple', async () => {
      await sut();

      const { firstInput, secondInput } = getInputFields();

      expect(firstInput).toBeVisible();
      expect(secondInput).toBeVisible();
    });
  });

  describe('IonInputSelectComponent - Custom options', () => {
    const customSelectOptions: SelectOption[] = [
      {
        label: 'Acima de',
        multiple: true,
      },
      {
        label: 'Abaixo de',
      },
    ];

    it('should render select button with the label from the informed options', async () => {
      await sut({
        name: 'test',
        selectOptions: customSelectOptions,
      });

      expect(
        screen.getByText(customSelectOptions[0].label)
      ).toBeInTheDocument();
    });
  });
});
