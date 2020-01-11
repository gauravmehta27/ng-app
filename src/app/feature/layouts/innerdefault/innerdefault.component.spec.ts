import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerdefaultComponent } from './innerdefault.component';

describe('InnerdefaultComponent', () => {
  let component: InnerdefaultComponent;
  let fixture: ComponentFixture<InnerdefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerdefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerdefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
