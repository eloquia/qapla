import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelActivityComponent } from './personnel-activity.component';

describe('PersonnelActivityComponent', () => {
  let component: PersonnelActivityComponent;
  let fixture: ComponentFixture<PersonnelActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
