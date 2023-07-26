import { IonSharedModule } from './../../shared.module';
import { IonNotificationContainerComponent } from './notification.container.component';
import { IonNotificationComponent } from '../component/notification.component';
import { IonNotificationService } from './notification.service';
import { TestBed } from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';
import { fireEvent, screen } from '@testing-library/angular';

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

  it('should custom notification', () => {
    notificationService.success('Custom', 'Custom', { fixed: true });
    const removeNotification = screen.getByTestId('btn-remove');
    fireEvent.click(removeNotification);
    const elements = document.getElementsByTagName('ion-notification');
    expect(elements).toHaveLength(0);
  });

  it('should create a notification', () => {
    notificationService.success('Teste', 'Teste');
    expect(notificationService).toBeTruthy();
    expect(screen.getByTestId('ion-notification')).toBeTruthy();
  });

  it('should create a sucess notification', () => {
    notificationService.success('Teste', 'Teste');
    const iconType = screen.getAllByTestId('notification-icon');
    expect(iconType[1].classList).toContain('success-icon');
  });

  it('should create a info notification', () => {
    notificationService.info('Teste', 'Teste');
    const iconType = screen.getAllByTestId('notification-icon');
    expect(iconType[2].classList).toContain('info-icon');
  });

  it('should create a warning notification', () => {
    notificationService.warning('Teste', 'Teste');
    const iconType = screen.getAllByTestId('notification-icon');
    expect(iconType[3].classList).toContain('warning-icon');
  });

  it('should create a negative notification', () => {
    notificationService.error('Teste', 'Teste');
    const iconType = screen.getAllByTestId('notification-icon');
    expect(iconType[4].classList).toContain('negative-icon');
  });
});
