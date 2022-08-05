import { render, screen } from '@testing-library/angular';
import { IonIconComponent } from '../icon/icon.component';
import { NotificationComponent } from './notification.component';

const defaultNotification = {
  title: 'title',
  message: 'message',
  type: 'success',
};

const sut = async (
  customProps: NotificationComponent = defaultNotification
) => {
  await render(NotificationComponent, {
    componentProperties: customProps,
    declarations: [IonIconComponent],
  });
};

describe('NotificationComponent', () => {
  it('should show title', async () => {
    await sut();
    expect(screen.getByText(defaultNotification.title)).toBeInTheDocument();
  });

  it('should show message', async () => {
    await sut();
    expect(screen.getByText(defaultNotification.message)).toBeInTheDocument();
  });

  it('should render close icon', async () => {
    await sut();
    expect(document.getElementById(`ion-icon-trash`)).toBeInTheDocument();
  });

  it('should render custom icon', async () => {
    const icon = 'trash';
    await sut({
      ...defaultNotification,
      icon,
    });
    expect(document.getElementById(`ion-icon-${icon}`)).toBeInTheDocument();
  });
});
