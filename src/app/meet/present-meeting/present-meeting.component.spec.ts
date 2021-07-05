import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentMeetingComponent } from './present-meeting.component';

describe('PresentMeetingComponent', () => {
  let component: PresentMeetingComponent;
  let fixture: ComponentFixture<PresentMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
