import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { IonIconModule } from '../../icon/icon.module';
import { IonTooltipModule } from './../../tooltip/tooltip.module';
import { IonSidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { IonSidebarGroupComponent } from './sidebar-group.component';

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

const actionMock = jest.fn();

const mockGroup: Partial<IonSidebarGroupComponent> = {
  title: 'Title',
  icon: 'box',
  items: [
    {
      title: 'Item 1',
      icon: 'pencil',
      action: actionMock,
    },
    {
      title: 'Item 2',
      icon: 'working',
      action: actionMock,
    },
  ],
  sidebarClosed: false,
};

const sut = async (
  props: Partial<IonSidebarGroupComponent> = {}
): Promise<void> => {
  await render(IonSidebarGroupComponent, {
    componentProperties: { ...props },
    declarations: [IonSidebarItemComponent],
    imports: [IonIconModule, IonTooltipModule],
  });
};

describe('SidebarGroup', () => {
  beforeEach(async () => {
    await sut(mockGroup);
  });
  afterEach(() => {
    actionMock.mockClear();
  });

  it('should render a sidebar group', () => {
    expect(getByTestId('group')).toBeInTheDocument();
  });
  it('should render a given group title', () => {
    expect(getByTestId('title')).toBeInTheDocument();
    expect(getByTestId('title')).toHaveTextContent(mockGroup.title);
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
    userEvent.click(getByTestId('toggleIcon'));
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
    userEvent.click(getByTestId('firstItem').firstElementChild);
    expect(getByTestId('group')).toHaveClass('sidebar-group--selected');
  });
  it('should render only one item selected at a time', () => {
    const itemOne = getByTestId('firstItem').firstElementChild;
    const itemTwo = getByTestId('secondItem').firstElementChild;
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
    userEvent.click(getByTestId('firstItem').firstElementChild);
    userEvent.click(getByTestId('header'));
    expect(getByTestId('firstItem')).toBeVisible();
    expect(getByTestId('secondItem')).not.toBeVisible();
  });
  it('should call action function when an item is clicked', () => {
    userEvent.click(getByTestId('firstItem').firstElementChild);
    expect(actionMock).toHaveBeenCalledTimes(1);
  });
});
describe('Sidebar Group - with disabled items', () => {
  beforeEach(async () => {
    await sut({
      ...mockGroup,
      items: [
        {
          title: 'Disabled item',
          icon: 'pencil',
          disabled: true,
          action: actionMock,
        },
      ],
    });
  });
  it('should render item disabled', () => {
    expect(getByTestId('firstItem').firstElementChild).toBeDisabled();
  });
});

describe('Sidebar Group - Shrink mode', () => {
  beforeEach(async () => {
    await sut({
      ...mockGroup,
      shrinkMode: true,
      sidebarClosed: true,
    });
  });

  it('should change the icon on hover when the sidebar is shrinked', () => {
    fireEvent.mouseEnter(screen.getByTestId(components.header));
    expect(document.getElementById('ion-icon-box')).toBeFalsy();
    expect(document.getElementById('ion-icon-semi-down')).toBeInTheDocument();
  });
});
