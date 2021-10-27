import { TestBed } from '@angular/core/testing';

import { ZahteviService } from './zahtevi.service';

describe('ZahteviService', () => {
  let service: ZahteviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZahteviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
