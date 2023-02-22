import { render } from '@testing-library/angular';
import { IonIconComponent } from './icon.component';
import { IonIconProps } from '../core/types/icon';

const sut = async (
  customProps: IonIconProps = { type: 'trash' }
): Promise<HTMLElement> => {
  await render(IonIconComponent, {
    componentProperties: customProps,
  });
  return document.getElementById('ion-icon-' + customProps.type);
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
});
