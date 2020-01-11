import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler} from '@angular/common/http';
import { AppConfigService } from './core/services/app-config.service';
import { routing } from './app.routing';
import { RebarAuthModule } from './core/rebarauth/rebar.auth.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [
        AppComponent, PageNotFoundComponent
      ],
      imports : [routing, RebarAuthModule],
      providers : [HttpClient, HttpHandler, 
        {
          provide: AppConfigService,
          useValue: {
            config: require("../config/config.json"),
            getConfig: () => require("../config/config.json")
          }
        },
        {provide: APP_BASE_HREF, useValue : "/" }]
    }).compileComponents();
  }));

  it('App component should be created', () => {
    const component = TestBed.createComponent(AppComponent);
    expect(component).toBeTruthy();
  });

});
