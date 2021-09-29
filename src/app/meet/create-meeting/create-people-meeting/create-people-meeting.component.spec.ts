import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePeopleMeetingComponent } from './create-people-meeting.component';

describe('CreatePeopleMeetingComponent', () => {
  let component: CreatePeopleMeetingComponent;
  let fixture: ComponentFixture<CreatePeopleMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePeopleMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePeopleMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
