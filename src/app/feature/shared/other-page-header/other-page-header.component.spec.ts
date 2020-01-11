import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPageHeaderComponent } from './other-page-header.component';

describe('OtherPageHeaderComponent', () => {
  let component: OtherPageHeaderComponent;
  let fixture: ComponentFixture<OtherPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherPageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
