import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetDateComponent } from './meet-date.component';

describe('MeetDateComponent', () => {
  let component: MeetDateComponent;
  let fixture: ComponentFixture<MeetDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
