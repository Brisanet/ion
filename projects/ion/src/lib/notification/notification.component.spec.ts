import { fireEvent, render, screen } from '@testing-library/angular';
import { IonIconComponent } from '../icon/icon.component';
import {
  NotificationComponent,
  NotificationProps,
  NotificationType,
} from './notification.component';

const defaultNotification = {
  title: 'Editado',
  message: 'cadastro',
  type: 'success' as NotificationType,
};

const sut = async (customProps: NotificationProps = defaultNotification) => {
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
    expect(document.getElementById(`ion-icon-close`)).toBeInTheDocument();
  });

  it('should render success icon by default', async () => {
    await sut();
    expect(document.getElementById('ion-icon-check-solid')).toBeInTheDocument();
  });

  it('should render a custom icon', async () => {
    const icon = 'pencil';
    await sut({
      ...defaultNotification,
      icon,
    });
    expect(document.getElementById(`ion-icon-${icon}`)).toBeInTheDocument();
  });

  it('should render a custom icon in gray scale', async () => {
    const icon = 'star-solid';
    await sut({
      ...defaultNotification,
      icon,
    });
    expect(screen.getByTestId('notification-icon')).toHaveAttribute(
      'class',
      'default-icon'
    );
  });

  it.each([
    {
      type: 'success',
      icon: 'check-solid',
    },
    {
      type: 'info',
      icon: 'info-solid',
    },
    {
      type: 'warning',
      icon: 'exclamation-solid',
    },
    {
      type: 'negative',
      icon: 'close-solid',
    },
  ])('should render $type class and $icon icon', async ({ type, icon }) => {
    await sut({
      ...defaultNotification,
      type: type as NotificationType,
    });
    expect(document.getElementById(`ion-icon-${icon}`)).toBeInTheDocument();
    expect(screen.getByTestId('notification-icon')).toHaveClass(`${type}-icon`);
  });

  it.each(['title', 'message'])(
    'should remove %s notification of screen',
    async (title) => {
      await sut();
      const btnRemove = screen.getByTestId('btn-remove');
      fireEvent.click(btnRemove);
      expect(screen.queryAllByText(defaultNotification[title])).toHaveLength(0);
    }
  );

  describe('Time by words', () => {
    it('should remove component after 2s', async () => {
      await sut();
      await sleep(1000);
      expect(screen.queryAllByText(defaultNotification.message)).toHaveLength(
        0
      );
    });

    it('should not remove the component when on mouse enter', async () => {
      await sut();
      const notificationIcon = screen.getByTestId('ion-notification');
      fireEvent.mouseEnter(notificationIcon);
      await sleep(1000);
      expect(screen.queryAllByText(defaultNotification.message)).toHaveLength(
        1
      );
    });
  });
});

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
