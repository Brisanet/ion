import { render, screen, fireEvent } from '@testing-library/angular';
import { IonSelectComponent } from './select.component';
import { IonSelectProps } from '../core/types/select';
import { IonIconModule } from '../icon/icon.module';
import { IonSelectItemComponent } from './select-item/select-item.component';
import { DropdownItem } from '../core/types';
import { FormsModule } from '@angular/forms';
import { IonDropdownModule } from '../dropdown/dropdown.module';
import userEvent from '@testing-library/user-event';

const sut = async (customProps?: IonSelectProps): Promise<void> => {
  await render(IonSelectComponent, {
    componentProperties: customProps,
    declarations: [IonSelectItemComponent],
    imports: [FormsModule, IonIconModule, IonDropdownModule],
  });
};

const getIonSelect = async (): Promise<HTMLElement> =>
  await screen.getByTestId('ion-select');

const getIonSelectInput = async (): Promise<HTMLElement> =>
  await screen.getByTestId('ion-select-input');

const getOption = async (key: string): Promise<HTMLElement> =>
  await document.getElementById(`${key}`);

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
    expect(screen.getByTestId('ion-select-item-selected')).toHaveTextContent(
      options[0].label
    );
  });

  it('should unselect item', async () => {
    await sut({ options: getCopyOptions() });
    fireEvent.click(await getIonSelect());
    fireEvent.click(await getOption(options[1].key));
    fireEvent.click(await getIonSelect());
    fireEvent.click(await getOption(options[1].key));
    expect(screen.getByTestId('ion-select-item-selected')).toHaveTextContent(
      ''
    );
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
      await screen.getByTestId('ion-select-item-selected-1')
    ).toHaveTextContent(options[2].label);
  });

  it('should remove a selected option when clicking on it in the dropdown', async () => {
    await sut({
      options: getCopyOptions(),
      mode: 'multiple',
    });
    fireEvent.click(await getIonSelect());
    fireEvent.click(await getOption(options[0].key));
    fireEvent.click(await getOption(options[0].key));
    expect(await screen.queryByTestId('ion-select-item-selected-0')).toBeNull();
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

  it('should display all options when clearing text in search input', async () => {
    await sut({ options: await getCopyOptions(), mode: 'multiple' });
    fireEvent.click(await getIonSelect());
    userEvent.keyboard('01');
    expect(await getIonSelectInput()).toHaveValue('01');
    expect(document.getElementsByClassName('dropdown-item').length).toBe(1);
    userEvent.clear(await getIonSelectInput());
    expect(await getIonSelectInput()).toHaveValue('');
    expect(document.getElementsByClassName('dropdown-item').length).toBe(3);
  });
});
