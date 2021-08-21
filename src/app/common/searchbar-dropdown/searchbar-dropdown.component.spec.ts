import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarDropdownComponent } from './searchbar-dropdown.component';

describe('SearchbarDropdownComponent', () => {
  let component: SearchbarDropdownComponent;
  let fixture: ComponentFixture<SearchbarDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbarDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
