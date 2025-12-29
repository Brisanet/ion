import { Component, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { screen, fireEvent, waitFor } from '@testing-library/angular';
import { IonModalService } from './modal.service';
import { IonModalComponent } from './modal.component';
import { IonModalConfiguration } from '../core/types/modal';
import '@testing-library/jest-dom';

@Component({
  standalone: true,
  template: '<div data-testid="mock-component">Mock Component</div>',
})
class MockComponent {}

describe('IonModalService', () => {
  let service: IonModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IonModalService],
    });
    service = TestBed.inject(IonModalService);
  });

  afterEach(() => {
    // CDK Overlay elements might persist between tests if not cleaned up
    const overlays = document.querySelectorAll('.cdk-overlay-container');
    overlays.forEach((o) => (o.innerHTML = ''));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open modal and display component', async () => {
    service.open(MockComponent, { title: 'Test Modal' });
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(await screen.findByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByTestId('mock-component')).toBeInTheDocument();
  });

  it('should close modal when clicking close button', async () => {
    service.open(MockComponent, { title: 'Test Modal' });
    const closeButton = (await screen.findByTestId('close-icon')).querySelector(
      'button',
    ) as HTMLElement;
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  it('should close modal when clicking backdrop', async () => {
    service.open(MockComponent, {
      title: 'Test Modal',
      overlayCanDismiss: true,
    });
    const backdrop = document.querySelector(
      '.ion-modal-backdrop',
    ) as HTMLElement;
    fireEvent.click(backdrop);
    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  it('should emit value when closing with value from footer', async () => {
    let result: any;
    service
      .open(MockComponent, {
        title: 'Test Modal',
        footer: {
          primaryButton: { label: 'Confirmar' },
        },
      })
      .subscribe((val) => (result = val));

    const confirmButton = (
      await screen.findByTestId('modal-primary-btn')
    ).querySelector('button') as HTMLElement;
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(result).toBeDefined();
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  it('should not close modal when primary button is clicked and preventCloseOnConfirm is true', async () => {
    let result: any;
    service
      .open(MockComponent, {
        title: 'Test Modal',
        preventCloseOnConfirm: true,
        footer: {
          primaryButton: { label: 'Confirmar' },
        },
      })
      .subscribe((val) => (result = val));

    const confirmButton = (
      await screen.findByTestId('modal-primary-btn')
    ).querySelector('button') as HTMLElement;
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(result).toBeDefined();
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
  });
});
