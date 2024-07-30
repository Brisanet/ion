import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { SafeAny } from '../utils/safe-any';
import { COLDOWN, IonDropdownComponent } from './dropdown.component';
import { IonSharedModule } from '../shared.module';
import { DropdownParams } from '../core/types/dropdown';
import { IonInputProps } from '../core/types/input';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { IonDropdownTestModule } from './dropdown-test.module';

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
const scrollFinal = jest.fn();
const clearButtonEvent = jest.fn();
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
  it.each(options)('should render option $label', async ({ label }) => {
    await sut();
    expect(screen.getAllByText(label)).toHaveLength(1);
  });
  afterEach(() => {
    const elementToSelect = document.getElementById('option-0');
    if (elementToSelect.classList.contains('dropdown-item-selected')) {
      fireEvent.click(elementToSelect);
    }
  });

  it('should not render the description as default', async () => {
    await sut();
    expect(
      screen.queryByTestId('dropdown-description')
    ).not.toBeInTheDocument();
  });

  it('should render the description when informed', async () => {
    await sut({
      ...defaultDropdown,
      description: 'Custom description',
    });

    expect(screen.getByTestId('dropdown-description')).toBeVisible();
  });

  it('should select a option', async () => {
    await sut();
    selectEvent.mockClear();
    const optionToSelect = 0;
    const elementToSelect = document.getElementById('option-' + optionToSelect);
    fireEvent.click(elementToSelect);
    expect(elementToSelect.classList).toContain('dropdown-item-selected');
    expect(screen.getAllByTestId('ion-check-selected')).toHaveLength(1);
    expect(selectEvent).toHaveBeenCalledWith([options[optionToSelect]]);
  });

  it('should deselect a option', async () => {
    await sut({
      ...defaultDropdown,
      options: [
        { label: 'Option 1', selected: true },
        { label: 'Option 2', selected: false },
      ],
    });
    const element = document.getElementById('option-0');
    fireEvent.click(element);
    expect(element.classList).not.toContain('dropdown-item-selected');
  });

  it('should change icon to close when mouse enter in option selected', async () => {
    await sut({
      ...defaultDropdown,
      options: [
        { label: 'Option 1', selected: false },
        { label: 'Option 2', selected: false },
      ],
    });
    const elementToHover = document.getElementById('option-0');
    fireEvent.click(elementToHover);
    fireEvent.mouseEnter(elementToHover);
    expect(screen.queryAllByTestId('ion-check-selected')).toHaveLength(0);
    expect(screen.queryAllByTestId('ion-close-selected')).toHaveLength(1);
  });

  it('should not change icon to close when mouse enter in option selected, dropdown is required and simple', async () => {
    await sut({
      ...defaultDropdown,
      required: true,
      options: [
        { label: 'Option 1', selected: false },
        { label: 'Option 2', selected: false },
      ],
    });
    const elementToHover = document.getElementById('option-0');
    fireEvent.click(elementToHover);
    fireEvent.mouseEnter(elementToHover);
    expect(screen.queryAllByTestId('ion-check-selected')).toHaveLength(1);
    expect(screen.queryAllByTestId('ion-close-selected')).toHaveLength(0);
  });

  it('should show check icon when mouse leave of option selected', async () => {
    await sut({
      ...defaultDropdown,
      options: [
        { label: 'Option 1', selected: false },
        { label: 'Option 2', selected: false },
      ],
    });
    const elementToHover = document.getElementById('option-0');
    fireEvent.click(elementToHover);
    fireEvent.mouseEnter(elementToHover);
    fireEvent.mouseLeave(elementToHover);
    expect(screen.queryAllByTestId('ion-check-selected')).toHaveLength(1);
    expect(screen.queryAllByTestId('ion-close-selected')).toHaveLength(0);
  });

  it('should show the option with icon', async () => {
    const iconToShow = 'close';
    const dropdownConfig: DropdownParams = {
      ...defaultDropdown,
      options: [
        { label: 'Option 1', selected: false, icon: iconToShow },
        { label: 'Option 2', selected: false },
      ],
    };

    await sut(dropdownConfig);
    expect(document.getElementById(`ion-icon-${iconToShow}`)).not.toBeNull();
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
    scrollFinal: {
      emit: scrollFinal,
    } as SafeAny,
    clearButton: {
      emit: clearButtonEvent,
    },
  };

  beforeEach(() => {
    selectEvent.mockClear();
  });

  it('should render with clear button when options selected is passed', async () => {
    await sut(defaultMultiple);
    const clearButton = screen.getByTestId('button-clear');
    expect(clearButton).toBeInTheDocument();
  });

  it('should show check icon when mouse enter in option selected', async () => {
    await sut(defaultMultiple);
    expect(screen.queryAllByTestId('ion-check-selected')).toHaveLength(
      optionsWithMultiple.length
    );
    expect(screen.queryAllByTestId('ion-close-selected')).toHaveLength(0);
  });

  it('should not change icon to close when mouse enter in option selected and dropdown is required', async () => {
    await sut({
      ...defaultMultiple,
      required: true,
    });
    const elementToHover = document.getElementById('option-0');
    fireEvent.mouseEnter(elementToHover);
    expect(screen.queryAllByTestId('ion-check-selected')).toHaveLength(2);
    expect(screen.queryAllByTestId('ion-close-selected')).toHaveLength(1);
  });

  it('should not change icon to close when mouse enter in option selected, dropdown is required, multiple and have only one selected', async () => {
    await sut({
      ...defaultMultiple,
      required: true,
      options: [
        { label: 'Dog', selected: true },
        { label: 'Cat', selected: false },
        { label: 'Horse', selected: false },
      ],
    });
    const elementToHover = document.getElementById('option-0');
    fireEvent.mouseEnter(elementToHover);
    expect(screen.queryAllByTestId('ion-check-selected')).toHaveLength(1);
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
    const buttonClear = screen.getByTestId('btn-Limpar');
    fireEvent.click(buttonClear);
    expect(options.every((option) => option.selected)).toBe(false);
    expect(clearButtonEvent).toHaveBeenCalled();
    expect(buttonClear).not.toBeInTheDocument();
  });

  it('should emmit event when reach the final of scrollable dropdown', async () => {
    await sut(defaultMultiple);
    const elementToScroll = document.getElementById('option-list');
    const scrollsize =
      elementToScroll.scrollHeight + elementToScroll.clientHeight;
    fireEvent.scroll(elementToScroll, {
      target: {
        scrollY: scrollsize,
      },
    });
    expect(scrollFinal).toBeCalled();
  });
});

describe('IonDropdownComponent / Multiple With Max Length', () => {
  const optionsWithMultiple = [
    { label: 'Dog', selected: true },
    { label: 'Cat', selected: false },
    { label: 'Horse', selected: false },
  ];

  const maxSelectedQtd = 1;

  const defaultMultiple = {
    options: optionsWithMultiple,
    multiple: true,
    maxSelected: maxSelectedQtd,
    selected: {
      emit: selectEvent,
    } as SafeAny,
  };

  it('should not select an option when the defined limit was reached', async () => {
    await sut(defaultMultiple);

    let elementToSelect = document.getElementById('option-1');
    fireEvent.click(elementToSelect);
    elementToSelect = document.getElementById('option-2');
    fireEvent.click(elementToSelect);

    expect(
      document.getElementsByClassName('dropdown-item-selected')
    ).toHaveLength(maxSelectedQtd);
  });
});

describe('IonDropdownComponent / Default With Max Length', () => {
  const optionsWithMultiple = [
    { label: 'Dog', selected: true },
    { label: 'Cat', selected: false },
    { label: 'Horse', selected: false },
  ];

  const defaultMultiple = {
    options: optionsWithMultiple,
    multiple: false,
    maxSelected: 2,
    selected: {
      emit: selectEvent,
    } as SafeAny,
  };

  it('should not select more than one option when passed an max length', async () => {
    await sut(defaultMultiple);

    let elementToSelect = document.getElementById('option-1');
    fireEvent.click(elementToSelect);
    elementToSelect = document.getElementById('option-2');
    fireEvent.click(elementToSelect);

    expect(
      document.getElementsByClassName('dropdown-item-selected')
    ).toHaveLength(1);
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

describe('IonDropdownComponent / Changes detection', () => {
  let component: IonDropdownComponent;
  let fixture: ComponentFixture<IonDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonDropdownTestModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IonDropdownComponent);
    component = fixture.componentInstance;
    component.options = options;
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should update options and call updateSelectedItems', fakeAsync(() => {
    const newOptions = [{ label: 'Option 1', selected: true }];
    const changes: SimpleChanges = {
      options: new SimpleChange(undefined, newOptions, false),
    };
    const spy = jest.spyOn(component, 'updateSelectedItems');

    component.options = newOptions;
    component.ngOnChanges(changes);
    tick(COLDOWN + 1);

    expect(component.options).toEqual(newOptions);
    expect(spy).toHaveBeenCalled();
  }));

  it('should call setClearButtonIsVisible()', fakeAsync(() => {
    const spy = jest.spyOn(component, 'setClearButtonIsVisible');
    fixture.detectChanges();
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});

describe('IonDropdownComponent / Required', () => {
  const defaultRequired = {
    ...defaultDropdown,
    required: true,
    options: [
      { label: 'Option 1', selected: false },
      { label: 'Option 2', selected: false },
    ],
    selected: {
      emit: selectEvent,
    } as SafeAny,
  };

  it('should not deselect a selected option', async () => {
    await sut(defaultRequired);

    const element = document.getElementById('option-0');
    fireEvent.click(element);
    fireEvent.click(element);
    expect(element).toHaveClass('dropdown-item-selected');
  });

  it('should render a multiple dropdown even when required true', async () => {
    await sut({
      ...defaultDropdown,
      multiple: true,
      required: true,
      options: [
        { label: 'Option 1', selected: false },
        { label: 'Option 2', selected: false },
      ],
    });
    const element = document.getElementById('option-0');
    expect(element).not.toHaveClass('dropdown-item-selected');
  });

  it('should change option when clicked', async () => {
    await sut(defaultRequired);
    const elementToClick = document.getElementById('option-1');
    fireEvent.click(elementToClick);
    expect(elementToClick).toHaveClass('dropdown-item-selected');
    expect(document.getElementById('option-0')).toHaveClass('dropdown-item');
  });
});

describe('IonDropdownComponent / No data', () => {
  const defaultNoData = {
    ...defaultDropdown,
    options: [],
    selected: {
      emit: selectEvent,
    } as SafeAny,
  };

  it('Should render NoData when there are no options.', async () => {
    await sut(defaultNoData);
    const element = screen.getByTestId('ion-no-data');
    expect(element).toBeInTheDocument();
    expect(screen.getByText('Não há dados')).toBeInTheDocument();
    expect(
      document.getElementById('ion-icon-exclamation-rounded')
    ).toBeInTheDocument();
  });

  it('Should not render NoData when there are options.', async () => {
    await sut({
      ...defaultNoData,
      options: [{ label: 'Option 1', selected: false }],
    });
    const element = screen.queryByTestId('ion-no-data');
    expect(element).not.toBeInTheDocument();
  });

  it('Should render NoData with custom parameters.', async () => {
    const noDataConfig = {
      label: 'Dados? Fugiram em férias!',
      iconType: 'working',
    };
    await sut({
      ...defaultNoData,
      noDataConfig,
    });
    expect(screen.getByText(noDataConfig.label)).toBeInTheDocument();
    expect(
      document.getElementById(`ion-icon-${noDataConfig.iconType}`)
    ).toBeInTheDocument();
  });

  it('should not render button clear when there are no options', async () => {
    await sut(defaultNoData);
    expect(screen.queryByTestId('button-clear')).not.toBeInTheDocument();
  });
});

describe('Custom dropdown label', () => {
  const options = [
    { label: 'Option 1', name: 'Corret Option One', selected: true },
    { label: 'Option 2', name: 'Corret Option Two', selected: false },
  ];

  it('should render attribute `name` on option label', async () => {
    const dropdownCustomLabel = {
      propLabel: 'name',
      options,
      selected: {
        emit: selectEvent,
      } as SafeAny,
    };

    await sut({
      ...dropdownCustomLabel,
    });
    expect(
      screen.getByText(options[0][dropdownCustomLabel.propLabel])
    ).toBeInTheDocument();
  });
});

describe('IonDropdownComponent / Loading', () => {
  const defaultPropsWithLoading = {
    ...defaultDropdown,
    options: [
      { label: 'Option 1', selected: false },
      { label: 'Option 2', selected: false },
    ],
    loading: true,
  };

  beforeEach(async () => {
    await sut({
      ...defaultPropsWithLoading,
    });
  });

  it('should show a spinner when loading', () => {
    expect(screen.getByTestId('ion-spinner')).toBeVisible();
  });

  it('should not render button clear when loading', () => {
    expect(screen.queryByTestId('button-clear')).not.toBeInTheDocument();
  });
});
