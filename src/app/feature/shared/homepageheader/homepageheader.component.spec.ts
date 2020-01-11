import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageheaderComponent } from './homepageheader.component';

describe('HomepageheaderComponent', () => {
  let component: HomepageheaderComponent;
  let fixture: ComponentFixture<HomepageheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
