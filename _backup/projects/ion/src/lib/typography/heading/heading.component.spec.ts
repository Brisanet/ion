import { render, screen } from '@testing-library/angular';
import {} from '../../core/types';
import { IonHeadingComponent } from './heading.component';
import {
  HeadingType,
  HeadingWeight,
  ColorScheme,
  HeadingSize,
} from '../../core/types/typography';

type HeadingProps = {
  text: string;
  type: HeadingType;
  weight?: HeadingWeight;
  colorScheme?: ColorScheme;
  size?: HeadingSize;
};

const sut = async (customProps?: HeadingProps): Promise<void> => {
  await render(IonHeadingComponent, {
    componentProperties: customProps || { text: 'default', type: 'h1' },
  });
};
describe('IonHeadingComponent', () => {
  it('should render with default props', async () => {
    await sut();
    const elementRendered = screen.getByTestId('ion-heading');
    expect(elementRendered).toBeTruthy();
  });
  it('should validate the text', async () => {
    await sut();
    const elementRendered = screen.getByTestId('ion-heading');
    expect(elementRendered).toHaveTextContent('default');
  });
  it('should render with the default class', async () => {
    await sut();
    const elementRendered = screen.getByTestId('ion-heading');
    expect(elementRendered).toHaveClass('color-primary');
    expect(elementRendered).toHaveClass('font-weight-medium');
    expect(elementRendered).toHaveClass('font-size-normal');
  });
  it('should validate the created type', async () => {
    await sut({ text: 'default', type: 'h2' });
    const elementRendered = screen.getByTestId('ion-heading');
    expect(elementRendered).toHaveAttribute('id', 'h2');
  });

  it('should validate custom color scheme', async () => {
    await sut({ text: 'default', type: 'h2', colorScheme: 'secondary' });
    const elementRendered = screen.getByTestId('ion-heading');
    expect(elementRendered).toHaveClass('color-secondary');
  });

  it('should validate custom font weight', async () => {
    await sut({ text: 'default', type: 'h4', weight: 'bold' });
    const elementRendered = screen.getByTestId('ion-heading');
    expect(elementRendered).toHaveClass('font-weight-bold');
  });
  it('should validate custom font size', async () => {
    await sut({ text: 'default', type: 'h3', size: 'small' });
    const elementRendered = screen.getByTestId('ion-heading');
    expect(elementRendered).toHaveClass('font-size-small');
  });
});
