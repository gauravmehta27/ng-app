import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealInformationComponent } from './deal-information.component';

describe('DealInformationComponent', () => {
  let component: DealInformationComponent;
  let fixture: ComponentFixture<DealInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
