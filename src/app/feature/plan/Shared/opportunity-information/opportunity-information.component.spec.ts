import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityInformationComponent } from './opportunity-information.component';

describe('OpportunityInformationComponent', () => {
  let component: OpportunityInformationComponent;
  let fixture: ComponentFixture<OpportunityInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
