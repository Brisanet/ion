import { fireEvent, render, screen } from '@testing-library/angular';
import { BadgeComponent, DropdownComponent } from 'projects/ion/src/public-api';
import { IonIconComponent } from '../icon/icon.component';
import { InfoBadgeComponent } from '../info-badge/info-badge.component';
import { SafeAny } from '../utils/safe-any';
import {
  ChipComponent,
  IonChipProps,
  ChipSize,
  IconDirection,
} from './chip.component';
import { InfoBadgeStatus } from '../core/types';

const defaultOptions = [{ label: 'Cat' }, { label: 'Dog' }];

const sut = async (customProps?: IonChipProps): Promise<void> => {
  await render(ChipComponent, {
    componentProperties: customProps || {
      label: 'chip',
    },
    declarations: [
      IonIconComponent,
      DropdownComponent,
      BadgeComponent,
      InfoBadgeComponent,
    ],
  });
};

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

  describe('With Dropdown', () => {
    beforeEach(async () => {
      await sut({
        label: 'dropdown',
        options: defaultOptions,
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
      fireEvent.click(screen.getByText(option));
      expect(element).toHaveClass('chip');
      expect(screen.queryAllByText(option)).toHaveLength(1);
    });
  });
});

describe('With Multiple Dropdown', () => {
  beforeEach(async () => {
    await sut({
      label: 'dropdown',
      options: [
        {
          label: 'Meteora',
        },
        {
          label: 'One More Light',
        },
      ],
      multiple: true,
    });
  });

  it('should not show badge when dont have item selected', async () => {
    expect(screen.queryAllByTestId('badge-multiple')).toHaveLength(0);
  });

  it('should show badge with two results when selected two options', async () => {
    fireEvent.click(screen.getByText('dropdown'));
    fireEvent.click(screen.getByText('Meteora'));
    fireEvent.click(screen.getByText('One More Light'));
    expect(screen.getByTestId('badge-multiple')).toContainHTML('2');
  });

  it('should keep dropdown open when an option will be selected', async () => {
    const dropdown = screen.getByTestId('ion-chip');
    fireEvent.click(dropdown);
    fireEvent.click(screen.getByText('Meteora'));
    expect(dropdown).toHaveClass('chip-selected');
  });
});
