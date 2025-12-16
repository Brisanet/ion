import { Component, input, output } from '@angular/core';
import {
  IonNotificationContainerComponent,
  NotificationItem,
} from './notification.container.component';
import { IonNotificationComponent } from '../component/notification.component';
import { StatusType } from '../../core/types/status';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Mock the child component to isolate container testing
@Component({
  selector: 'ion-notification',
  standalone: true,
  template: '<div data-testid="mock-notification">Mock: {{ title() }}</div>',
})
class MockNotificationComponent {
  title = input.required<string>();
  message = input.required<string>();
  icon = input<string>();
  type = input<StatusType>();
  fixed = input<boolean>();
  fadeIn = input<string>();
  fadeOut = input<string>();
  pauseOnHover = input<boolean>();
  ionOnClose = output<void>();
}

describe('IonNotificationContainerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonNotificationContainerComponent],
    })
      .overrideComponent(IonNotificationContainerComponent, {
        remove: { imports: [IonNotificationComponent] },
        add: { imports: [MockNotificationComponent] },
      })
      .compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(IonNotificationContainerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render notifications added via addNotification', () => {
    const fixture = TestBed.createComponent(IonNotificationContainerComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const notification: NotificationItem = {
      id: '1',
      title: 'Test Title',
      message: 'Test Message',
      type: 'success',
    };

    component.addNotification(notification);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Mock: Test Title');
  });

  it('should remove notification when removeNotification is called', () => {
    const fixture = TestBed.createComponent(IonNotificationContainerComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const notification: NotificationItem = {
      id: '1',
      title: 'Test Title',
      message: 'Test Message',
      type: 'success',
    };

    component.addNotification(notification);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Mock: Test Title'
    );

    component.removeNotification('1');
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).not.toContain(
      'Mock: Test Title'
    );
  });

  it('should emit removeNotification when child emits ionOnClose', () => {
    const fixture = TestBed.createComponent(IonNotificationContainerComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const notification: NotificationItem = {
      id: '123',
      title: 'Closing Title',
      message: 'Message',
      type: 'info',
    };

    component.addNotification(notification);
    fixture.detectChanges();

    const mockComponentDe = fixture.debugElement.query(
      By.directive(MockNotificationComponent)
    );
    const mockComponentInstance =
      mockComponentDe.componentInstance as MockNotificationComponent;

    // Trigger the output
    mockComponentInstance.ionOnClose.emit();
    fixture.detectChanges();

    // Should be removed
    const remainingMock = fixture.debugElement.query(
      By.directive(MockNotificationComponent)
    );
    expect(remainingMock).toBeNull();
  });
});
