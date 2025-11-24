import { fireEvent, render, screen } from '@testing-library/angular';
import { IonAvatarModule } from '../avatar/avatar.module';
import { IonButtonModule } from '../button/button.module';
import { TabInGroup } from '../core/types';
import { SimpleMenuProps } from '../core/types/simple-menu';
import { IonIconModule } from '../icon/icon.module';
import { IonTabGroupModule } from '../tab-group/tab-group.module';
import { SafeAny } from '../utils/safe-any';
import { IonSimpleMenuComponent } from './simple-menu.component';

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

const sut = async (
  customProps: SimpleMenuProps = defaultMenu
): Promise<void> => {
  await render(IonSimpleMenuComponent, {
    componentProperties: customProps,
    imports: [
      IonIconModule,
      IonButtonModule,
      IonTabGroupModule,
      IonAvatarModule,
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

describe('Without Image', () => {
  it('should render avatar initials when the photo is not passed', async () => {
    const withoutImage: SimpleMenuProps = {
      options,
      profile: {
        imageUrl: '',
        name: 'Rocket Raccoon',
      },
      selected: {
        emit: selectEvent,
      } as SafeAny,
      logoutClick: {
        emit: logoutEvent,
      } as SafeAny,
    };
    await sut(withoutImage);
    expect(screen.queryByTestId('avatarPhoto')).not.toBeInTheDocument();
    expect(screen.getByTestId('avatarInitials')).toBeTruthy();
  });
});

describe('With Logo', () => {
  it('should render logo', async () => {
    const withLogoMenu: SimpleMenuProps = {
      logo: {
        src: 'https://logodownload.org/wp-content/uploads/2016/09/vasco-logo-0.png',
        alt: 'Logo de exemplo',
      },
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

    await sut(withLogoMenu);
    expect(screen.queryByTestId('logoPhoto')).toBeInTheDocument();
  });
});

const sleep = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
