import { TestBed } from '@angular/core/testing';

import { IonService } from './ion.service';

describe('IonService', () => {
  let service: IonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
