import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonSimpleMenuComponent } from './simple-menu.component';
import { TabInGroup } from '../core/types/tab-group';
import { fireEvent, screen } from '@testing-library/dom';
import { render } from '@testing-library/angular';
import { SafeAny } from '../utils/safe-any';

const mockOptions: TabInGroup[] = [
  { label: 'Tab 1', selected: false, iconType: 'calendar' },
  { label: 'Tab 2', selected: false, iconType: 'pencil' },
];

const mockProfile = {
  imageUrl: 'url-image',
  name: 'User Name',
};

const mockLogo = {
  src: 'src-logo',
  alt: 'logo-alt',
};

const defaultProps = {
  options: mockOptions,
  profile: mockProfile,
  logo: mockLogo,
};

const sut = async (
  customProps: SafeAny = defaultProps
): Promise<ComponentFixture<IonSimpleMenuComponent>> => {
  const { fixture } = await render(IonSimpleMenuComponent, {
    componentInputs: customProps,
  });
  return fixture;
};

describe('IonSimpleMenuComponent', () => {
  it('should render menu icon', async () => {
    await sut();
    expect(screen.getByTestId('icon-sandwich')).toBeTruthy();
  });

  it('should render menu content when mouse enter in menu icon', async () => {
    await sut();
    const icon = screen.getByTestId('icon-sandwich');
    fireEvent.mouseEnter(icon);
    expect(screen.getByTestId('ion-simple-menu')).toHaveClass(
      'menu-container-opened'
    );
  });

  it('should render logo when informed', async () => {
    await sut();
    const icon = screen.getByTestId('icon-sandwich');
    fireEvent.mouseEnter(icon);
    const logo = screen.getByTestId('logoPhoto');
    expect(logo).toHaveAttribute('src', mockLogo.src);
    expect(logo).toHaveAttribute('alt', mockLogo.alt);
  });

  it('should render profile image when informed', async () => {
    await sut();
    const icon = screen.getByTestId('icon-sandwich');
    fireEvent.mouseEnter(icon);
    const avatar = screen.getByTestId('avatarPhoto');
    expect(avatar).toBeTruthy();
  });

  it('should render profile initials when image is not informed', async () => {
    await sut({ ...defaultProps, profile: { name: 'User Name' } });
    const icon = screen.getByTestId('icon-sandwich');
    fireEvent.mouseEnter(icon);
    const avatar = screen.getByTestId('avatarInitials');
    expect(avatar).toBeTruthy();
  });

  it('should emit selected event when click in option', async () => {
    const fixture = await sut();
    const component = fixture.componentInstance;
    const spy = jest.spyOn(component.selected, 'emit');
    component.changeTab(mockOptions[0]);
    expect(spy).toHaveBeenCalledWith(mockOptions[0]);
  });

  it('should emit logoutClick event when click in logout button', async () => {
    const fixture = await sut();
    const component = fixture.componentInstance;
    const spy = jest.spyOn(component.logoutClick, 'emit');
    component.logout();
    expect(spy).toHaveBeenCalled();
  });
});
