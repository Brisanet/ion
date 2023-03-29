import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { IonBadgeModule } from '../badge/badge.module';
import { IonDropdownModule } from '../dropdown/dropdown.module';
import { IonIconModule } from '../icon/icon.module';
import { IonInfoBadgeModule } from '../info-badge/info-badge.module';
import { SafeAny } from '../utils/safe-any';
import {
  ChipComponent,
  IonChipProps,
  ChipSize,
  IconDirection,
} from './chip.component';
import { InfoBadgeStatus } from '../core/types';
import { ChangeDetectorRef } from '@angular/core';
import { COOLDOWN_TIME } from '../utils';

const defaultOptions = [{ label: 'Cat' }, { label: 'Dog' }];

const sut = async (customProps?: IonChipProps): Promise<void> => {
  await render(ChipComponent, {
    componentProperties: customProps || {
      label: 'chip',
    },
    imports: [
      IonBadgeModule,
      IonIconModule,
      IonDropdownModule,
      IonInfoBadgeModule,
    ],
  });
};

class MockChangeDetectorRef extends ChangeDetectorRef {
  markForCheck(): void {
    return;
  }
  detach(): void {
    return;
  }
  detectChanges(): void {
    return;
  }
  checkNoChanges(): void {
    return;
  }
  reattach(): void {
    return;
  }
}

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
    await sut();
    expect(screen.queryAllByTestId('info-badge')).toHaveLength(0);
  });

  it('should render chip component with custom label', async () => {
    await sut();
    expect(screen.getByText('chip')).toBeTruthy();
  });

  it.each(['sm', 'md'])(
    'should render chip component with size %s',
    async (size: ChipSize) => {
      await sut({ label: 'custom-size', size });
      const element = screen.getByTestId('ion-chip');
      expect(element).toHaveClass('chip-' + size);
    }
  );

  it('should render icon on left', async (iconPosition: IconDirection = 'left', icon = 'close') => {
    await sut({ label: 'custom-position', iconPosition, icon });
    const element = screen.getByText('custom-position');
    expect(element).toHaveClass('container-icon-text positionIcon');
  });

  it('should render chip component disabled', async () => {
    await sut({ label: 'chip', disabled: true });
    const element = screen.getByTestId('ion-chip');
    expect(element).toHaveAttribute('disabled');
  });

  it('should select chip', async () => {
    const selectEvent = jest.fn();
    const config = {
      label: 'with event',
      events: {
        emit: selectEvent,
      } as SafeAny,
    };
    await sut(config);
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
    async (badgeType: InfoBadgeStatus) => {
      await sut({ label: 'chip', infoBadge: badgeType });
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

  it('should execute code inside setTimeout and set the ID', async () => {
    const ref = new MockChangeDetectorRef();
    const component = new ChipComponent(ref);
    component.ngAfterViewInit();

    await new Promise((resolve) => setTimeout(resolve, COOLDOWN_TIME));

    expect(component.id).toBeDefined();
  });

  describe('With Dropdown', () => {
    const dropdownEvent = jest.fn();
    beforeEach(async () => {
      await sut({
        label: 'dropdown',
        options: defaultOptions,
        dropdownEvents: {
          emit: dropdownEvent,
        } as SafeAny,
      });
    });

    it('should render icon semi-down  when has options', async () => {
      const icon = document.getElementById('ion-icon-semi-down');
      expect(icon).toBeInTheDocument();
    });

    it('should render icon semi-down when has options', async () => {
      expect(document.getElementById('ion-icon-semi-down')).toBeInTheDocument();
    });

    it('should render icon semi-up when has options and click in chip', async () => {
      const element = screen.getByText('dropdown');
      fireEvent.click(element);
      expect(screen.getByText(defaultOptions[0].label)).toBeInTheDocument();
    });

    it('should show option label in chip label when selected', async () => {
      const option = defaultOptions[0].label;
      const element = screen.getByText('dropdown');
      fireEvent.click(element);
      fireEvent.click(screen.getByText(option));
      expect(screen.getAllByText(option)).toHaveLength(1);
    });

    it('should close dropdown when is not multiple and selected an option', async () => {
      const option = defaultOptions[0].label;
      const element = screen.getByTestId('ion-chip');
      fireEvent.click(element);
      fireEvent.click(document.getElementById('option-0'));
      expect(element).toHaveClass('chip');
      expect(screen.queryAllByText(option)).toHaveLength(1);
    });

    it('should emit options selected when select in chip', async () => {
      const option = defaultOptions[0];
      const chipToOpen = screen.getByTestId('ion-chip');
      fireEvent.click(chipToOpen);
      fireEvent.click(document.getElementById('option-0'));
      expect(dropdownEvent).toBeCalledWith([option]);
    });

    afterEach(() => {
      dropdownEvent.mockClear();
    });
  });
});

describe('With Multiple Dropdown', () => {
  const dropdownEvent = jest.fn();
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
    await sut({
      label: 'dropdown',
      options: JSON.parse(JSON.stringify(options)),
      multiple: true,
      dropdownEvents: {
        emit: dropdownEvent,
      } as SafeAny,
    });
  });

  it('should not show badge when dont have item selected', async () => {
    expect(screen.queryAllByTestId('badge-multiple')).toHaveLength(0);
  });

  it('should show badge with two results when selected two options', async () => {
    fireEvent.click(screen.getByText('dropdown'));
    fireEvent.click(screen.getByText(options[0].label));
    fireEvent.click(screen.getByText(options[1].label));
    options[0].selected = true;
    options[1].selected = true;
    expect(dropdownEvent).toBeCalledWith(options);
    expect(screen.getByTestId('badge-multiple')).toContainHTML('2');
  });

  it('should keep dropdown open when an option will be selected', async () => {
    const dropdown = screen.getByTestId('ion-chip');
    fireEvent.click(dropdown);
    fireEvent.click(screen.getByText(options[0].label));
    expect(dropdown).toHaveClass('chip-selected');
  });

  afterEach(() => {
    dropdownEvent.mockClear();
  });
});

describe('With Dropdown with search input', () => {
  const searchEvent = jest.fn();
  const label = 'dropdown';
  const placeholder = 'Busca';

  beforeEach(async () => {
    await sut({
      label,
      options: [],
      dropdownEvents: {
        emit: jest.fn(),
      } as SafeAny,
      dropdownSearchConfig: {
        enableSearch: true,
        searchOptions: {
          placeholder,
        },
      },
      dropdownSearchEvents: {
        emit: searchEvent,
      } as SafeAny,
    });
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

  afterEach(() => {
    searchEvent.mockClear();
  });
});
