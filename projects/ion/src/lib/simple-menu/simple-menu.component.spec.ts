import { render, screen } from '@testing-library/angular';
import { TabInGroup } from 'ion/public-api';
import { AvatarComponent } from '../avatar/avatar.component';
import { ButtonComponent } from '../button/button.component';
import { DefaultImageDirective } from '../defaultImage.directive';
import { IonIconComponent } from '../icon/icon.component';
import { TabGroupComponent } from '../tab-group/tab-group.component';
import { TabComponent } from '../tab/tab.component';
import { SimpleMenuComponent, SimpleMenuProps } from './simple-menu.component';

const options: TabInGroup[] = [
  {
    label: 'ssss',
    iconType: 'calendar',
    selected: false,
  },
  {
    label: 'Recursos',
    iconType: 'pencil',
    selected: false,
  },
];

const defaultMenu: SimpleMenuProps = {
  options,
  profile: {
    imageUrl:
      'https://ovicio.com.br/wp-content/uploads/2022/01/20220123-rocket-raccoon-guardians-of-the-galaxy.jpeg',
    name: 'Rocket Raccoon',
  },
};

const sut = async (customProps: SimpleMenuProps = defaultMenu) => {
  await render(SimpleMenuComponent, {
    componentProperties: customProps,
    declarations: [
      IonIconComponent,
      TabGroupComponent,
      TabComponent,
      ButtonComponent,
      AvatarComponent,
      DefaultImageDirective,
    ],
  });
};

describe('SimpleMenu', () => {
  it('should render menu icon to open', async () => {
    await sut();
    expect(document.getElementById('ion-icon-sandwich')).toBeInTheDocument();
  });
  it.each(options)(
    'should render $label option in menu',
    async (option: TabInGroup) => {
      await sut();
      expect(screen.getByText(option.label)).toBeInTheDocument();
    }
  );

  it('should render profile image', async () => {
    await sut();
    expect(screen.getByTestId('ion-avatar')).toBeInTheDocument();
  });

  it('should render profile name', async () => {
    await sut();
    expect(screen.getByText(defaultMenu.profile.name)).toBeInTheDocument();
  });

  it('should render logout button', async () => {
    await sut();
    expect(screen.getByText('Sair')).toBeInTheDocument();
  });
});
