import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { IonIconComponent } from '../../icon/icon.component';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { SidebarGroupComponent } from './sidebar-group.component';

const components = {
  group: 'sidebar-group',
  header: 'sidebar-group__header',
  title: 'sidebar-group__title',
  icon: 'sidebar-group__title-icon',
  toggleIcon: 'sidebar-group__toggle-icon',
  items: 'sidebar-group__items',
  firstItem: 'sidebar-group__item-0',
  secondItem: 'sidebar-group__item-1',
};

const getByTestId = (key: keyof typeof components): HTMLElement => {
  return screen.getByTestId(components[key]);
};

const mockGroup: Partial<SidebarGroupComponent> = {
  title: 'Title',
  icon: 'box',
  items: [
    {
      title: 'Item 1',
      icon: 'pencil',
    },
    {
      title: 'Item 2',
      icon: 'working',
    },
  ],
};

const sut = async (
  props: Partial<SidebarGroupComponent> = {}
): Promise<void> => {
  await render(SidebarGroupComponent, {
    componentProperties: { ...props },
    declarations: [IonIconComponent, SidebarItemComponent],
  });
};

describe('SidebarGroup', () => {
  beforeEach(async () => {
    await sut(mockGroup);
  });

  it('should render a sidebar group', () => {
    expect(getByTestId('group')).toBeInTheDocument();
  });
  it('should render a given group title', () => {
    expect(getByTestId('title')).toBeInTheDocument();
  });
  it('should render a given group icon', () => {
    const icon = document.getElementById(`ion-icon-${mockGroup.icon}`);
    expect(getByTestId('icon')).toContainElement(icon);
  });
  it('should render toggle icon', () => {
    const icon = getByTestId('toggleIcon');
    expect(getByTestId('header')).toContainElement(icon);
  });
  it('should render group unselected by default', () => {
    expect(getByTestId('group')).toHaveClass('sidebar-group');
    expect(getByTestId('group')).not.toHaveClass('sidebar-group--selected');
  });
  it('should not show items by default', () => {
    expect(getByTestId('items')).not.toBeVisible();
  });
  it('should show items when header is clicked', () => {
    userEvent.click(getByTestId('header'));
    expect(getByTestId('items')).toBeVisible();
  });

  describe.each(
    mockGroup.items.map((item, index) => {
      return {
        index,
        ...item,
      };
    })
  )('option $title', ({ title, icon, index }) => {
    let item: HTMLElement;
    beforeEach(() => {
      item = screen.getByTestId(`sidebar-group__item-${index}`);
    });

    it(`should render option with title ${title}`, () => {
      expect(item).toHaveTextContent(title);
    });
    it(`should render option with icon ${icon}`, () => {
      const itemIcon = document.getElementById(`ion-icon-${icon}`);
      expect(item).toContainElement(itemIcon);
    });
  });

  it('should render group selected when an item is clicked', () => {
    userEvent.click(getByTestId('firstItem').children[0]);
    expect(getByTestId('group')).toHaveClass('sidebar-group--selected');
  });
  it('should render only one item selected at a time', () => {
    const itemOne = getByTestId('firstItem').children[0];
    const itemTwo = getByTestId('secondItem').children[0];
    const selectedItemClass = 'ion-sidebar-item--selected';

    userEvent.click(itemOne);
    expect(itemOne).toHaveClass(selectedItemClass);
    expect(itemTwo).not.toHaveClass(selectedItemClass);

    userEvent.click(itemTwo);
    expect(itemOne).not.toHaveClass(selectedItemClass);
    expect(itemTwo).toHaveClass(selectedItemClass);
  });
  it('should show only the selected item when group is closed', () => {
    userEvent.click(getByTestId('header'));
    userEvent.click(getByTestId('firstItem').children[0]);
    userEvent.click(getByTestId('header'));
    expect(getByTestId('firstItem')).toBeVisible();
    expect(getByTestId('secondItem')).not.toBeVisible();
  });
});
