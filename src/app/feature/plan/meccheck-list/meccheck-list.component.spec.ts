import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MECCheckListComponent } from './meccheck-list.component';

describe('MECCheckListComponent', () => {
  let component: MECCheckListComponent;
  let fixture: ComponentFixture<MECCheckListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MECCheckListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MECCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
