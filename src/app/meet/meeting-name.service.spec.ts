import { TestBed } from '@angular/core/testing';

import { MeetingNameService } from './meeting-name.service';

describe('MeetingNameService', () => {
  let service: MeetingNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
