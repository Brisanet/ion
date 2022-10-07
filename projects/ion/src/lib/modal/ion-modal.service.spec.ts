import { TestBed } from '@angular/core/testing';
import { IonModalService } from './ion-modal.service';

describe('ModalService', () => {
  let modalService: IonModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    modalService = TestBed.get(IonModalService);
  });

  it('should be created', () => {
    expect(modalService).toBeTruthy();
  });
});
