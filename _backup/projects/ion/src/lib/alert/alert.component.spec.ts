import { CommonModule } from '@angular/common';
import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from '@testing-library/angular';
import { StatusType } from '../core/types/status';
import { IonAlertComponent } from './alert.component';
import { IonIconModule } from '../icon/icon.module';
import { IonAlertProps } from '../core/types/alert';
import { AlertCustomBodyComponent } from './mocks/alert-custom-body.component';
import { IonAlertModule } from './alert.module';

const defaultValue: IonAlertProps = {
  message: 'Mensagem padrão',
};

const alertDefaultClass = 'ion-alert';

const alertIDs = {
  alert: 'ion-alert',
  iconStatus: 'status-icon',
  iconClose: 'close-icon',
};

const closableAlert = 'closable-true';

const alertTypes = ['success', 'warning', 'info', 'negative'];

const sut = async (
  customProps: IonAlertProps = defaultValue
): Promise<HTMLElement> => {
  await render(IonAlertComponent, {
    componentProperties: customProps,
    imports: [CommonModule, IonIconModule],
  });
  return screen.findByTestId(alertIDs.alert);
};

const sutAlertWithCustomBody = async (): Promise<
  RenderResult<AlertCustomBodyComponent>
> => {
  return await render(AlertCustomBodyComponent, {
    imports: [CommonModule, IonAlertModule],
    declarations: [AlertCustomBodyComponent],
  });
};

describe('AlertComponent', () => {
  it('Should render alert', async () => {
    expect(await sut()).toHaveClass(alertDefaultClass);
  });

  it('Should render with success icon by default', async () => {
    await sut();
    expect(await screen.findByTestId(alertIDs.iconStatus)).toBeInTheDocument();
  });

  it.each(alertTypes)('Should render %s type', async (type: StatusType) => {
    const element = await sut({ ...defaultValue, type });
    expect(element).toHaveClass(type);
  });

  it('Should render closable alert', async () => {
    const element = await sut({ ...defaultValue, closable: true });
    expect(element).toHaveClass(closableAlert);
  });

  it('should render close icon when is closable', async () => {
    await sut({ ...defaultValue, closable: true });
    expect(await screen.findByTestId(alertIDs.iconClose)).toBeInTheDocument();
  });

  it.each(alertTypes)(
    'Should render closable %s type',
    async (type: StatusType) => {
      const element = await sut({
        ...defaultValue,
        type,
        closable: true,
      });
      expect(element).toHaveClass(type);
      expect(element).toHaveClass(closableAlert);
      expect(await screen.findByTestId(alertIDs.iconClose)).toBeInTheDocument();
    }
  );

  it('Should close alert', async () => {
    const element = await sut({ ...defaultValue, closable: true });
    const icon = await screen.findByTestId(alertIDs.iconClose);
    fireEvent.click(icon);
    expect(screen).not.toContain(element);
  });

  it('should render with a solid background color', async () => {
    const element = await sut(defaultValue);
    expect(element).not.toHaveClass('without-background');
  });

  it('should render without background', async () => {
    const element = await sut({ ...defaultValue, hideBackground: true });
    expect(element).toHaveClass('without-background');
  });

  it('should render with description', async () => {
    const description = 'Testing description';
    const element = await sut({ ...defaultValue, description });
    expect(element).toHaveTextContent(description);
  });

  it('should render with radius', async () => {
    const element = await sut(defaultValue);
    expect(element).not.toHaveClass('no-radius');
  });

  it('should render without radius', async () => {
    const element = await sut({ ...defaultValue, noRadius: true });
    expect(element).toHaveClass('no-radius');
  });

  describe('With a string provided', () => {
    it('Should have an alert message', async () => {
      expect(await sut()).toHaveTextContent(defaultValue.message as string);
    });

    it('Should show the informed message', async () => {
      const label = 'Testing message in Alert';
      const element = await sut({ message: label });
      expect(element).toHaveTextContent(label);
    });
  });

  describe('With a custom body provided', () => {
    beforeEach(async () => {
      await sutAlertWithCustomBody();
    });

    it('should render with the custom body provided', async () => {
      expect(screen.getByTestId('ion-alert-custom-body')).toBeVisible();
    });

    it('should not render the plain message', async () => {
      expect(screen.queryByTestId('ion-alert-message')).toBeNull();
    });
  });
});
