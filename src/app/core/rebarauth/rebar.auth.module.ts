import { NgModule, ModuleWithProviders, InjectionToken } from "@angular/core";

import {
  MsalModule,
  MsalConfig,
  MsalInterceptor,
  MsalGuard
} from "@azure/msal-angular";
import { AppConfigService } from "../services/app-config.service";

import {
  MSAL_CONFIG,
  MsalService
} from "@azure/msal-angular/dist/msal.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LogLevel } from "msal";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { environment } from "../../../environments/environment";

export const REBAR_AUTH_GUARD = new InjectionToken<string>("REBAR_AUTH_GUARD");



@NgModule({
  imports: [MsalModule]
})
export class RebarAuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RebarAuthModule,
      providers: PROVIDERS[environment["providers"]]
    };
  }
}

export function AuthConfigFactory(config: AppConfigService) {
  let cfg = Object.assign({}, config.config["msal"], {
    level: LogLevel.Verbose,
    piiLoggingEnabled: false
  });
  return cfg as MsalConfig;
}

export function emptyGuard(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) {
  return true;
}

/*
  When running locally `npm run start:local` or `npm run test` or `npm run e2e`
  use mock values, to turn off security.  This is set at build time.
*/ 

export const PROVIDERS = {
  mock: [
   {
      provide: MSAL_CONFIG,
      useValue: {'client':'mock', "authority":'https://login.microsoftonline.com/mocktenant'} 

    },
    {
      provide: REBAR_AUTH_GUARD,
      useValue: emptyGuard
    }
  ],
  app: [
    {
      provide: MSAL_CONFIG,
      useFactory: AuthConfigFactory,
      deps: [AppConfigService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalService,
    { provide: REBAR_AUTH_GUARD, useClass: MsalGuard }
  ]
};