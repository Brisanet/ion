import { TestBed } from '@angular/core/testing';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { PopoverOverlayService } from './popover.service';
import { PopoverPosition } from '../core/types/popover';

describe('PopoverOverlayService', () => {
  let service: PopoverOverlayService;
  let overlay: Overlay;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule],
      providers: [PopoverOverlayService],
    });
    service = TestBed.inject(PopoverOverlayService);
    overlay = TestBed.inject(Overlay);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create overlay when open is called', () => {
    const mockElement = document.createElement('div');
    const mockData = {
      ionPopoverTitle: 'Test Title',
      ionPopoverBody: {} as any,
    };

    service.open(mockElement, mockData);

    // Verify overlay was created (implementation detail test)
    expect(service['overlayRef']).toBeTruthy();
  });

  it('should close overlay when close is called', () => {
    const mockElement = document.createElement('div');
    const mockData = {
      ionPopoverTitle: 'Test Title',
      ionPopoverBody: {} as any,
    };

    service.open(mockElement, mockData);
    service.close();

    expect(service['overlayRef']).toBeNull();
  });

  it('should close existing overlay before opening new one', () => {
    const mockElement = document.createElement('div');
    const mockData = {
      ionPopoverTitle: 'Test Title',
      ionPopoverBody: {} as any,
    };

    service.open(mockElement, mockData);
    const firstOverlayRef = service['overlayRef'];
    const disposeSpy = jest.spyOn(firstOverlayRef!, 'dispose');

    service.open(mockElement, mockData);

    expect(disposeSpy).toHaveBeenCalled();
  });

  it('should use noop scroll strategy when stopCloseOnScroll is true', () => {
    const mockElement = document.createElement('div');
    const mockData = {
      ionPopoverTitle: 'Test Title',
      ionPopoverBody: {} as any,
    };

    const noopSpy = jest.spyOn(overlay.scrollStrategies, 'noop');
    service.open(mockElement, mockData, true, true);

    expect(noopSpy).toHaveBeenCalled();
  });

  it('should use reposition scroll strategy when autoReposition is true', () => {
    const mockElement = document.createElement('div');
    const mockData = {
      ionPopoverTitle: 'Test Title',
      ionPopoverBody: {} as any,
    };

    const repositionSpy = jest.spyOn(overlay.scrollStrategies, 'reposition');
    service.open(mockElement, mockData, false, true);

    expect(repositionSpy).toHaveBeenCalled();
  });

  it('should use close scroll strategy when autoReposition is false', () => {
    const mockElement = document.createElement('div');
    const mockData = {
      ionPopoverTitle: 'Test Title',
      ionPopoverBody: {} as any,
    };

    const closeSpy = jest.spyOn(overlay.scrollStrategies, 'close');
    service.open(mockElement, mockData, false, false);

    expect(closeSpy).toHaveBeenCalled();
  });
});
