import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { IonBadgeComponent } from '../badge/badge.component';
import { IonDropdownComponent } from '../dropdown/dropdown.component';
import { IonIconComponent } from '../icon/icon.component';
import { IonInfoBadgeComponent } from '../info-badge/info-badge.component';
import { SafeAny } from '../utils/safe-any';
import {
  IonChipComponent,
  IonChipProps,
  ChipSize,
  IconDirection,
} from './chip.component';
import { DropdownItem, InfoBadgeStatus } from '../core/types';

const defaultOptions = [{ label: 'Cat' }, { label: 'Dog' }];

const sut = async (
  customProps?: Partial<IonChipProps>
): Promise<RenderResult<IonChipComponent>> => {
  return await render(IonChipComponent, {
    componentInputs: {
      label: 'chip',
      ...customProps,
    },
    imports: [
      IonBadgeComponent,
      IonIconComponent,
      IonDropdownComponent,
      IonInfoBadgeComponent,
    ],
  });
};

const getContainerDropdown = (): HTMLElement | null =>
  document.getElementById('ion-dropdown');

describe('ChipComponent', () => {
  it('should render chip with options', async () => {
    await sut({
      label: 'Custom label',
      options: [{ label: 'Cat' }, { label: 'Dog' }],
      icon: 'close',
      iconPosition: 'left',
    });
    const iconDinamic = screen.queryAllByTestId('icon-dinamic');
    const iconDefault = screen.queryAllByTestId('icon-default');
    expect(iconDinamic.length).not.toBe(1);
    expect(iconDefault.length).toBe(1);
  });

  it('should not render with info badge by default', async () => {
    await sut({});
    expect(screen.queryAllByTestId('info-badge')).toHaveLength(0);
  });

  it('should render chip component with custom label', async () => {
    await sut({});
    expect(screen.getByText('chip')).toBeTruthy();
  });

  it.each(['sm', 'md'])(
    'should render chip component with size %s',
    async (size: string) => {
      await sut({ label: 'custom-size', size: size as ChipSize });
      const element = screen.getByTestId('ion-chip');
      expect(element).toHaveClass('chip-' + size);
    }
  );

  it('should render icon on left', async () => {
    await sut({
      label: 'custom-position',
      iconPosition: 'left',
      icon: 'close',
    });
    const chipIcon = screen.getByTestId('chip-icon-left');
    expect(chipIcon).toHaveClass('icon-color chip-icon-left');
  });

  it('should render chip component disabled', async () => {
    await sut({ label: 'chip', disabled: true });
    const element = screen.getByTestId('ion-chip');
    expect(element).toHaveAttribute('disabled');
  });

  it('should select chip', async () => {
    const selectEvent = jest.fn();
    const { fixture } = await sut({ label: 'with event' });
    fixture.componentInstance.events.subscribe(selectEvent);

    const element = screen.getByTestId('ion-chip');
    fireEvent.click(element);
    expect(element).toHaveClass('chip-selected');
    expect(selectEvent).toHaveBeenCalledWith({
      selected: true,
      disabled: false,
    });
  });

  it.each(['primary', 'success', 'info', 'warning', 'negative'])(
    'should render info badge with status %s',
    async (badgeType: string) => {
      await sut({ label: 'chip', infoBadge: badgeType as InfoBadgeStatus });
      expect(screen.getByTestId('info-badge')).toHaveClass(badgeType);
    }
  );

  it('should render chip with right badge', async () => {
    const labelBadge = 'novo';
    await sut({
      label: 'right badge',
      rightBadge: { label: labelBadge, type: 'negative' },
    });
    expect(screen.getByText(labelBadge)).toBeInTheDocument();
  });

  it('should render the label of the first selected option when displaying the chip with dropdown', async () => {
    const customLabel = 'option';
    await sut({
      label: 'chip',
      options: [{ label: customLabel, selected: true }],
    });
    expect(screen.getByText(customLabel)).toBeInTheDocument();
  });

  it('should render badge with value', async () => {
    await sut({
      label: 'Chip',
      options: [
        { label: 'Option 1', selected: true },
        { label: 'Option 2', selected: false },
      ],
      multiple: true,
    });
    expect(screen.getByTestId('badge-multiple')).toHaveTextContent('1');
  });

  it('should start with badge when an item is already selected', async () => {
    await sut({
      label: 'dropdown',
      options: [
        { label: 'Option 1', selected: true },
        { label: 'Option 2', selected: false },
      ],
      multiple: true,
    });
    expect(screen.queryAllByTestId('badge-multiple')).toHaveLength(1);
  });

  describe('With Dropdown', () => {
    let dropdownEvent: jest.Mock;

    beforeEach(async () => {
      dropdownEvent = jest.fn();
      const { fixture } = await sut({
        label: 'dropdown',
        options: defaultOptions,
      });
      fixture.componentInstance.dropdownEvents.subscribe(dropdownEvent);
    });

    it('should render icon semi-down when has options', async () => {
      const icon = document.getElementById('ion-icon-semi-down');
      expect(icon).toBeInTheDocument();
    });

    it('should render icon semi-up when has options and click in chip', async () => {
      const element = screen.getByText('dropdown');
      fireEvent.click(element);
      expect(screen.getByText(defaultOptions[0].label)).toBeInTheDocument();
    });

    it('should emit options selected when select in chip', async () => {
      const option = defaultOptions[0];
      const chipToOpen = screen.getByTestId('ion-chip');
      fireEvent.click(chipToOpen);
      fireEvent.click(document.getElementById('option-0')!);
      expect(dropdownEvent).toHaveBeenCalledWith([option]);
    });

    it('should render call event only one time when select a option', async () => {
      const option = defaultOptions[1];
      const chipToOpen = screen.getByTestId('ion-chip');
      fireEvent.click(chipToOpen);
      fireEvent.click(document.getElementById('option-1')!);
      expect(dropdownEvent).toHaveBeenCalledWith([option]);
      expect(dropdownEvent).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
      dropdownEvent.mockClear();
    });
  });
});

describe('Check update label', () => {
  const options = [
    { label: 'Cat', selected: false },
    { label: 'Dog', selected: false },
    { label: 'Bird', selected: false },
  ];

  it('should change label when select option', async () => {
    await sut({
      label: 'dropdown',
      options: options,
    });
    const chip = screen.getByText('dropdown');
    fireEvent.click(chip);
    const option = screen.getByText(options[0].label);
    fireEvent.click(option);
    expect(screen.getByText(options[0].label)).toBeInTheDocument();
  });

  it('should change label when deselect option', async () => {
    const opts = [...options];
    opts[0].selected = true;
    await sut({
      label: 'dropdown',
      options: opts,
    });
    const chip = screen.getByText('Cat');
    fireEvent.click(chip);
    const option = document.getElementById('option-0');
    fireEvent.click(option!);
    expect(screen.getByText('dropdown')).toBeInTheDocument();
  });
});

describe('With Multiple Dropdown', () => {
  let dropdownEvent: jest.Mock;
  let eventsEmit: jest.Mock;
  const options = [
    {
      label: 'Meteora',
      selected: false,
      key: 'meteora',
    },
    {
      label: 'One More Light',
      selected: false,
      key: 'one_more_light',
    },
  ];

  beforeEach(async () => {
    dropdownEvent = jest.fn();
    eventsEmit = jest.fn();
    const { fixture } = await sut({
      label: 'dropdown',
      options: JSON.parse(JSON.stringify(options)),
      multiple: true,
    });
    fixture.componentInstance.dropdownEvents.subscribe(dropdownEvent);
    fixture.componentInstance.events.subscribe(eventsEmit);
  });

  it('should not show badge when dont have item selected', async () => {
    expect(screen.queryAllByTestId('badge-multiple')).toHaveLength(0);
  });

  it('should show badge with two results when selected two options', async () => {
    fireEvent.click(screen.getByText('dropdown'));
    fireEvent.click(screen.getByText(options[0].label));
    fireEvent.click(screen.getByText(options[1].label));
    const updatedOptions = [...options];
    updatedOptions[0].selected = true;
    updatedOptions[1].selected = true;
    expect(dropdownEvent).toHaveBeenCalledWith(updatedOptions);
    expect(screen.getByText('Limpar')).toBeInTheDocument();
    expect(screen.getByTestId('badge-multiple')).toContainHTML('2');
  });

  it('should keep dropdown open when an option will be selected', async () => {
    const dropdown = screen.getByTestId('ion-chip');
    fireEvent.click(dropdown);
    fireEvent.click(screen.getByText(options[0].label));
    expect(screen.getAllByTestId('ion-dropdown')).toBeTruthy();
    expect(screen.getByText('Limpar')).toBeInTheDocument();
  });

  it('should clear badge when clear button be clicked', async () => {
    fireEvent.click(screen.getByText('dropdown'));
    fireEvent.click(screen.getByText(options[0].label));
    fireEvent.click(screen.getByText('Limpar'));
    expect(screen.queryAllByTestId('badge-multiple')).toHaveLength(0);
  });

  it('should emit event when click clear button', async () => {
    fireEvent.click(screen.getByText('dropdown'));
    fireEvent.click(screen.getByText(options[0].label));
    fireEvent.click(screen.getByText('Limpar'));
    expect(dropdownEvent).toHaveBeenCalledWith([]);
  });

  it('should reset chip style when dropdown is closed', async () => {
    fireEvent.click(screen.getByText('dropdown'));
    fireEvent.click(document.body);
    expect(screen.getByText('dropdown')).not.toHaveClass('chip-selected');
  });

  it('should emit event when dropdown is closed', async () => {
    fireEvent.click(screen.getByText('dropdown'));
    fireEvent.click(document.body);
    expect(eventsEmit).toHaveBeenCalledWith({
      selected: false,
      disabled: false,
      closeDropdown: true,
    });
  });

  afterEach(() => {
    dropdownEvent.mockClear();
  });
});

describe('With dropdown with icons', () => {
  const options = [
    {
      label: 'Meteora',
      selected: false,
      key: 'meteora',
      icon: 'box',
    },
    {
      label: 'One More Light',
      selected: false,
      key: 'one_more_light',
      icon: 'block',
    },
  ];

  beforeEach(async () => {
    await sut({
      label: 'dropdown',
      options: JSON.parse(JSON.stringify(options)),
    });
  });

  it('should set the icon to the selected option', async () => {
    fireEvent.click(screen.getByText('dropdown'));
    fireEvent.click(screen.getByText(options[0].label));
    const chipIcon = document.getElementById(`ion-icon-${options[0].icon}`);
    expect(chipIcon).toBeVisible();
  });
});

describe('With Dropdown with search input', () => {
  const searchEvent = jest.fn();
  const label = 'dropdown';
  const placeholder = 'Busca';

  beforeEach(async () => {
    const { fixture } = await sut({
      label,
      options: [{ label: 'Option 1' }],
      dropdownSearchConfig: {
        enableSearch: true,
        searchOptions: {
          placeholder,
        },
      },
    });
    fixture.componentInstance.dropdownSearchEvents.subscribe(searchEvent);
    fireEvent.click(screen.getByText('dropdown'));
  });

  it('should render search with correct placeholder input when enableSearch is true', async () => {
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('should emit search event when search input change', async () => {
    const input = 'folklore';
    userEvent.type(screen.getByTestId('input-element'), input);
    expect(screen.getByTestId('input-element')).toHaveValue(input);
    expect(searchEvent).toHaveBeenCalledWith(input);
  });

  it('should toggle dropdown when click', async () => {
    expect(getContainerDropdown()).toBeTruthy();
    userEvent.click(screen.getByText('dropdown'));
    expect(getContainerDropdown()).toBe(null);
  });

  it('should close dropdown on click outside element', async () => {
    expect(getContainerDropdown()).toBeTruthy();

    const fakeDiv = document.createElement('div');
    fakeDiv.setAttribute('data-testid', 'fake-div');
    document.body.appendChild(fakeDiv);

    fireEvent.click(fakeDiv);
    fireEvent.click(fakeDiv);

    expect(getContainerDropdown()).toBe(null);
  });

  it('should close the dropdown when clicking on the path contained in the chip`s svg', async () => {
    expect(getContainerDropdown()).toBeTruthy();
    const svgElement = document.querySelector('svg');
    const pathElement = svgElement!.querySelector('path');
    expect(pathElement).toBeTruthy();
    fireEvent.click(pathElement!);
    expect(getContainerDropdown()).toBe(null);
  });

  afterEach(() => {
    searchEvent.mockClear();
  });
});

describe('IonChipComponent / Option showToggle', () => {
  it('should not close dropdown when showToggle option is true', async () => {
    await sut({
      label: 'dropdown',
      showToggle: true,
      options: [],
    });

    fireEvent.click(screen.getByText('dropdown'));
    expect(getContainerDropdown()).toBeTruthy();
    fireEvent.click(document.body);
    expect(getContainerDropdown()).toBeTruthy();
  });

  it('should not close dropdown when selected option', async () => {
    await sut({
      label: 'dropdown',
      showToggle: true,
      options: [...defaultOptions],
    });
    fireEvent.click(screen.getByText(defaultOptions[1].label));
    expect(getContainerDropdown()).toBeTruthy();
  });
});

describe('IonChipComponent / Required', () => {
  const options = [
    { label: 'Cat', selected: false },
    { label: 'Dog', selected: false },
  ];
  const requiredConfiguration = {
    label: 'Custom label',
    options: options,
    icon: 'close' as const,
    required: true,
  };

  it('should render with correct label', async () => {
    await sut(requiredConfiguration);
    expect(screen.getByTestId('ion-chip-label')).toContainHTML('Custom label');
  });

  it('should not change label when selected option is clicked', async () => {
    await sut(requiredConfiguration);
    const chip = screen.getByText('Custom label');
    for (let index = 0; index < 2; index++) {
      fireEvent.click(chip);
      fireEvent.click(document.getElementById('option-0')!);
      expect(chip).toContainHTML('Cat');
    }
  });
});
