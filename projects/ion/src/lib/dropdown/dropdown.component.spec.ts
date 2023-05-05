import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { SafeAny } from '../utils/safe-any';
import { IonDropdownComponent } from './dropdown.component';
import { IonSharedModule } from '../shared.module';
import { DropdownParams } from '../core/types/dropdown';
import { IonInputProps } from '../core/types/input';

const options = [];
const inputElement = 'input-element';
const createOptions = (): void => {
  for (let index = 0; index < 3; index++) {
    options.push({
      label: `Option ${index}`,
      selected: false,
    });
  }
};

createOptions();

const selectEvent = jest.fn();
const defaultDropdown: DropdownParams = {
  options,
  selected: {
    emit: selectEvent,
  } as SafeAny,
};

const sut = async (
  customParams: DropdownParams = defaultDropdown
): Promise<{
  element: HTMLElement;
}> => {
  await render(IonDropdownComponent, {
    componentProperties: customParams,
    excludeComponentDeclaration: true,
    imports: [FormsModule, IonSharedModule],
  });
  return { element: screen.getByTestId('ion-dropdown') };
};

describe('IonDropdownComponent', () => {
  beforeEach(async () => {
    await sut();
  });
  afterEach(() => {
    const elementToSelect = document.getElementById('option-0');
    if (elementToSelect.classList.contains('dropdown-item-selected')) {
      fireEvent.click(elementToSelect);
    }
  });

  it.each(options)('should render option $label', async ({ label }) => {
    expect(screen.getAllByText(label)).toHaveLength(1);
  });

  it('should select a option', async () => {
    selectEvent.mockClear();
    const optionToSelect = 0;
    const elementToSelect = document.getElementById('option-' + optionToSelect);
    fireEvent.click(elementToSelect);
    expect(elementToSelect.classList).toContain('dropdown-item-selected');
    expect(screen.getAllByTestId('ion-check-selected')).toHaveLength(1);
    expect(selectEvent).toHaveBeenCalledWith([options[optionToSelect]]);
  });

  it('should change icon to close when mouse enter in option selected', async () => {
    const elementToHover = document.getElementById('option-0');
    fireEvent.click(elementToHover);
    fireEvent.mouseEnter(elementToHover);
    expect(screen.queryAllByTestId('ion-check-selected')).toHaveLength(0);
    expect(screen.queryAllByTestId('ion-close-selected')).toHaveLength(1);
  });

  it('should show check icon when mouse leave of option selected', async () => {
    const elementToHover = document.getElementById('option-0');
    fireEvent.click(elementToHover);
    fireEvent.mouseEnter(elementToHover);
    fireEvent.mouseLeave(elementToHover);
    expect(screen.queryAllByTestId('ion-check-selected')).toHaveLength(1);
    expect(screen.queryAllByTestId('ion-close-selected')).toHaveLength(0);
  });
});

describe('IonDropdownComponent / Disabled', () => {
  const optionsWithDisabled = [
    { label: 'Disabled', disabled: true },
    { label: 'Enabled', disabled: false },
  ];
  const defaultDisabled = {
    ...defaultDropdown,
    options: optionsWithDisabled,
  };

  beforeEach(() => {
    selectEvent.mockClear();
  });

  it('should show a disabled option', async () => {
    await sut(defaultDisabled);
    expect(document.getElementById('option-0')).toHaveClass(
      'dropdown-disabled'
    );
  });

  it('should show disabled option with select', async () => {
    await sut({
      options: [
        { label: 'Disabled Selected', disabled: true, selected: true },
        ...optionsWithDisabled,
      ],
      selected: {
        emit: selectEvent,
      } as SafeAny,
    });
    expect(document.getElementById('option-0').classList).toContain(
      'dropdown-disabled-selected'
    );
    expect(screen.queryAllByTestId('ion-check-selected')).toHaveLength(1);
  });

  it('should not select a disabled option', async () => {
    await sut({
      ...defaultDisabled,
    });
    const elementToSelect = document.getElementById('option-0');
    fireEvent.click(elementToSelect);
    expect(elementToSelect.classList).not.toContain('dropdown-item-selected');
    expect(screen.queryAllByTestId('ion-check-selected')).toHaveLength(0);
    expect(selectEvent).not.toHaveBeenCalled();
  });
});

describe('IonDropdownComponent / Multiple / Clear Options', () => {
  const optionsWithMultiple = [
    { label: 'Dog', selected: true },
    { label: 'Cat', selected: true },
    { label: 'Horse', selected: true },
  ];

  const defaultMultiple = {
    options: optionsWithMultiple,
    multiple: true,
    selected: {
      emit: selectEvent,
    } as SafeAny,
  };

  beforeEach(() => {
    selectEvent.mockClear();
  });

  it('should show check icon when mouse enter in option selected', async () => {
    await sut(defaultMultiple);
    expect(screen.queryAllByTestId('ion-check-selected')).toHaveLength(
      optionsWithMultiple.length
    );
    expect(screen.queryAllByTestId('ion-close-selected')).toHaveLength(0);
  });

  it('should deselected a option', async () => {
    await sut(defaultMultiple);
    const elementToSelect = document.getElementById('option-0');
    fireEvent.click(elementToSelect);
    expect(elementToSelect.classList).not.toContain('dropdown-item-selected');
    expect(screen.queryAllByTestId('ion-check-selected')).toHaveLength(
      optionsWithMultiple.length - 1
    );
    expect(selectEvent).toHaveBeenCalledWith([
      optionsWithMultiple[1],
      optionsWithMultiple[2],
    ]);
  });

  it('should change icon only of option hovered', async () => {
    await sut(defaultMultiple);
    const elementToHover = document.getElementById('option-0');
    fireEvent.mouseEnter(elementToHover);
    expect(screen.queryAllByTestId('ion-check-selected')).toHaveLength(
      optionsWithMultiple.length - 1
    );
  });

  it('should render clear button on init if there are selected values by default', async () => {
    await sut(defaultMultiple);
    expect(screen.getByTestId('button-clear')).toBeInTheDocument();
  });

  it('should clear all options and not show button clear in window', async () => {
    await sut(defaultMultiple);
    const buttonClear = screen.getByTestId('button-clear');
    fireEvent.click(buttonClear);
    expect(options.every((option) => option.selected)).toBe(false);
    expect(buttonClear).not.toBeInTheDocument();
  });
});

describe('IonDropdownComponent / With Search', () => {
  const searchEvent = jest.fn();

  const defaultWithSearch = {
    options,
    multiple: true,
    enableSearch: true,
    selected: {
      emit: selectEvent,
    } as SafeAny,
    searchChange: {
      emit: searchEvent,
    } as SafeAny,
  };

  beforeEach(() => {
    selectEvent.mockClear();
  });

  it('should show search input', async () => {
    await sut(defaultWithSearch);
    expect(screen.getByTestId(inputElement)).toBeInTheDocument();
  });

  it('should emit event when searching', async () => {
    const search = 'Apple';
    await sut(defaultWithSearch);
    const searchInput = screen.getByTestId(inputElement);
    userEvent.type(searchInput, search);
    expect(searchEvent).toHaveBeenLastCalledWith(search);
  });
  it('should show empty placeholder when a placeholder is not provided', async () => {
    await sut(defaultWithSearch);
    expect(screen.getByTestId(inputElement)).toHaveAttribute('placeholder', '');
  });
  it('should show search icon when an icon is not provided', async () => {
    await sut(defaultWithSearch);
    expect(document.getElementById('ion-icon-search')).toBeTruthy();
  });

  it('should show icon on right when a direction is not provided', async () => {
    await sut(defaultWithSearch);
    expect(screen.getByTestId(`icon-right`)).toBeInTheDocument();
  });
});

describe('IonDropdownComponent / With Search / Custom Search', () => {
  const searchOptions: IonInputProps = {
    placeholder: 'Buscar',
    iconInput: 'pencil',
    iconDirection: 'left',
  };
  let searchInput;
  beforeEach(async () => {
    await sut({
      options,
      multiple: true,
      enableSearch: true,
      selected: {
        emit: selectEvent,
      } as SafeAny,
      searchChange: {
        emit: jest.fn(),
      } as SafeAny,
      searchOptions,
    });
    searchInput = screen.getByTestId(inputElement);
  });
  it('should show provided placeholder', async () => {
    expect(searchInput).toHaveAttribute(
      'placeholder',
      searchOptions.placeholder
    );
  });
  it('should show provided icon', async () => {
    expect(
      document.getElementById('ion-icon-' + searchOptions.iconInput)
    ).toBeTruthy();
  });
  it('should show icon in provided direction', async () => {
    expect(
      screen.getByTestId(`icon-${searchOptions.iconDirection}`)
    ).toBeInTheDocument();
  });
});
