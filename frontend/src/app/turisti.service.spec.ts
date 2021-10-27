import { TestBed } from '@angular/core/testing';

import { TuristiService } from './turisti.service';

describe('TuristiService', () => {
  let service: TuristiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TuristiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
