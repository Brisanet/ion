import { IonSharedModule } from './../../shared.module';
import { IonNotificationContainerComponent } from './notification.container.component';
import { IonNotificationComponent } from '../component/notification.component';
import { IonNotificationService } from './notification.service';
import { TestBed } from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';
import { fireEvent, screen } from '@testing-library/angular';

const NOTIFICATION_ICONS = {
  success: 'success-icon',
  info: 'info-icon',
  warning: 'warning-icon',
  negative: 'negative-icon',
};

const NOTIFICATION_TYPES = Object.keys(NOTIFICATION_ICONS);

const DEFAULT_NOTIFICATION_OPTIONS = {
  title: 'Titulo Padrão',
  message: 'Mensagem Padrão',
};

@Component({
  template: '<div></div>',
})
class ContainerRefTestComponent {}

@NgModule({
  declarations: [
    ContainerRefTestComponent,
    IonNotificationContainerComponent,
    IonNotificationComponent,
  ],
  imports: [IonSharedModule],
  entryComponents: [
    ContainerRefTestComponent,
    IonNotificationContainerComponent,
    IonNotificationComponent,
  ],
})
class TestModule {}

jest.setTimeout(1000);

describe('NotificationService', () => {
  let notificationService: IonNotificationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
    }).compileComponents();

    notificationService = TestBed.get(IonNotificationService);
  });

  it('should remove a notification', () => {
    notificationService.success(
      DEFAULT_NOTIFICATION_OPTIONS.title,
      DEFAULT_NOTIFICATION_OPTIONS.message,
      { fixed: true }
    );
    const removeNotification = screen.getByTestId('btn-remove');
    fireEvent.click(removeNotification);
    const elements = document.getElementsByTagName('ion-notification');
    expect(elements).toHaveLength(0);
  });

  it('should emit event when a notification is closed', () => {
    const closeEvent = jest.fn();
    notificationService.success(
      DEFAULT_NOTIFICATION_OPTIONS.title,
      DEFAULT_NOTIFICATION_OPTIONS.message,
      { fixed: true },
      closeEvent
    );
    const removeNotification = screen.getByTestId('btn-remove');
    fireEvent.click(removeNotification);
    expect(closeEvent).toHaveBeenCalledTimes(1);
  });

  it('should create a notification', () => {
    notificationService.success(
      DEFAULT_NOTIFICATION_OPTIONS.title,
      DEFAULT_NOTIFICATION_OPTIONS.message
    );
    expect(screen.getByTestId('ion-notification')).toBeTruthy();
  });

  it.each(['title', 'message'])(
    'should render a notification with default %s',
    (key) => {
      expect(
        screen.getByText(DEFAULT_NOTIFICATION_OPTIONS[key])
      ).toBeInTheDocument();
    }
  );
});

describe('NotificationService -> notification types', () => {
  let notificationService: IonNotificationService;

  let currentIndex = 1;

  let notificationsOnScreen = 5;

  const indexToRemove = [1, 2, 0];

  const NOTIFICATIONS_CALLS = {
    success: (): void => {
      notificationService.success('teste', 'teste', {}, () => {
        return true;
      });
    },
    info: (): void => {
      notificationService.info('teste', 'teste', {}, () => {
        return true;
      });
    },
    warning: (): void => {
      notificationService.warning('teste', 'teste', {}, () => {
        return true;
      });
    },
    negative: (): void => {
      notificationService.error('teste', 'teste', {}, () => {
        return true;
      });
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
    }).compileComponents();

    notificationService = TestBed.get(IonNotificationService);
  });

  it.each(NOTIFICATION_TYPES)('should create %s notification', async (type) => {
    NOTIFICATIONS_CALLS[type]();
    const iconType = screen.getAllByTestId('notification-icon');
    expect(iconType[currentIndex]).toHaveClass(NOTIFICATION_ICONS[type]);
    currentIndex += 1;
  });

  it.each(indexToRemove)(
    'should remove multiple notifications',
    async (index) => {
      const elements = document.getElementsByTagName('ion-notification');
      const removeNotification = screen.getAllByTestId('btn-remove');
      fireEvent.click(removeNotification[index]);
      notificationsOnScreen -= 1;
      expect(elements).toHaveLength(notificationsOnScreen);
    }
  );

  it.each(NOTIFICATION_TYPES)(
    'should add ionOnClose subscription when %s notification is created',
    async (type) => {
      notificationService.addCloseEventEmitter = jest.fn();
      NOTIFICATIONS_CALLS[type]();
      expect(notificationService.addCloseEventEmitter).toHaveBeenCalledTimes(1);
    }
  );
});

describe('NotificationService -> notification maxStack', () => {
  let notificationService: IonNotificationService;

  it('should not exceed the maxStack', () => {
    const removeNotification = screen.getAllByTestId('btn-remove');
    removeNotification.forEach((element) => fireEvent.click(element));

    TestBed.configureTestingModule({
      imports: [TestModule],
    }).compileComponents();

    notificationService = TestBed.get(IonNotificationService);

    notificationService.notificationServiceConfig = { maxStack: 2 };
    notificationService.success(
      DEFAULT_NOTIFICATION_OPTIONS.title,
      DEFAULT_NOTIFICATION_OPTIONS.message
    );
    notificationService.error(
      DEFAULT_NOTIFICATION_OPTIONS.title,
      DEFAULT_NOTIFICATION_OPTIONS.message
    );
    notificationService.error(
      DEFAULT_NOTIFICATION_OPTIONS.title,
      DEFAULT_NOTIFICATION_OPTIONS.message
    );
    expect(screen.getAllByTestId('ion-notification').length).toBe(2);
  });
});
