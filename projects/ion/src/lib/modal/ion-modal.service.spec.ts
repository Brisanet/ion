import { TestBed } from '@angular/core/testing';
import { IonModalService } from './ion-modal.service';

describe('ModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IonModalService = TestBed.get(IonModalService);
    expect(service).toBeTruthy();
  });
});
