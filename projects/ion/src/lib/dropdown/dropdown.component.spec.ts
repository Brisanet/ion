import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { IonIconComponent } from '../icon/icon.component';
import { InputComponent, IonInputProps } from '../input/input.component';
import { SafeAny } from '../utils/safe-any';
import { DropdownComponent, DropdownParams } from './dropdown.component';

const options = [];
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
  await render(DropdownComponent, {
    componentProperties: customParams,
    declarations: [IonIconComponent, InputComponent],
    imports: [FormsModule],
  });
  return { element: screen.getByTestId('ion-dropdown') };
};

describe('DropdownComponent', () => {
  beforeEach(async () => {
    await sut();
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

describe('DropdownComponent / Disabled', () => {
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

describe('DropdownComponent / Multiple', () => {
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
});

describe('DropdownComponent / With Search', () => {
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
    expect(screen.getByTestId('inputElement')).toBeInTheDocument();
  });

  it('should emit event when searching', async () => {
    const search = 'Apple';
    await sut(defaultWithSearch);
    const searchInput = screen.getByTestId('inputElement');
    userEvent.type(searchInput, search);
    expect(searchEvent).toHaveBeenLastCalledWith(search);
  });

  it('should show default search input when searchOptions is not provided', async () => {
    await sut(defaultWithSearch);
    expect(screen.getByTestId('inputElement')).toHaveAttribute(
      'placeholder',
      ''
    );
    expect(document.getElementById('ion-icon-search')).toBeTruthy();
    expect(screen.getByTestId(`icon-right`)).toBeInTheDocument();
  });

  it('should be able to customize search input', async () => {
    const searchOptions: IonInputProps = {
      placeholder: 'Buscar',
      iconInput: 'pencil',
      iconDirection: 'left',
    };
    await sut({
      ...defaultWithSearch,
      searchOptions,
    });
    const searchInput = screen.getByTestId('inputElement');
    expect(searchInput).toHaveAttribute(
      'placeholder',
      searchOptions.placeholder
    );
    expect(
      document.getElementById('ion-icon-' + searchOptions.iconInput)
    ).toBeTruthy();
    expect(
      screen.getByTestId(`icon-${searchOptions.iconDirection}`)
    ).toBeInTheDocument();
  });
});
