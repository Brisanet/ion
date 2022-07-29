/* tslint:disable:no-unused-variable */
import { render, screen } from '@testing-library/angular';
import { DividerComponent, IonDividerProps } from './divider.component';

const ClassType = {
  solid: 'ion-divider-solid',
  dashed: 'ion-divider-dashed',
  text: 'ion-divider-text',
  vertical: 'ion-divider-vertical',
  horizontal: 'ion-divider-horizontal',
};

const sut = async (customProps?: IonDividerProps) => {
  await render(DividerComponent, {
    componentProperties: customProps,
  });
  return screen.findByTestId('hr');
};

describe('DividerComponent', () => {
  it('should render divider with default', async () => {
    const divider = await sut({});
    expect(divider).toHaveClass(ClassType['solid']);
    expect(divider).toHaveClass(ClassType['horizontal']);
  });

  it('should render vertical divider', async () => {
    const divider = await sut({
      orientation: 'vertical',
    });
    expect(divider).toHaveClass(ClassType['vertical']);
  });

  it('should render vertical divider and not show text', async () => {
    const divider = await sut({
      orientation: 'vertical',
      type: 'text',
      label: 'Label',
    });
    expect(divider).not.toHaveAttribute('data-content', 'Label');
  });

  it('should render vertical divider dashed', async () => {
    const divider = await sut({
      orientation: 'vertical',
      type: 'dashed',
    });
    expect(divider).toHaveClass(ClassType['vertical']);
    expect(divider).toHaveClass(ClassType['dashed']);
  });

  it('should render divider with Label', async () => {
    const divider = await sut({
      type: 'text',
      label: 'Label',
    });
    expect(divider).toHaveClass(ClassType['text']);
    expect(divider).toHaveAttribute('data-content', 'Label');
  });

  it('should render horizontal divider dashed', async () => {
    const divider = await sut({
      type: 'dashed',
    });
    expect(divider).toHaveClass(ClassType['dashed']);
  });

  it('should render horizontal divider dashed and not show text', async () => {
    const divider = await sut({
      type: 'dashed',
      label: 'Label',
    });
    expect(divider).not.toHaveAttribute('data-content', 'Label');
  });
});
