import { render, screen } from '@testing-library/angular';
import { DefaultImageDirective } from '../defaultImage.directive';
import { IonIconComponent } from '../icon/icon.component';
import { AvatarComponent, SizesType } from './avatar.component';

async function sut(props: Partial<AvatarComponent> = {}) {
  await render(AvatarComponent, {
    componentProperties: props,
    providers: [DefaultImageDirective],
    declarations: [IonIconComponent, DefaultImageDirective],
  });
  return screen.getByTestId('ion-avatar');
}

describe('Avatar', () => {
  describe('Basics', () => {
    const sizes = ['lg', 'md', 'sm', 'xs'];
    it.each(sizes)('should have size-%s class', async (size: SizesType) => {
      expect(await sut({ size })).toHaveClass(`size-${size}`);
    });
    it('should have default size-md when no size is passed', async () => {
      expect(await sut()).toHaveClass('size-md');
    });
  });
  describe('Initials', () => {
    it('should render correct initials when type is initials', async () => {
      await sut({ type: 'initials', value: 'Taylor Swift' });
      expect(screen.getByText('TS')).toBeInTheDocument();
    });
    it('should render initials in uppercase', async () => {
      await sut({ type: 'initials', value: 'beyoncé knowles' });
      expect(screen.getByText('BK')).toBeInTheDocument();
    });
    it('should render two first initials when value have more than two words', async () => {
      await sut({
        type: 'initials',
        value: 'Stefanni Joanne Angelina Germanotta',
      });
      expect(screen.getByText('SJ')).toBeInTheDocument();
    });
    it('should render -- when no value is provided', async () => {
      await sut({ type: 'initials' });
      expect(screen.getByText('--')).toBeInTheDocument();
    });
    it('should only show initials', async () => {
      await sut({ type: 'initials', value: 'Taylor Swift' });
      expect(document.getElementById('ion-icon-union')).not.toBeInTheDocument();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });
  describe('Icon', () => {
    it('should render correct icon when type is icon', async () => {
      await sut({ type: 'icon' });
      expect(document.getElementById('ion-icon-union')).toBeInTheDocument();
    });
  });
  describe('Photo', () => {
    it('should render avatar with image when type is photo', async () => {
      await sut({ type: 'photo', image: 'assets/images/avatar.jpg' });
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        'assets/images/avatar.jpg'
      );
    });
  });
});
