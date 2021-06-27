import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFreeFormMeetingComponent } from './create-free-form-meeting.component';

describe('CreateFreeFormMeetingComponent', () => {
  let component: CreateFreeFormMeetingComponent;
  let fixture: ComponentFixture<CreateFreeFormMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFreeFormMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFreeFormMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
