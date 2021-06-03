import { TestBed } from '@angular/core/testing';

import { ProjectDetailResolverService } from './project-detail-resolver.service';

describe('ProjectDetailResolverService', () => {
  let service: ProjectDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
