import { render } from '@testing-library/angular';
import { IonIconComponent, IonIconProps } from './icon.component';

const sut = async (customProps?: IonIconProps): Promise<HTMLElement> => {
  let type = 'trash';

  await render(IonIconComponent, {
    componentProperties: customProps || {
      type: 'trash',
    },
  });
  customProps && (type = customProps.type);
  return document.getElementById('ion-icon-' + type);
};

describe('IonIconComponent', () => {
  it('should render a correct icon', async () => {
    await sut({ type: 'pencil' });
    const elementRendered = document.getElementById('ion-icon-pencil');
    expect(elementRendered).toBeTruthy();
  });

  it('should render icon with default size', async () => {
    const svgElement = await sut();
    const defaultSize = '24';
    expect(svgElement.getAttribute('height')).toBe(defaultSize);
    expect(svgElement.getAttribute('width')).toBe(defaultSize);
  });

  it('should render icon with default color', async () => {
    expect((await sut()).getAttribute('fill')).toBe('black');
  });

  it('should render icon with custom size', async () => {
    const size = 60;
    const svgElement = await sut({ type: 'trash', size });
    expect(svgElement.getAttribute('width')).toBe(`${size}`);
  });

  it('should render icon with custom color', async () => {
    const color = 'red';
    const svgElement = await sut({ type: 'trash', color });
    expect(svgElement.getAttribute('fill')).toBe(`${color}`);
  });
});
