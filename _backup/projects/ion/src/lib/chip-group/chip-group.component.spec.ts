import { fireEvent, render, screen } from '@testing-library/angular';
import { SafeAny } from '../utils/safe-any';
import { IonChipGroupComponent } from './chip-group.component';
import { FormsModule } from '@angular/forms';
import { ChipSize } from '../core/types';
import { IonButtonModule } from '../button/button.module';
import { IonChipModule } from '../chip/chip.module';
import { ChipGroupProps } from '../core/types/chip-group';

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
];

const sut = async (
  customProps: ChipGroupProps = {
    chips: mockChips,
    selected: {
      emit: selectEvent,
    } as SafeAny,
  }
): Promise<{ element: HTMLElement; event: jest.Mock }> => {
  await render(IonChipGroupComponent, {
    componentProperties: customProps,
    imports: [FormsModule, IonButtonModule, IonChipModule],
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
      selected: mockChips[0].selected,
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

  it('when chipgroup is multiple chip basic should remain selected when other is clicked', async () => {
    const rendered = await sut({
      chips: mockChips,
      multiple: true,
      selected: {
        emit: selectEvent,
      } as SafeAny,
    });
    expect(rendered.event).toHaveBeenCalledWith({
      label: mockChips[0].label,
      selected: true,
    });
    fireEvent.click(screen.getByText(mockChips[1].label));
    expect(screen.getAllByTestId('ion-chip')[0]).toHaveClass('chip-selected');
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

  it('should render chip selected and not unselect when group is required', async () => {
    const chips = [
      { label: 'Option 1', selected: true },
      { label: 'Option 2', selected: false },
    ];

    await sut({
      chips,
      required: true,
      selected: {
        emit: selectEvent,
      } as SafeAny,
    });
    const optionElement = screen.getByTestId(`chip-group-${chips[0].label}`);
    fireEvent.click(optionElement);
    expect(optionElement).toHaveAttribute('ng-reflect-selected', 'true');
  });

  it('should not select a chip when disabled', async () => {
    const chips = [
      { label: 'Option 1', selected: false },
      { label: 'Option 2', selected: false },
    ];

    await sut({
      chips,
      disabled: true,
    });

    const optionElement = screen.getByTestId(`chip-group-${chips[0].label}`);
    fireEvent.click(optionElement);
    expect(optionElement).not.toHaveClass('chip-selected');
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

  it('should not close the dropdown when an option is selected and the chip is multiple', async () => {
    await sut({
      chips: [
        {
          label: 'Chip 1',
          selected: false,
          options: [{ label: 'item 1' }, { label: 'item 2' }],
          multiple: true,
        },
      ],
      selected: {
        emit: selectEvent,
      } as SafeAny,
    });
    fireEvent.click(screen.getByText('Chip 1'));
    fireEvent.click(screen.getByText('item 1'));
    expect(screen.getByTestId('ion-dropdown')).toBeInTheDocument();
  });

  it('should reset chip style when clicked outside dropdown', async () => {
    await sut({
      chips: [
        {
          label: 'Chip 1',
          selected: false,
          options: [{ label: 'item 1' }, { label: 'item 2' }],
          multiple: true,
        },
      ],
      selected: {
        emit: selectEvent,
      } as SafeAny,
    });
    fireEvent.click(screen.getByText('Chip 1'));
    fireEvent.click(document.body);
    expect(screen.getByText('Chip 1')).not.toHaveClass('chip-selected');
  });
});
