import { render, screen } from '@testing-library/angular';
import { AvatarType } from '../core/types/avatar';
import { SizeType } from '../core/types/size';
import { DefaultImageDirective } from '../defaultImage.directive';
import { IonAvatarComponent } from './avatar.component';
import { IonIconModule } from '../icon/icon.module';

async function sut(
  props: Partial<IonAvatarComponent> = {}
): Promise<HTMLElement> {
  await render(IonAvatarComponent, {
    componentProperties: props,
    providers: [DefaultImageDirective],
    declarations: [DefaultImageDirective],
    imports: [IonIconModule],
  });
  return screen.getByTestId('ion-avatar');
}

describe('Avatar', () => {
  describe('Basics', () => {
    const sizes = ['lg', 'md', 'sm', 'xs'];
    it.each(sizes)('should have size-%s class', async (size: SizeType) => {
      expect(await sut({ size })).toHaveClass(`size-${size}`);
    });
    it('should have default size-md when no size is passed', async () => {
      expect(await sut()).toHaveClass('size-md');
    });
  });
  describe('Initials', () => {
    it('should render correct initials when type is initials', async () => {
      await sut({ type: AvatarType.initials, value: 'Taylor Swift' });
      expect(screen.getByText('TS')).toBeInTheDocument();
    });
    it('should render initials in uppercase', async () => {
      await sut({ type: AvatarType.initials, value: 'beyoncé knowles' });
      expect(screen.getByText('BK')).toBeInTheDocument();
    });
    it('should render two first initials when value have more than two words', async () => {
      await sut({
        type: AvatarType.initials,
        value: 'Stefanni Joanne Angelina Germanotta',
      });
      expect(screen.getByText('SJ')).toBeInTheDocument();
    });
    it('should render -- when no value is provided', async () => {
      await sut({ type: AvatarType.initials });
      expect(screen.getByText('--')).toBeInTheDocument();
    });
    it('should only show initials', async () => {
      await sut({ type: AvatarType.initials, value: 'Taylor Swift' });
      expect(document.getElementById('ion-icon-union')).not.toBeInTheDocument();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
      expect(screen.getByText('TS')).toBeInTheDocument();
    });
  });
  describe('Icon', () => {
    it('should render correct icon when type is icon', async () => {
      await sut({ type: AvatarType.icon });
      expect(document.getElementById('ion-icon-union')).toBeInTheDocument();
    });
  });
  describe('Photo', () => {
    it('should render avatar with image when type is photo', async () => {
      const imageUrl =
        'https://64.media.tumblr.com/40e2174ab5e68b1eabbc3dfc78607cef/c1effc67d5c3a1fd-20/s540x810/9d6ce72fcddf97841e7410a0652dd9d5f018b35d.pnj';
      await sut({
        type: AvatarType.photo,
        image: imageUrl,
      });
      expect(screen.getByRole('img')).toHaveAttribute('src', imageUrl);
    });
  });
  describe('Photo Default', () => {
    it('should render avatar with onErrorImage when type is photo default', async () => {
      await sut({
        type: AvatarType.photo,
        image: 'assets/default.svg',
      });
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        'assets/default.svg'
      );
    });
  });
});
