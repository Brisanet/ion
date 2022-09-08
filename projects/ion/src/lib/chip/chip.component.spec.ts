import { DropdownComponent, BadgeComponent } from 'projects/ion/src/public-api';
import { fireEvent, render, screen } from '@testing-library/angular';
import { IonIconComponent } from '../icon/icon.component';
import { SafeAny } from '../utils/safe-any';
import { ChipComponent, IonChipProps, ChipSize } from './chip.component';

const defaultOptions = [{ label: 'Cat' }, { label: 'Dog' }];

const sut = async (customProps?: IonChipProps) => {
  await render(ChipComponent, {
    componentProperties: customProps || {
      label: 'chip',
    },
    declarations: [IonIconComponent, DropdownComponent, BadgeComponent],
  });
};

describe('ChipComponent', () => {
  it('', async () => {
    await sut({
      label: 'Custom label',
      options: [{ label: 'Cat' }, { label: 'Dog' }],
      icon: 'close',
    });
    const iconDinamic = screen.queryAllByTestId('icon-dinamic');
    const iconDefault = screen.queryAllByTestId('icon-default');
    expect(iconDinamic.length).not.toBe(1);
    expect(iconDefault.length).toBe(1);
  });

  it('should render chip component with custom label', async () => {
    await sut();
    expect(screen.getByText('chip')).toBeTruthy();
  });

  it.each(['sm', 'md'])(
    'should render chip component with size %s',
    async (size: ChipSize) => {
      await sut({ label: 'custom-size', size });
      const element = screen.getByText('custom-size');
      expect(element).toHaveClass('chip-' + size);
    }
  );

  it('should render chip component disabled', async () => {
    await sut({ label: 'chip', disabled: true });
    const element = screen.getByText('chip');
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
    const element = screen.getByText(config.label);
    fireEvent.click(element);
    expect(element).toHaveClass('chip-selected');
    expect(selectEvent).toHaveBeenCalledWith({
      selected: true,
      disabled: false,
    });
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

    fireEvent.click(screen.getByText('dropdown'));
    fireEvent.click(screen.getByText('One More Light'));
    expect(screen.getByTestId('badge-multiple')).toContainHTML('2');
  });
});
