import { fireEvent, render, screen } from '@testing-library/angular';
import { BadgeComponent } from '../badge/badge.component';
import { ChipComponent, ChipSize } from '../chip/chip.component';
import { SafeAny } from '../utils/safe-any';
import { ChipGroupComponent, ChipGroupProps } from './chip-group.component';
import { DropdownModule } from '../dropdown/dropdown.module';
import { InfoBadgeComponent } from '../info-badge/info-badge.component';

const selectEvent = jest.fn();
const mockChips = [
  {
    label: 'Chip 1',
    selected: false,
  },
  {
    label: 'Chip 2',
    selected: false,
    options: [{ label: 'item 3' }, { label: 'item 4' }],
  },
  {
    label: 'Chip 3',
    selected: false,
    options: [{ label: 'item 4' }, { label: 'item 5' }],
    multiple: true,
  },
];

const sut = async (
  customProps: ChipGroupProps = {
    chips: mockChips,
    selected: {
      emit: selectEvent,
    } as SafeAny,
  }
): Promise<{ element: HTMLElement; event: jest.Mock }> => {
  await render(ChipGroupComponent, {
    componentProperties: customProps,
    imports: [DropdownModule],
    declarations: [ChipComponent, BadgeComponent, InfoBadgeComponent],
  });
  return { element: screen.getByTestId('ion-chip-group'), event: selectEvent };
};

describe('ChipGroupComponent', () => {
  it('should render component', async () => {
    const rendered = await sut();
    expect(rendered).toBeTruthy();
  });

  it('should emit chip selected when clicked', async () => {
    const rendered = await sut();
    fireEvent.click(screen.getByText(mockChips[0].label));
    expect(rendered.event).toHaveBeenCalledWith({
      label: mockChips[0].label,
      selected: true,
    });
  });

  it.each(['sm', 'md'])(
    'should render chips with %s size',
    async (size: string) => {
      await sut({
        chips: [{ label: 'custom-size' }],
        size: size as ChipSize,
        selected: {
          emit: selectEvent,
        } as SafeAny,
      });

      const element = screen.getByTestId('ion-chip');
      expect(element).toHaveClass(`chip-${size}`);
    }
  );

  it('should emit selected chip when double clicked', async () => {
    const rendered = await sut();
    fireEvent.click(screen.getByText(mockChips[0].label));
    fireEvent.click(screen.getByText(mockChips[0].label));
    expect(rendered.event).toHaveBeenCalledWith({
      label: mockChips[0].label,
      selected: true,
    });
  });

  it('should render chip component disabled', async () => {
    await sut({
      chips: [{ label: 'custom-size' }],
      disabled: true,
      selected: {
        emit: selectEvent,
      } as SafeAny,
    });
    const element = screen.getByTestId('ion-chip');
    expect(element).toHaveAttribute('disabled');
  });
});

describe('With Dropdown', () => {
  it('should selected an item when chip has dropdown', async () => {
    await sut();
    const option = mockChips[1].options[0].label;
    fireEvent.click(screen.getByText(mockChips[1].label));
    fireEvent.click(screen.getByText(option));
    expect(screen.queryAllByText(option)).toHaveLength(1);
  });

  it('should keep open only one dropdown per chip-group', async () => {
    const rendered = await sut();
    fireEvent.click(screen.getByText(mockChips[0].label));
    expect(rendered.event).toHaveBeenCalledWith({
      label: mockChips[0].label,
      selected: true,
    });
    fireEvent.click(screen.getByText(mockChips[1].label));
    expect(rendered.event).toHaveBeenCalledWith({
      label: mockChips[0].label,
      selected: false,
    });
  });
});

describe('With Multiple Dropdown', () => {
  it('should not show badge when dont have item selected', async () => {
    expect(screen.queryAllByTestId('badge-multiple')).toHaveLength(0);
  });
  it('should show badge with two results when selected two options', async () => {
    const rendered = await sut();
    fireEvent.click(screen.getByText(mockChips[2].label));
    fireEvent.click(screen.getByText(mockChips[2].options[0].label));
    fireEvent.click(screen.getByText(mockChips[2].options[1].label));
    expect(rendered.event).toBeCalledWith(mockChips[2]);
    expect(screen.getByTestId('badge-multiple')).toContainHTML('2');
  });

  // it('should keep dropdown open when an option will be selected', async () => {
  //   const dropdown = screen.getByText(mockChips[2].label);
  //   fireEvent.click(dropdown);
  //   fireEvent.click(screen.getByText(mockChips[2].options[0].label));
  //   expect(dropdown).toHaveClass('chip-selected');
  // });
});
