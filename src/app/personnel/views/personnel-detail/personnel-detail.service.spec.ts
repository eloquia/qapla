import { TestBed } from '@angular/core/testing';

import { PersonnelDetailService } from './personnel-detail.service';

describe('PersonnelDetailService', () => {
  let service: PersonnelDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonnelDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
