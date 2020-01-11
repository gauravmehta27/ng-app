import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealInformationSetupComponent } from './deal-information-setup.component';

describe('DealInformationSetupComponent', () => {
  let component: DealInformationSetupComponent;
  let fixture: ComponentFixture<DealInformationSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealInformationSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealInformationSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
