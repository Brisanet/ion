import { fireEvent, render, screen } from '@testing-library/angular';
import { SafeAny } from '../utils/safe-any';
import { IonChipGroupComponent } from './chip-group.component';
import { FormsModule } from '@angular/forms';
import { ChipSize } from '../core/types';
import { IonChipComponent } from '../chip/chip.component';
import { ChipGroupProps } from '../core/types/chip-group';

const selectEvent = jest.fn();

beforeEach(() => {
  selectEvent.mockClear();
});

const sut = async (
  customProps: Partial<ChipGroupProps> = {}
): Promise<{ element: HTMLElement; event: jest.Mock }> => {
  const defaultChips = [
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

  const props = {
    chips: defaultChips,
    ...customProps,
  };

  const { fixture } = await render(IonChipGroupComponent, {
    componentInputs: {
      ...props,
    },
    imports: [FormsModule, IonChipComponent],
  });
  
  if (props.selected && (props.selected as SafeAny).emit) {
    fixture.componentInstance.selected.subscribe((props.selected as SafeAny).emit);
  } else {
    fixture.componentInstance.selected.subscribe(selectEvent);
  }

  return { element: screen.getByTestId('ion-chip-group'), event: selectEvent };
};

const createMockChips = () => [
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

describe('ChipGroupComponent', () => {
  it('should render component', async () => {
    const { element } = await sut();
    expect(element).toBeTruthy();
  });

  it('should emit chip selected when clicked', async () => {
    const mockChips = createMockChips();
    const { event } = await sut({ chips: mockChips });
    fireEvent.click(screen.getByText(mockChips[0].label));
    expect(event).toHaveBeenCalledWith({
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
      });
      const element = screen.getByTestId('ion-chip');
      expect(element).toHaveClass(`chip-${size}`);
    }
  );

  it('when chipgroup is multiple chip basic should remain selected when other is clicked', async () => {
    const mockChips = createMockChips();
    const { event } = await sut({
      chips: mockChips,
      multiple: true,
    });
    
    // First click
    fireEvent.click(screen.getByText(mockChips[0].label));
    expect(event).toHaveBeenCalledWith({
      label: mockChips[0].label,
      selected: true,
    });

    // Second click on different chip
    fireEvent.click(screen.getByText(mockChips[1].label));
    
    // Check if first chip is still selected
    expect(screen.getAllByTestId('ion-chip')[0]).toHaveClass('chip-selected');
  });

  it('should render chip component disabled', async () => {
    await sut({
      chips: [{ label: 'custom-size' }],
      disabled: true,
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
    const mockChips = createMockChips();
    await sut({ chips: mockChips });
    const option = mockChips[1].options![0].label;
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
    });
    fireEvent.click(screen.getByText('Chip 1'));
    fireEvent.click(document.body);
    expect(screen.getByText('Chip 1')).not.toHaveClass('chip-selected');
  });
});
