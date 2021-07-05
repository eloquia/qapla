import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentMeetingItemComponent } from './present-meeting-item.component';

describe('PresentMeetingItemComponent', () => {
  let component: PresentMeetingItemComponent;
  let fixture: ComponentFixture<PresentMeetingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentMeetingItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentMeetingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
