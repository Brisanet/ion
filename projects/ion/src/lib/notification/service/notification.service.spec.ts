import { TestBed } from '@angular/core/testing';
import { IonNotificationService } from './notification.service';
import { Overlay } from '@angular/cdk/overlay';
import { IonNotificationContainerComponent } from './notification.container.component';
import { ComponentPortal } from '@angular/cdk/portal';

describe('IonNotificationService', () => {
  let service: IonNotificationService;
  let overlaySpy: jest.Mocked<Overlay>;
  let overlayRefSpy: any;
  let componentRefSpy: any;
  let containerInstance: any;

  beforeEach(() => {
    containerInstance = {
      addNotification: jest.fn(),
    };

    componentRefSpy = {
      instance: containerInstance,
    };

    overlayRefSpy = {
      attach: jest.fn().mockReturnValue(componentRefSpy),
    };

    overlaySpy = {
      create: jest.fn().mockReturnValue(overlayRefSpy),
      position: jest.fn().mockReturnValue({
        global: jest.fn().mockReturnValue({
          top: jest.fn().mockReturnValue({
            right: jest.fn().mockReturnValue('positionStrategy'),
          }),
        }),
      }),
      scrollStrategies: {
        noop: jest.fn().mockReturnValue('noop'),
      },
    } as any;

    TestBed.configureTestingModule({
      providers: [
        IonNotificationService,
        { provide: Overlay, useValue: overlaySpy },
      ],
    });
    service = TestBed.inject(IonNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create overlay and container on first call', () => {
    service.success('Title', 'Message');

    expect(overlaySpy.create).toHaveBeenCalledTimes(1);
    expect(overlayRefSpy.attach).toHaveBeenCalledTimes(1);
    expect(overlayRefSpy.attach).toHaveBeenCalledWith(
      expect.any(ComponentPortal)
    );
  });

  it('should reuse overlay and container on subsequent calls', () => {
    service.success('Title 1', 'Message 1');
    service.info('Title 2', 'Message 2');

    expect(overlaySpy.create).toHaveBeenCalledTimes(1);
    expect(containerInstance.addNotification).toHaveBeenCalledTimes(2);
  });

  it('should call addNotification with correct success params', () => {
    service.success('Title', 'Message', { icon: 'star' });

    expect(overlaySpy.create).toHaveBeenCalled();
    expect(containerInstance.addNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Title',
        message: 'Message',
        type: 'success',
        icon: 'star',
      })
    );
  });

  it('should call addNotification with correct info params', () => {
    service.info('Title', 'Message');
    expect(containerInstance.addNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Title',
        message: 'Message',
        type: 'info',
      })
    );
  });

  it('should call addNotification with correct warning params', () => {
    service.warning('Title', 'Message');
    expect(containerInstance.addNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Title',
        message: 'Message',
        type: 'warning',
      })
    );
  });

  it('should call addNotification with correct error params', () => {
    service.error('Title', 'Message');
    expect(containerInstance.addNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Title',
        message: 'Message',
        type: 'negative',
      })
    );
  });
});
