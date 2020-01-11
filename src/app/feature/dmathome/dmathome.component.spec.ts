import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DMATHomeComponent } from './dmathome.component';

describe('DMATHomeComponent', () => {
  let component: DMATHomeComponent;
  let fixture: ComponentFixture<DMATHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DMATHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DMATHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
