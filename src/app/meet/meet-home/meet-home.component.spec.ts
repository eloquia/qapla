import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetHomeComponent } from './meet-home.component';

describe('MeetHomeComponent', () => {
  let component: MeetHomeComponent;
  let fixture: ComponentFixture<MeetHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
