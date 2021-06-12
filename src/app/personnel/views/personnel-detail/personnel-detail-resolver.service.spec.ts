import { TestBed } from '@angular/core/testing';

import { PersonnelDetailResolverService } from './personnel-detail-resolver.service';

describe('PersonnelDetailResolverService', () => {
  let service: PersonnelDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonnelDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
