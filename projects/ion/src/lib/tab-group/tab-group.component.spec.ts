import { fireEvent, render, screen } from '@testing-library/angular';
import { IonTabGroupComponent } from './tab-group.component';
import { TabGroupProps, TabInGroup } from '../core/types/tab-group';
import { TabSize } from '../core/types/tab';
import { IonIconComponent } from '../icon/icon.component';
import { IonBadgeComponent } from '../badge/badge.component';
import { IonTabComponent } from '../tab/tab.component';
import { SafeAny } from '../utils/safe-any';

const selectEvent = jest.fn();
const mockTabs: TabInGroup[] = [
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
  customProps: Partial<TabGroupProps> = {
    tabs: mockTabs,
    direction: 'horizontal',
  }
) => {
  const { tabs, size, ...rest } = customProps;
  await render(IonTabGroupComponent, {
    componentProperties: {
      ...rest,
      selected: {
        emit: selectEvent,
      } as SafeAny,
    },
    componentInputs: {
      tabs: tabs || mockTabs,
      size: size || 'sm',
    },
    imports: [IonIconComponent, IonBadgeComponent, IonTabComponent],
  });
  return { element: screen.getByTestId('ion-tab-group'), event: selectEvent };
};

describe('IonTabGroupComponent', () => {
  it('should render component in horizontal by default', async () => {
    const rendered = await sut();
    expect(rendered.element.firstElementChild).not.toHaveClass('tab-group-column-inner');
    expect(screen.getByText(mockTabs[0].label).closest('button')).toHaveClass('border-bottom');
  });

  it('should render tabs with border bottom by default', async () => {
    await sut();
    expect(screen.getByText(mockTabs[0].label).closest('button')).toHaveClass('border-bottom');
  });

  it('should render component in vertical', async () => {
    const rendered = await sut({
      direction: 'vertical',
      tabs: mockTabs,
    });
    expect(rendered.element.firstElementChild).toHaveClass(
      'tab-group-column-inner'
    );
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
      tabs: mockTabs,
    });
    expect(screen.getByText(mockTabs[0].label).closest('button')).toHaveClass('border-right');
  });

  it('should has border left when left is informed', async () => {
    await sut({
      direction: 'vertical',
      border: 'left',
      tabs: mockTabs,
    });
    expect(screen.getByText(mockTabs[0].label).closest('button')).toHaveClass('border-left');
  });

  it.each(['sm', 'md', 'lg'])(
    'should render tabs with %s size',
    async (size: string) => {
      await sut({
        direction: 'vertical',
        tabs: mockTabs,
        size: size as TabSize,
      });

      expect(screen.getByText(mockTabs[0].label).closest('button')).toHaveClass(`tab-${size}`);
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
    selectEvent.mockClear();
    const tabs = await sut();
    fireEvent.click(screen.getByText(mockTabs[1].label));
    fireEvent.click(screen.getByText(mockTabs[1].label));
    expect(tabs.event).toHaveBeenCalledTimes(2);
  });

  it('should show a tab with badge', async () => {
    const badgeValue = 10;
    await sut({
      direction: 'vertical',
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
      direction: 'horizontal',
      tabs: [
        ...mockTabs,
        {
          label: disabledTabLabel,
          selected: false,
          disabled: true,
        },
      ],
    });

    expect(screen.getByText(disabledTabLabel).closest('button')).toBeDisabled();
  });
});
