import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDmatComponent } from './layout-dmat.component';

describe('LayoutDmatComponent', () => {
  let component: LayoutDmatComponent;
  let fixture: ComponentFixture<LayoutDmatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutDmatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutDmatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
