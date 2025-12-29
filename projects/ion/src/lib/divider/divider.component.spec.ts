import { render, screen } from '@testing-library/angular';
import { IonDividerComponent } from './divider.component';
import { DirectionType } from '../core/types';
import { IonDividerProps } from '../core/types/divider';

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

const sut = async (customProps?: IonDividerProps): Promise<HTMLElement> => {
  await render(IonDividerComponent, {
    inputs: customProps || { ...defaultDivider },
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
    'should render %s divider',
    async (direction) => {
      const divider = await sut({
        direction: direction as DirectionType,
      });
      expect(divider).toHaveClass(
        ClassType[direction as keyof typeof ClassType],
      );
    },
  );

  it.each(['vertical', 'horizontal'])(
    'should render %s divider dashed',
    async (direction) => {
      const divider = await sut({
        direction: direction as DirectionType,
        type: 'dashed',
      });
      expect(divider).toHaveClass(
        ClassType[direction as keyof typeof ClassType],
      );
      expect(divider).toHaveClass(ClassType.dashed);
    },
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
    const label = 'I am a divider';
    await sut({
      type: 'text',
      label,
    });
    expect(screen.getByTestId('hr')).toHaveClass(ClassType.text);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('should render horizontal divider dashed and not show text', async () => {
    const divider = await sut({
      type: 'dashed',
      label: 'Label',
    });
    expect(divider).not.toHaveAttribute('data-content', 'Label');
  });
});
