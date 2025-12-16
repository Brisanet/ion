import { fireEvent, render, screen } from '@testing-library/angular';
import { IonNotificationComponent } from './notification.component';
import { IonIconComponent } from '../../icon/icon.component';
import { StatusType } from '../../core/types/status';
import { NotificationProps } from '../../core/types/notification';

const defaultNotification = {
  title: 'Editado',
  message: 'cadastro',
  type: 'success' as StatusType,
};

const sut = async (customProps: Partial<NotificationProps> = {}) => {
  return await render(IonNotificationComponent, {
    componentInputs: {
      ...defaultNotification,
      ...customProps,
    },
    imports: [IonIconComponent],
  });
};

describe('IonNotificationComponent', () => {
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
    await sut({ title: 'Editado', message: 'cadastro' });
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
      type: type as StatusType,
    });
    expect(document.getElementById(`ion-icon-${icon}`)).toBeInTheDocument();
    expect(screen.getByTestId('notification-icon')).toHaveClass(`${type}-icon`);
  });

  it('should emit event when call closeNotification function', async () => {
    const ionOnCloseSpy = jest.fn();
    await render(IonNotificationComponent, {
      componentInputs: {
        ...defaultNotification,
        fixed: true,
      },
      on: {
        ionOnClose: ionOnCloseSpy,
      },
    });

    const btnRemove = screen.getByTestId('btn-remove');
    fireEvent.click(btnRemove);
    await sleep(1500); // 1000ms animation + buffer
    expect(ionOnCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('should not auto close when is fixed', async () => {
    const ionOnCloseSpy = jest.fn();
    await render(IonNotificationComponent, {
      componentInputs: {
        ...defaultNotification,
        fixed: true,
      },
      on: {
        ionOnClose: ionOnCloseSpy,
      },
    });
    await sleep(2500);
    // Should NOT have emitted close
    expect(ionOnCloseSpy).not.toHaveBeenCalled();
    // Element should still be there (since parent handles removal)
    expect(screen.getByText(defaultNotification.message)).toBeInTheDocument();
  });
});

describe('Time by words', () => {
  it('should emit close event after calculated time', async () => {
    const ionOnCloseSpy = jest.fn();
    await render(IonNotificationComponent, {
      componentInputs: {
        ...defaultNotification,
        // "word" -> 1 word. 1/3 = 0.33. + 1 = 1.33s -> 1000ms.
        message: 'word',
        fixed: false,
      },
      on: {
        ionOnClose: ionOnCloseSpy,
      },
    });

    await sleep(2500); // 1000ms delay + 1000ms animation + buffer
    expect(ionOnCloseSpy).toHaveBeenCalled();
  });
});

const sleep = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
