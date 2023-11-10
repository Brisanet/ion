import { render, screen } from '@testing-library/angular';
import { IonIconComponent } from './icon.component';
import { Highlight, IonIconProps } from '../core/types/icon';

const sut = async (
  customProps: IonIconProps = { type: 'trash' }
): Promise<HTMLElement> => {
  await render(IonIconComponent, {
    componentProperties: customProps,
  });
  return document.getElementById('ion-icon-' + customProps.type);
};

const iconSizes = {
  sm: 16,
  md: 24,
};

describe('IonIconComponent', () => {
  it('should render a correct icon', async () => {
    await sut({ type: 'pencil' });
    const elementRendered = document.getElementById('ion-icon-pencil');
    expect(elementRendered).toBeTruthy();
  });

  it('should render icon with default size', async () => {
    const svgElement = await sut();
    const defaultSize = '24px';
    expect(svgElement.getAttribute('height')).toBe(defaultSize);
    expect(svgElement.getAttribute('width')).toBe(defaultSize);
  });

  it('should render icon with default color', async () => {
    const defaultColor = '#282b33';
    expect((await sut()).getAttribute('fill')).toBe(defaultColor);
  });

  it('should render icon with custom size', async () => {
    const size = 60;
    const svgElement = await sut({ type: 'trash', size });
    expect(svgElement.getAttribute('width')).toBe(`${size}px`);
  });

  it('should render icon with custom color', async () => {
    const color = 'red';
    const svgElement = await sut({ type: 'trash', color });
    expect(svgElement.getAttribute('fill')).toBe(color);
  });

  describe('IonIconComponent - With Simple Highlight', () => {
    it('should render the outside circle with double the icon size and the color with a 10% transparency', async () => {
      await sut({
        type: 'box',
        color: '#FF0016',
        size: iconSizes.sm,
        highlight: Highlight.SIMPLE,
      });

      const containerWidth = screen.getByTestId('outside-container');

      expect(containerWidth).toHaveAttribute(
        'style',
        `background-color: rgba(255, 0, 22, 0.102); width: ${
          iconSizes.sm * 2
        }px; height: ${iconSizes.sm * 2}px;`
      );
    });
  });

  describe('IonIconComponent - With Double Highlight', () => {
    it('should render the outer circle with the right proportion when the icon size is smaller than md', async () => {
      await sut({
        type: 'left',
        color: '#FF0016',
        size: iconSizes.sm,
        highlight: Highlight.DOUBLE,
      });

      const containerWidth = screen.getByTestId('outside-container');

      expect(containerWidth).toHaveAttribute(
        'style',
        `background-color: rgba(255, 0, 22, 0.102); width: ${
          iconSizes.sm * 2.5
        }px; height: ${iconSizes.sm * 2.5}px;`
      );
    });

    it('should render the outer circle with the right proportion when the icon size is at least md', async () => {
      await sut({
        type: 'box',
        color: '#FF0016',
        size: iconSizes.md,
        highlight: Highlight.DOUBLE,
      });

      const containerWidth = screen.getByTestId('outside-container');

      expect(containerWidth).toHaveAttribute(
        'style',
        `background-color: rgba(255, 0, 22, 0.102); width: ${
          iconSizes.md * 2.25
        }px; height: ${iconSizes.md * 2.25}px;`
      );
    });

    it('should render the inner circle with the right proportion and the color with 25% trasparency when the icon size is smaller than md', async () => {
      await sut({
        type: 'left',
        color: '#FF0016',
        size: iconSizes.sm,
        highlight: Highlight.DOUBLE,
      });

      const containerWidth = screen.getByTestId('inner-container');

      expect(containerWidth).toHaveAttribute(
        'style',
        `background-color: rgba(255, 0, 22, 0.251); width: ${
          iconSizes.sm * 1.75
        }px; height: ${iconSizes.sm * 1.75}px;`
      );
    });

    it('should render the inner circle with the right proportion and the color with 25% trasparency when the icon size is at least md', async () => {
      await sut({
        type: 'box',
        color: '#FF0016',
        size: iconSizes.md,
        highlight: Highlight.DOUBLE,
      });

      const containerWidth = screen.getByTestId('inner-container');

      expect(containerWidth).toHaveAttribute(
        'style',
        `background-color: rgba(255, 0, 22, 0.251); width: ${
          iconSizes.md * 1.5
        }px; height: ${iconSizes.md * 1.5}px;`
      );
    });
  });
});
