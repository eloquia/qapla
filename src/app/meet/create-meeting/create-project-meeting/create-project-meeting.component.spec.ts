import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectMeetingComponent } from './create-project-meeting.component';

describe('CreateProjectMeetingComponent', () => {
  let component: CreateProjectMeetingComponent;
  let fixture: ComponentFixture<CreateProjectMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProjectMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
