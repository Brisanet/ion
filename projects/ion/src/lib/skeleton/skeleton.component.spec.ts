import { CommonModule } from '@angular/common';
import { render, screen } from '@testing-library/angular';
import { IonSkeletonComponent } from './skeleton.component';

const defaultProps = {
  variant: 'rect',
  width: 40,
  height: 100,
} as IonSkeletonComponent;

const sut = async (
  customProps: IonSkeletonComponent = defaultProps
): Promise<void> => {
  await render(IonSkeletonComponent, {
    componentProperties: customProps,
    imports: [CommonModule],
  });
};

describe('Skeleton', () => {
  it('should render correctly', async () => {
    await sut();

    const skeleton = screen.getByTestId('ion-skeleton');
    expect(skeleton).toBeVisible();
    expect(skeleton).toHaveClass('skeleton-box');
  });

  it('should render a rectangular with a passed ratio', async () => {
    await sut({
      variant: 'rect',
      width: 100,
      height: 50,
    } as IonSkeletonComponent);

    const skeleton = screen.getByTestId('ion-skeleton');
    expect(skeleton).toHaveStyle('width: 100px; height: 50px');
  });

  it('should works on circular mode', async () => {
    await sut({ variant: 'circular' } as IonSkeletonComponent);

    const skeleton = screen.getByTestId('ion-skeleton');
    expect(skeleton).toHaveStyle('border-radius: 50%');
  });

  it('should accepts a custom border radius', async () => {
    await sut({ variant: 'rect', radius: 12 } as IonSkeletonComponent);

    const skeleton = screen.getByTestId('ion-skeleton');
    expect(skeleton).toHaveStyle('border-radius: 12px');
  });
});
