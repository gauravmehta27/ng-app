import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealReportingInformationComponent } from './deal-reporting-information.component';

describe('DealReportingInformationComponent', () => {
  let component: DealReportingInformationComponent;
  let fixture: ComponentFixture<DealReportingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealReportingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealReportingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
