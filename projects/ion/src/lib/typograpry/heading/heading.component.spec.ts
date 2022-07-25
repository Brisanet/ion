import { render, screen } from '@testing-library/angular';
import {
  colorScheme,
  HeadingComponent,
  HeadingSize,
  HeadingType,
  HeadingWeight,
} from './heading.component';

type HeadingProps = {
  text: string;
  type: HeadingType;
  weight?: HeadingWeight;
  colorScheme?: colorScheme;
  size?: HeadingSize;
};

const sut = async (customProps: HeadingProps) => {
  await render(HeadingComponent, {
    componentProperties: customProps,
  });
};
describe('HeadingComponent', () => {
  it('should render with default props', async () => {
    await sut({ text: 'default', type: 'h1' });
    const elementRendered = screen.getByTestId('ion-heading');
    expect(elementRendered).toBeTruthy();
  });
  it('should validate the text', async () => {
    await sut({ text: 'default', type: 'h1' });
    const elementRendered = screen.getByTestId('ion-heading');
    expect(elementRendered).toHaveTextContent('default');
  });
  it('should render with the default class', async () => {
    await sut({ text: 'default', type: 'h1' });
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
