import { fireEvent, render, screen } from '@testing-library/angular';
import { AvatarComponent } from '../avatar/avatar.component';
import { BadgeComponent } from '../badge/badge.component';
import { ButtonComponent } from '../button/button.component';
import { DefaultImageDirective } from '../defaultImage.directive';
import { IonIconComponent } from '../icon/icon.component';
import {
  TabGroupComponent,
  TabInGroup,
} from '../tab-group/tab-group.component';
import { TabComponent } from '../tab/tab.component';
import { SafeAny } from '../utils/safe-any';
import { SimpleMenuComponent, SimpleMenuProps } from './simple-menu.component';

const classMenuOpen = 'menu-container-opened';

const options: TabInGroup[] = [
  {
    label: 'Agendamentos',
    iconType: 'calendar',
    selected: false,
  },
  {
    label: 'Recursos',
    iconType: 'pencil',
    selected: false,
  },
];

const selectEvent = jest.fn();
const logoutEvent = jest.fn();

const defaultMenu: SimpleMenuProps = {
  options,
  profile: {
    imageUrl:
      'https://ovicio.com.br/wp-content/uploads/2022/01/20220123-rocket-raccoon-guardians-of-the-galaxy.jpeg',
    name: 'Rocket Raccoon',
  },
  selected: {
    emit: selectEvent,
  } as SafeAny,
  logoutClick: {
    emit: logoutEvent,
  } as SafeAny,
};

const sut = async (customProps: SimpleMenuProps = defaultMenu) => {
  await render(SimpleMenuComponent, {
    componentProperties: customProps,
    declarations: [
      IonIconComponent,
      TabGroupComponent,
      TabComponent,
      ButtonComponent,
      BadgeComponent,
      AvatarComponent,
      DefaultImageDirective,
    ],
  });
};

describe('SimpleMenu', () => {
  beforeEach(async () => {
    await sut();
  });

  it('should render menu icon to open', async () => {
    expect(document.getElementById('ion-icon-sandwich')).toBeInTheDocument();
  });
  it.each(options)(
    'should render $label option in menu',
    async (option: TabInGroup) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    }
  );

  it('should render profile image', async () => {
    expect(screen.getByTestId('ion-avatar')).toBeInTheDocument();
  });

  it('should render profile name', async () => {
    expect(screen.getByText(defaultMenu.profile.name)).toBeInTheDocument();
  });

  it('should render logout button', async () => {
    expect(screen.getByText('Sair')).toBeInTheDocument();
  });

  it('should render the menu hiden by default', async () => {
    expect(screen.getByTestId('ion-simple-menu')).not.toHaveClass(
      classMenuOpen
    );
  });

  it('should show menu when mouse enter in menu icon', async () => {
    fireEvent.mouseEnter(screen.getByTestId('icon-sandwich'));
    expect(screen.getByTestId('ion-simple-menu')).toHaveClass(classMenuOpen);
  });

  it('should hide menu when mouse leave', async () => {
    fireEvent.mouseEnter(screen.getByTestId('icon-sandwich'));
    await sleep(1000);

    fireEvent.mouseLeave(screen.getByTestId('icon-sandwich'));
    await sleep(2000);

    expect(screen.getByTestId('ion-simple-menu')).toHaveClass('menu-container');
  });

  it('should emit event when option be selected', async () => {
    const optionToSelect = options[0];
    fireEvent.click(screen.getByText(optionToSelect.label));
    expect(selectEvent).toHaveBeenCalledWith(optionToSelect);
  });

  it('should emit event when logout button is clicked', async () => {
    fireEvent.click(screen.getByText('Sair'));
    expect(logoutEvent).toHaveBeenCalled();
  });

  afterEach(() => {
    selectEvent.mockClear();
    logoutEvent.mockClear();
  });
});

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
