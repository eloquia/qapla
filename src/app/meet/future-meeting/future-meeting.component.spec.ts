import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureMeetingComponent } from './future-meeting.component';

describe('FutureMeetingComponent', () => {
  let component: FutureMeetingComponent;
  let fixture: ComponentFixture<FutureMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
