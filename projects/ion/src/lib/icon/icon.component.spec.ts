import { render, screen } from '@testing-library/angular';
import { IconType, IonIconComponent, IonIconProps } from './icon.component';

const sut = async (customProps?: IonIconProps) => {
  await render(IonIconComponent, {
    componentProperties: customProps || {
      type: 'pencil',
    },
  });
};

describe('IonIconComponent', () => {
  it('should render icon with default size', async () => {
    await sut();
    const defaultSize = '24';
    const svgElement = screen.getByTestId('ion-icon-svg');
    expect(svgElement).toBeTruthy();
    expect(svgElement).toHaveAttribute('width', defaultSize);
  });

  // it('should render icon with default color', async () => {
  //   await sut();
  //   expect(screen.getByTestId('ion-icon-svg')).toHaveAttribute('fill', 'black');
  // });

  // it('should render icon with custom size', async () => {
  //   const size = 60;
  //   await sut({ type: 'pencil', size });
  //   expect(screen.getByTestId('ion-icon-svg')).toHaveAttribute(
  //     'width',
  //     `${size}`
  //   );
  // });

  // it('should render icon with custom size', async () => {
  //   const color = 'red';
  //   await sut({ type: 'pencil', color });
  //   expect(screen.getByTestId('ion-icon-svg')).toHaveAttribute(
  //     'fill',
  //     `${color}`
  //   );
  // });
});
