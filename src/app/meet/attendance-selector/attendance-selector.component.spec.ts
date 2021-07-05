import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSelectorComponent } from './attendance-selector.component';

describe('AttendanceSelectorComponent', () => {
  let component: AttendanceSelectorComponent;
  let fixture: ComponentFixture<AttendanceSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
