import { CommonModule } from '@angular/common';
import { IonIconComponent } from './../icon/icon.component';
import { render, screen, fireEvent } from '@testing-library/angular';
import { AlertComponent, IonAlertProps, AlertType } from './alert.component';

const defaulValue: IonAlertProps = {
  message: 'Mensagem padrão',
};

const closableAlert = 'closable-true';

const alertTypes = ['success', 'warning', 'info', 'danger'];

const sut = async (customProps?: IonAlertProps) => {
  await render(AlertComponent, {
    componentProperties: customProps || { ...defaulValue },
    declarations: [IonIconComponent],
    imports: [CommonModule],
  });
  return screen.findByTestId('ion-alert');
};

describe('AlertComponent', () => {
  it('Should render alert', async () => {
    const element = await sut();
    expect(element).toHaveClass('ion-alert');
  });

  it('Alert should have default message', async () => {
    const element = await sut();
    expect(element).toHaveTextContent(defaulValue.message);
  });

  it('Should render with icon', async () => {
    const element = await sut();
    const icon = element.querySelectorAll('ion-icon');
    expect(icon.length).toEqual(1);
    expect(icon[0]).toHaveClass('alert-icon');
  });

  it('Alert should show informed message', async () => {
    const label = 'Testing message in Alert';
    const element = await sut({ message: label });
    expect(element).toHaveTextContent(label);
  });

  it.each(alertTypes)(
    'Should render diferent types of alerts',
    async (type: AlertType) => {
      const element = await sut({ ...defaulValue, type: type });
      expect(element).toHaveClass(type);
    }
  );

  it('Should render closable alert', async () => {
    const element = await sut({ ...defaulValue, closable: true });
    expect(element).toHaveClass(closableAlert);
  });

  it('Closable alert should add close icon', async () => {
    const element = await sut({ ...defaulValue, closable: true });
    const icons = element.querySelectorAll('ion-icon');
    expect(icons.length).toEqual(2);
    expect(icons[1]).toHaveClass('close-icon');
  });

  it.each(alertTypes)(
    'Should render closable alerts for each type',
    async (type: AlertType) => {
      const element = await sut({ ...defaulValue, type: type, closable: true });
      const icons = element.querySelectorAll('ion-icon');
      expect(element).toHaveClass(type);
      expect(element).toHaveClass(closableAlert);
      expect(icons.length).toEqual(2);
      expect(icons[1]).toHaveClass('close-icon');
    }
  );

  it('Should close alert', async () => {
    const element = await sut({ ...defaulValue, closable: true });
    const closeIcon = element.getElementsByClassName('close-icon')[0];
    fireEvent.click(closeIcon);
    expect(await screen.findByTestId('ion-alert')).toHaveStyle(
      'display: none;'
    );
  });

  it('Should render alert with custom width', async () => {
    const element = await sut({ ...defaulValue, width: 500 });
    expect(element).toHaveStyle('width: 500px;');
  });

  it('Should render alert with custom height', async () => {
    const element = await sut({ ...defaulValue, height: 100 });
    expect(element).toHaveStyle('height: 100px;');
  });

  it('Should render alert with both height and width custom', async () => {
    const element = await sut({ ...defaulValue, height: 100, width: 500 });
    expect(element).toHaveStyle('height: 100px;');
    expect(element).toHaveStyle('width: 500px;');
  });
});
