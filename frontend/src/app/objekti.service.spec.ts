import { TestBed } from '@angular/core/testing';

import { ObjektiService } from './objekti.service';

describe('ObjektiService', () => {
  let service: ObjektiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjektiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
