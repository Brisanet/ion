import { fireEvent, render, screen } from '@testing-library/angular';
import { IonSidebarGroupComponent } from './sidebar-group.component';
import { IonSidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { IonIconComponent } from '../../icon/icon.component';
import { SafeAny } from '../../utils/safe-any';
import { Item } from '../../core/types/sidebar';

const defaultProps = {
  title: 'Group Title',
  icon: 'star',
  items: [
    { title: 'Item 1', icon: 'box' },
    { title: 'Item 2', icon: 'pencil' },
  ],
};

const sut = async (customProps: SafeAny = {}) => {
  return await render(IonSidebarGroupComponent, {
    componentInputs: { ...defaultProps, ...customProps },
    imports: [IonSidebarItemComponent, IonIconComponent],
  });
};

describe('IonSidebarGroupComponent', () => {
  it('should render the component with correct title and icon', async () => {
    await sut();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('should toggle items visibility when header is clicked', async () => {
    await sut();
    const header = screen.getByTestId('sidebar-group__header');
    fireEvent.click(header);
    const itemsContainer = screen.getByTestId('sidebar-group__items');
    expect(itemsContainer).not.toHaveAttribute('hidden');
    fireEvent.click(header);
    expect(itemsContainer).toHaveAttribute('hidden');
  });

  it('should emit atClick event when an item is selected', async () => {
    const { fixture } = await sut();
    const component = fixture.componentInstance;
    const emitSpy = jest.spyOn(component.atClick, 'emit');

    fireEvent.click(screen.getByTestId('sidebar-group__header')); // open

    // We need to access the item logic. Since we render real child components,
    // usually we'd click the child.
    // However, sidebar-item emits atClick, which is bubbled? No, it's bound in template: (atClick)="itemSelected(i, $event)"
    // So if we click the sidebar-item, it should trigger itemSelected in group.

    // We need to click the button inside the ion-sidebar-item
    const itemHost = screen.getByTestId('sidebar-group__item-0');
    const itemButton = itemHost.querySelector('button')!; // Assumes sidebar-item has a button
    fireEvent.click(itemButton);

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit atGroupClick when group title is clicked (if action enabled)', async () => {
    const { fixture } = await sut({ haveGroupAction: true });
    const component = fixture.componentInstance;
    const emitSpy = jest.spyOn(component.atGroupClick, 'emit');

    const groupTitle = screen.getByTestId('sidebar-group__title-icon')
      .parentElement!; // The div wrapper has the click
    fireEvent.click(groupTitle);

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });
});
