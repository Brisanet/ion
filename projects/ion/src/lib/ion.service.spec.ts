import { TestBed } from '@angular/core/testing';

import { IonService } from './ion.service';

describe('IonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IonService = TestBed.get(IonService);
    expect(service).toBeTruthy();
  });
});
