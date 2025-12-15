import { fireEvent, render, screen } from '@testing-library/angular';
import { TabGroupProps, TabSize } from '../core/types';
import { SafeAny } from '../utils/safe-any';
import { IonTabGroupComponent } from './tab-group.component';

const selectEvent = jest.fn();
const mockTabs = [
  {
    label: 'Tab 1',
    selected: false,
  },
  {
    label: 'Tab 2',
    selected: false,
  },
];

const sut = async (
  customProps: Partial<TabGroupProps> = {}
): Promise<{ element: HTMLElement; event: jest.Mock }> => {
  const defaultProps = {
    tabs: mockTabs,
    direction: 'horizontal' as const,
  };

  await render(IonTabGroupComponent, {
    componentInputs: { ...defaultProps, ...customProps },
    on: {
      selected: selectEvent,
    },
  });
  return { element: screen.getByTestId('ion-tab-group'), event: selectEvent };
};

describe('IonTabGroupComponent', () => {
  beforeEach(() => {
    selectEvent.mockClear();
  });

  it('should render component in horizontal by default', async () => {
    const rendered = await sut();
    expect(rendered.element).toBeInTheDocument();
    const innerDiv = rendered.element.querySelector('div');
    expect(innerDiv).not.toHaveClass('tab-group-column-inner');
    expect(screen.getByText(mockTabs[0].label)).toHaveClass('border-bottom');
  });

  it('should render tabs with border bottom by default', async () => {
    await sut();
    expect(screen.getByText(mockTabs[0].label)).toHaveClass('border-bottom');
  });

  it('should render component in vertical', async () => {
    const rendered = await sut({
      direction: 'vertical',
    });
    const innerDiv = rendered.element.querySelector('div');
    expect(innerDiv).toHaveClass('tab-group-column-inner');
  });

  it('should emit tab selected when clicked', async () => {
    const rendered = await sut();
    fireEvent.click(screen.getByText(mockTabs[0].label));
    expect(rendered.event).toHaveBeenCalledWith({
      label: mockTabs[0].label,
      selected: true,
    });
  });

  it('should has border right when direction is vertical', async () => {
    await sut({
      direction: 'vertical',
    });
    expect(screen.getByText(mockTabs[0].label)).toHaveClass('border-right');
  });

  it('should has border left when left is informed', async () => {
    await sut({
      direction: 'vertical',
      border: 'left',
    });
    expect(screen.getByText(mockTabs[0].label)).toHaveClass('border-left');
  });

  it.each(['sm', 'md', 'lg'])(
    'should render tabs with %s size',
    async (size: string) => {
      await sut({
        direction: 'vertical',
        size: size as TabSize,
      });

      expect(screen.getByText(mockTabs[0].label)).toHaveClass(`tab-${size}`);
    }
  );

  it('should emit selected tab when double clicked', async () => {
    const rendered = await sut();
    fireEvent.click(screen.getByText(mockTabs[1].label));
    fireEvent.click(screen.getByText(mockTabs[1].label));
    expect(rendered.event).toHaveBeenCalledWith({
      label: mockTabs[1].label,
      selected: true,
    });
  });

  it('should validate if the event was issued twice', async () => {
    const tabs = await sut();
    fireEvent.click(screen.getByText(mockTabs[1].label));
    fireEvent.click(screen.getByText(mockTabs[1].label));
    expect(tabs.event).toHaveBeenCalledTimes(2);
  });

  it('should show a tab with badge', async () => {
    const badgeValue = 10;
    await sut({
      tabs: [
        ...mockTabs,
        {
          label: 'Guardians of the galaxy',
          selected: false,
          badge: {
            value: badgeValue,
          },
        },
      ],
    });

    expect(screen.getByTestId('badge-tab')).toBeInTheDocument();
    expect(screen.getByText(badgeValue)).toBeInTheDocument();
  });

  it('should have a disabled tab when informed', async () => {
    const disabledTabLabel = 'disabled tab';
    await sut({
      tabs: [
        ...mockTabs,
        {
          label: disabledTabLabel,
          selected: false,
          disabled: true,
        },
      ],
    });

    expect(screen.getByText(disabledTabLabel)).toBeDisabled();
  });

  it('should apply border top when specified', async () => {
    await sut({
      direction: 'horizontal',
      border: 'top',
    });
    expect(screen.getByText(mockTabs[0].label)).toHaveClass('border-top');
  });

  it('should clear selection from other tabs when selecting a new tab', async () => {
    const tabsWithSelection = [
      { label: 'Tab 1', selected: true },
      { label: 'Tab 2', selected: false },
    ];

    await sut({
      tabs: tabsWithSelection,
    });

    fireEvent.click(screen.getByText('Tab 2'));

    expect(tabsWithSelection[0].selected).toBe(false);
    expect(tabsWithSelection[1].selected).toBe(true);
  });
});
