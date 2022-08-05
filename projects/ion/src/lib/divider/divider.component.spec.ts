/* tslint:disable:no-unused-variable */
import { render, screen } from '@testing-library/angular';
import { DirectionType } from '../core/types';
import { IonDividerComponent, IonDividerProps } from './divider.component';

const ClassType = {
  solid: 'ion-divider-solid',
  dashed: 'ion-divider-dashed',
  text: 'ion-divider-text',
  vertical: 'ion-divider-vertical',
  horizontal: 'ion-divider-horizontal',
};

const defaultDivider: IonDividerProps = {
  type: 'solid',
  direction: 'horizontal',
};

const sut = async (customProps?: IonDividerProps) => {
  await render(IonDividerComponent, {
    componentProperties: customProps || { ...defaultDivider },
  });
  return screen.findByTestId('hr');
};

describe('IonDividerComponent', () => {
  it('should render divider with default', async () => {
    const divider = await sut({});
    expect(divider).toHaveClass(ClassType.solid);
    expect(divider).toHaveClass(ClassType.horizontal);
  });

  it.each(['vertical', 'horizontal'])(
    'should render $s divider',
    async (direction: DirectionType) => {
      const divider = await sut({
        direction: direction,
      });
      expect(divider).toHaveClass(ClassType[direction]);
    }
  );

  it.each(['vertical', 'horizontal'])(
    'should render $s divider dashed',
    async (direction: DirectionType) => {
      const divider = await sut({
        direction: direction,
        type: 'dashed',
      });
      expect(divider).toHaveClass(ClassType[direction]);
      expect(divider).toHaveClass(ClassType.dashed);
    }
  );

  it('should render vertical divider and not show text', async () => {
    const divider = await sut({
      direction: 'vertical',
      type: 'text',
      label: 'Label',
    });
    expect(divider).not.toHaveAttribute('data-content', 'Label');
  });

  it('should render divider with Label', async () => {
    const divider = await sut({
      type: 'text',
      label: 'Label',
    });
    expect(divider).toHaveClass(ClassType.text);
    expect(divider).toHaveAttribute('data-content', 'Label');
  });

  it('should render horizontal divider dashed and not show text', async () => {
    const divider = await sut({
      type: 'dashed',
      label: 'Label',
    });
    expect(divider).not.toHaveAttribute('data-content', 'Label');
  });
});
