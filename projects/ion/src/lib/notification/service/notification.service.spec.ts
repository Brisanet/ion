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

const NOTIFICATION_TYPES = ['success', 'info', 'warning', 'negative'];

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
    notificationService.success('Custom', 'Custom', { fixed: true });
    const removeNotification = screen.getByTestId('btn-remove');
    fireEvent.click(removeNotification);
    const elements = document.getElementsByTagName('ion-notification');
    expect(elements).toHaveLength(0);
  });

  it('should remove a notification', () => {
    const closeEvent = jest.fn();
    notificationService.success(
      'Custom',
      'Custom',
      { fixed: true },
      closeEvent
    );
    const removeNotification = screen.getByTestId('btn-remove');
    fireEvent.click(removeNotification);
    expect(closeEvent).toHaveBeenCalledTimes(1);
  });

  it('should create a notification', () => {
    notificationService.success('Teste', 'Teste');
    expect(screen.getByTestId('ion-notification')).toBeTruthy();
  });
});

describe('NotificationService -> notification types', () => {
  let notificationService: IonNotificationService;

  let currentIndex = 1;

  let notificationsOnScreen = 5;

  const indexToRemove = [1, 2, 0];

  const NOTIFICATIONS_CALLS = {
    success: (): void => {
      notificationService.success('teste', 'teste');
    },
    info: (): void => {
      notificationService.info('teste', 'teste');
    },
    warning: (): void => {
      notificationService.warning('teste', 'teste');
    },
    negative: (): void => {
      notificationService.error('teste', 'teste');
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
});
