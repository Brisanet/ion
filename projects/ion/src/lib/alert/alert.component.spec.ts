import { CommonModule } from '@angular/common';
import { IonIconComponent } from './../icon/icon.component';
import { render, screen, fireEvent } from '@testing-library/angular';
import { AlertComponent, IonAlertProps } from './alert.component';
import { StatusType } from '../core/types/status';

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

const sut = async (customProps: IonAlertProps = defaultValue) => {
  await render(AlertComponent, {
    componentProperties: customProps,
    declarations: [IonIconComponent],
    imports: [CommonModule],
  });
  return screen.findByTestId(alertIDs.alert);
};

describe('AlertComponent', () => {
  it('Should render alert', async () => {
    expect(await sut()).toHaveClass(alertDefaultClass);
  });

  it('Should have an alert message', async () => {
    expect(await sut()).toHaveTextContent(defaultValue.message);
  });

  it('Should render with success icon by default', async () => {
    await sut();
    expect(await screen.findByTestId(alertIDs.iconStatus)).toBeInTheDocument();
  });

  it('Should show the informed message', async () => {
    const label = 'Testing message in Alert';
    const element = await sut({ message: label });
    expect(element).toHaveTextContent(label);
  });

  it.each(alertTypes)('Should render %s type', async (type: StatusType) => {
    const element = await sut({ ...defaultValue, type: type });
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
        type: type,
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
});
