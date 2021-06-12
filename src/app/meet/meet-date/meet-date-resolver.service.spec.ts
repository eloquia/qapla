import { TestBed } from '@angular/core/testing';

import { MeetDateResolverService } from './meet-date-resolver.service';

describe('MeetDateResolverService', () => {
  let service: MeetDateResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetDateResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
