import { render, screen } from '@testing-library/angular';
import { IonSkeletonComponent } from './skeleton.component';
import { SkeletonVariants } from '../core/types/skeleton';

const defaultProps = {
  variant: 'rect' as SkeletonVariants,
  width: 40,
  height: 100,
};

const sut = async (
  customProps: Partial<IonSkeletonComponent> | { [key: string]: any } = defaultProps
): Promise<void> => {
  await render(IonSkeletonComponent, {
    inputs: customProps,
  });
};

describe('IonSkeletonComponent', () => {
  const getSkeleton = (): HTMLElement => screen.getByTestId('ion-skeleton');

  it('should render correctly', async () => {
    await sut();
    expect(getSkeleton()).toHaveClass('skeleton-box');
  });

  it('should render a rectangular with a passed ratio', async () => {
    await sut({
      variant: 'rect',
      width: 100,
      height: 50,
    });

    expect(getSkeleton()).toHaveStyle('width: 100px');
    expect(getSkeleton()).toHaveStyle('height: 50px');
  });

  it('should render a rectangular with a percentage width and height', async () => {
    await sut({
      variant: 'rect',
      width: '100%',
      height: '50%',
    });

    expect(getSkeleton()).toHaveStyle('width: 100%');
    expect(getSkeleton()).toHaveStyle('height: 50%');
  });

  it('should works on circular mode', async () => {
    await sut({ variant: 'circular' });
    expect(getSkeleton()).toHaveStyle('border-radius: 50%');
  });

  it('should accepts a custom border radius', async () => {
    await sut({ variant: 'rect', radius: 12 });
    expect(getSkeleton()).toHaveStyle('border-radius: 12px');
  });

  it('should render a skeleton with a percentage radius', async () => {
    await sut({ variant: 'rect', radius: '25%' });
    expect(getSkeleton()).toHaveStyle('border-radius: 25%');
  });
});
