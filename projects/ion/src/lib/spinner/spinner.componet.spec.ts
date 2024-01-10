import { render, screen } from '@testing-library/angular';
import { IonSpinnerComponent } from './spinner.component';
import { IonSpinnerColor } from '../core/types';

const colors: IonSpinnerColor[] = ['primary', 'secondary', 'danger'];
const defaultProps: IonSpinnerComponent = { color: 'primary', size: 24 };

const sut = async (
  customProps: IonSpinnerComponent = defaultProps
): Promise<void> => {
  await render(IonSpinnerComponent, {
    componentProperties: customProps,
  });
};
describe('SpinnerComponent', () => {
  it('should render SpinnerComponent', async () => {
    await sut();
    expect(screen.getByTestId('ion-spinner')).toBeTruthy();
  });

  it.each(colors)(
    'should render SpinnerComponent with %s color',
    async (color) => {
      await sut({ ...defaultProps, color });
      expect(screen.getByTestId('ion-spinner')).toHaveClass(
        `ion-spinner ${color}`
      );
    }
  );

  it('should render SpinnerComponent with custom color', async () => {
    const customColor = '#c05bff';
    await sut({ ...defaultProps, customColor });
    expect(screen.getByTestId('ion-spinner')).toHaveStyle({
      'border-left-color': customColor,
    });
  });

  it('should render SpinnerComponent with custom size', async () => {
    const customSize = 48;
    await sut({ ...defaultProps, size: customSize });
    expect(screen.getByTestId('ion-spinner')).toHaveStyle({
      width: `${customSize}px`,
      height: `${customSize}px`,
    });
  });

  it('should not render the text as default', async () => {
    await sut({ ...defaultProps });
    expect(screen.queryByTestId('ion-spinner-text')).not.toBeInTheDocument();
  });

  it('should render the text when informed', async () => {
    await sut({ ...defaultProps, text: 'Carregando...' });
    expect(screen.getByTestId('ion-spinner-text')).toBeVisible();
  });
});
