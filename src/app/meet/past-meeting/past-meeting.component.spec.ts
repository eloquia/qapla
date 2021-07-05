import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastMeetingComponent } from './past-meeting.component';

describe('PastMeetingComponent', () => {
  let component: PastMeetingComponent;
  let fixture: ComponentFixture<PastMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
