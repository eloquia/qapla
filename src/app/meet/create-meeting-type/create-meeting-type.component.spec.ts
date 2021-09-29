import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMeetingTypeComponent } from './create-meeting-type.component';

describe('CreateMeetingTypeComponent', () => {
  let component: CreateMeetingTypeComponent;
  let fixture: ComponentFixture<CreateMeetingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMeetingTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMeetingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
