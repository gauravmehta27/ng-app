import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealReportComponent } from './deal-report.component';

describe('DealReportComponent', () => {
  let component: DealReportComponent;
  let fixture: ComponentFixture<DealReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
