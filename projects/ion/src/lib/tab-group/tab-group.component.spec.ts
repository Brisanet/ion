import { fireEvent, render, screen } from '@testing-library/angular';
import { TabComponent } from '../tab/tab.component';
import { SafeAny } from '../utils/safe-any';
import { TabGroupComponent, TabGroupProps } from './tab-group.component';

const selectEvent = jest.fn();
const mockTabs = [
  {
    name: 'Tab 1',
    selected: false,
  },
  {
    name: 'Tab 2',
    selected: false,
  },
];

const sut = async (
  customProps: TabGroupProps = {
    tabs: mockTabs,
    alignment: 'horizontal',
    selected: {
      emit: selectEvent,
    } as SafeAny,
  }
) => {
  await render(TabGroupComponent, {
    componentProperties: customProps,
    declarations: [TabComponent],
  });
  return { element: screen.getByTestId('ion-tab-group'), event: selectEvent };
};

describe('TabGroupComponent', () => {
  it('should render component in horizontal by default', async () => {
    const rendered = await sut();
    expect(rendered.element).not.toHaveClass('tab-group-column');
    expect(screen.getByText(mockTabs[0].name)).toHaveClass('border-bottom');
  });

  it('should render tabs with border bottom by default', async () => {
    await sut();
    expect(screen.getByText(mockTabs[0].name)).toHaveClass('border-bottom');
  });

  it('should render component in vertial', async () => {
    const rendered = await sut({
      alignment: 'vertical',
      tabs: mockTabs,
      selected: {
        emit: selectEvent,
      } as SafeAny,
    });
    expect(rendered.element).toHaveClass('tab-group-column');
  });

  it('should emit tab selected when clicked', async () => {
    const rendered = await sut();
    fireEvent.click(screen.getByText(mockTabs[0].name));
    expect(rendered.event).toHaveBeenCalledWith({
      name: mockTabs[0].name,
      selected: true,
    });
  });

  it('should has border right when alignment is vertical', async () => {
    await sut({
      alignment: 'vertical',
      tabs: mockTabs,
      selected: {
        emit: selectEvent,
      } as SafeAny,
    });
    expect(screen.getByText(mockTabs[0].name)).toHaveClass('border-right');
  });
});
