import { render, screen, fireEvent } from '@testing-library/angular';
import { IonSelectComponent } from './select.component';
import { IonSelectProps } from '../core/types/select';
import { IonIconModule } from '../icon/icon.module';
import { IonSelectItemComponent } from './select-item/select-item.component';
import { DropdownItem } from '../core/types';
import { FormsModule } from '@angular/forms';
import { IonDropdownModule } from '../dropdown/dropdown.module';
import userEvent from '@testing-library/user-event';
import { SafeAny } from '../utils/safe-any';

const sut = async (customProps?: IonSelectProps): Promise<void> => {
  await render(IonSelectComponent, {
    componentProperties: customProps,
    declarations: [IonSelectItemComponent],
    imports: [FormsModule, IonIconModule, IonDropdownModule],
  });
};

const getIonSelect = (): HTMLElement => screen.getByTestId('ion-select');

const getIonSelectInput = (): HTMLElement =>
  screen.getByTestId('ion-select-input');

const getOption = (key: string): HTMLElement =>
  document.getElementById(`${key}`);

const options: DropdownItem[] = [
  { label: 'option 01', key: 'option-0' },
  { label: 'option 02', key: 'option-1' },
  { label: 'option 03', key: 'option-2' },
];

const getCopyOptions = (): DropdownItem[] =>
  JSON.parse(JSON.stringify(options));

describe('IonSelecComponent - mode: default', () => {
  it('should render select with placeholder', async () => {
    const customPlaceholder = 'Choose an option';
    await sut({ placeholder: customPlaceholder });
    expect(await getIonSelectInput()).toHaveAttribute(
      'placeholder',
      customPlaceholder
    );
  });

  it('should display the correct label when selecting an option', async () => {
    await sut({ options: getCopyOptions() });
    fireEvent.click(await getIonSelect());
    fireEvent.click(await getOption(options[0].key));
    expect(screen.getByTestId('ion-select-item-selected-0')).toHaveTextContent(
      options[0].label
    );
  });

  it('should remove the selected option by clicking on the close icon of the option itself', async () => {
    await sut({ options: getCopyOptions() });
    fireEvent.click(await getIonSelect());
    fireEvent.click(await getOption(options[1].key));
    fireEvent.click(screen.getByTestId('ion-icon-close'));
    expect(await screen.queryByTestId('ion-select-item-selected-1')).toBeNull();
  });

  it('should remove a selected option when clicking on it in the dropdown', async () => {
    await sut({
      options: getCopyOptions(),
    });
    fireEvent.click(await getIonSelect());
    fireEvent.click(await getOption(options[0].key));
    fireEvent.click(await getIonSelect());
    fireEvent.click(await getOption(options[0].key));
    expect(await screen.queryByTestId('ion-select-item-selected-0')).toBeNull();
  });

  it('should be disabled when informed', async () => {
    await sut({
      options: getCopyOptions(),
      disabled: true,
    });
    const selectInput = getIonSelectInput();

    expect(selectInput).toBeDisabled();
  });
  it('should not open the dropdown when disabled', async () => {
    await sut({
      options: getCopyOptions(),
      disabled: true,
    });

    fireEvent.click(getIonSelect());
    expect(screen.queryByTestId('ion-dropdown')).not.toBeInTheDocument();
  });
  it('should close the dropdown when a option is selected', async () => {
    await sut({
      options: getCopyOptions(),
    });
    fireEvent.click(await getIonSelect());
    fireEvent.click(await getOption(options[0].key));
    expect(screen.queryByTestId('ion-dropdown')).not.toBeInTheDocument();
  });
  it('should not close the dropdown when a option is unselected', async () => {
    await sut({
      options: getCopyOptions(),
    });
    fireEvent.click(await getIonSelect());
    fireEvent.click(await getOption(options[0].key));
    fireEvent.click(await getIonSelect());
    fireEvent.click(await getOption(options[0].key));
    expect(screen.queryByTestId('ion-dropdown')).toBeVisible();
  });
});

describe('IonSelecComponent - mode: multiple', () => {
  it('should selected multiple options', async () => {
    await sut({
      options: getCopyOptions(),
      mode: 'multiple',
    });
    fireEvent.click(await getIonSelect());
    fireEvent.click(await getOption(options[0].key));
    fireEvent.click(await getOption(options[2].key));
    expect(
      await screen.getByTestId('ion-select-item-selected-0')
    ).toHaveTextContent(options[0].label);
    expect(
      await screen.getByTestId('ion-select-item-selected-2')
    ).toHaveTextContent(options[2].label);
  });

  it('should remove an option selected by clicking on the "X" icon of the ion-select-tem component', async () => {
    await sut({
      options: getCopyOptions(),
      mode: 'multiple',
    });
    fireEvent.click(await getIonSelect());
    fireEvent.click(await getOption(options[0].key));
    fireEvent.click(screen.getByTestId('ion-icon-close'));
    expect(await screen.queryByTestId('ion-select-item-selected-0')).toBeNull();
  });

  it('should select an item when searching and then click on it', async () => {
    await sut({ options: await getCopyOptions(), mode: 'multiple' });
    fireEvent.click(await getIonSelect());
    userEvent.keyboard('01');
    expect(await getIonSelectInput()).toHaveValue('01');
    expect(document.getElementsByClassName('dropdown-item').length).toBe(1);
    fireEvent.click(await getOption(options[0].key));
    expect(screen.getByTestId('ion-select-item-selected-0')).toHaveTextContent(
      options[0].label
    );
  });

  it('should dispatch a event with input value when search', async () => {
    const selectEvent = jest.fn();
    await sut({
      options: getCopyOptions(),
      search: {
        emit: selectEvent,
      } as SafeAny,
    });

    fireEvent.click(getIonSelect());
    const textToType = '01';
    userEvent.keyboard(textToType);
    expect(selectEvent).toHaveBeenCalledWith(textToType);
  });
  describe('IonSelectComponent - required', () => {
    it('should apply class required in select', async () => {
      await sut({
        options: getCopyOptions(),
        required: true,
      });
      const select = await screen.getByTestId('ion-select');

      await userEvent.click(select);
      userEvent.dblClick(document.body);

      expect(select).toHaveClass('ion-select--required');
    });
    it('should not apply the required class if the parameter is false', async () => {
      await sut({
        options: getCopyOptions(),
      });
      const select = await screen.getByTestId('ion-select');

      userEvent.click(select);
      userEvent.dblClick(document.body);

      expect(select).not.toHaveClass('ion-select--required');
    });
    it('should not apply required class in multiple mode with an option checked', async () => {
      await sut({
        options: getCopyOptions(),
        required: true,
        mode: 'multiple',
      });

      const select = await screen.getByTestId('ion-select');

      userEvent.click(select);
      userEvent.click(await getOption(options[0].key));
      userEvent.click(await getOption(options[1].key));

      const selectItem = screen.getAllByTestId('ion-icon-close');
      userEvent.click(selectItem[0]);
      userEvent.dblClick(document.body);

      expect(select).not.toHaveClass('ion-select--required');
    });
  });
});

describe('IonSelectComponent - Custom label', () => {
  const customOptions = [
    { label: 'option 01', key: 'option-0', name: 'Name 0' },
    { label: 'option 02', key: 'option-1', name: 'Name 1' },
    { label: 'option 03', key: 'option-2', name: 'Name 2' },
  ];
  const propLabel = 'name';

  beforeEach(async () => {
    await sut({
      options: customOptions,
      propLabel,
    });

    const select = screen.getByTestId('ion-select');
    userEvent.click(select);
  });

  it('should render custom label `name` from option', async () => {
    expect(screen.getByText(customOptions[0][propLabel]));
  });

  it('should render custom label `name` on chip when selected', async () => {
    userEvent.click(getOption(options[0].key));
    expect(screen.getByTestId('ion-select-item-selected-0')).toHaveTextContent(
      customOptions[0][propLabel]
    );
  });
});
