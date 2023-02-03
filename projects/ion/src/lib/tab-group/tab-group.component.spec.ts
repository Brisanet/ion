import { fireEvent, render, screen } from '@testing-library/angular';
import { SafeAny } from '../utils/safe-any';
import { IonTabGroupComponent, TabGroupProps } from './tab-group.component';
import { IonIconModule } from '../icon/icon.module';
import { IonBadgeModule } from '../badge/badge.module';
import { IonTabModule } from '../tab/tab.module';
import { TabSize } from '../tab/tab.component';

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
  customProps: TabGroupProps = {
    tabs: mockTabs,
    direction: 'horizontal',
    selected: {
      emit: selectEvent,
    } as SafeAny,
  }
): Promise<{ element: HTMLElement; event: jest.Mock }> => {
  await render(IonTabGroupComponent, {
    componentProperties: customProps,
    imports: [IonIconModule, IonBadgeModule, IonTabModule],
  });
  return { element: screen.getByTestId('ion-tab-group'), event: selectEvent };
};

describe('IonTabGroupComponent', () => {
  it('should render component in horizontal by default', async () => {
    const rendered = await sut();
    expect(rendered.element).not.toHaveClass('tab-group-column-inner');
    expect(screen.getByText(mockTabs[0].label)).toHaveClass('border-bottom');
  });

  it('should render tabs with border bottom by default', async () => {
    await sut();
    expect(screen.getByText(mockTabs[0].label)).toHaveClass('border-bottom');
  });

  it('should render component in vertical', async () => {
    const rendered = await sut({
      direction: 'vertical',
      tabs: mockTabs,
      selected: {
        emit: selectEvent,
      } as SafeAny,
    });
    expect(rendered.element.childNodes[0]).toHaveClass(
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
      selected: {
        emit: selectEvent,
      } as SafeAny,
    });
    expect(screen.getByText(mockTabs[0].label)).toHaveClass('border-right');
  });

  it('should has border left when left is informed', async () => {
    await sut({
      direction: 'vertical',
      border: 'left',
      tabs: mockTabs,
      selected: {
        emit: selectEvent,
      } as SafeAny,
    });
    expect(screen.getByText(mockTabs[0].label)).toHaveClass('border-left');
  });

  it.each(['sm', 'md', 'lg'])(
    'should render tabs with %s size',
    async (size: string) => {
      await sut({
        direction: 'vertical',
        tabs: mockTabs,
        size: size as TabSize,
        selected: {
          emit: selectEvent,
        } as SafeAny,
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
    selectEvent.mockClear();
    const tabs = await sut();
    fireEvent.click(screen.getByText(mockTabs[1].label));
    fireEvent.click(screen.getByText(mockTabs[1].label));
    expect(tabs.event).toHaveBeenCalledTimes(2);
  });
});
