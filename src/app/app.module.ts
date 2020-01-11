import { PlanModule } from "./feature/plan/plan.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AppConfigService } from "./core/services/app-config.service";
import { FormsModule } from "@angular/forms";
import { routing } from "./app.routing";
import { RebarAuthModule } from "./core/rebarauth/rebar.auth.module";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";
import { MsalService } from "@azure/msal-angular";
import { DefaultModule } from "./feature/layouts/default/default.module";
import { InnerdefaultModule } from "./feature/layouts/innerdefault/innerdefault.module";
import { HeaderComponent } from "./shared/header/header.component";
/** IE10 and IE11 require the following for NgClass support on SVG elements */
//import 'classlist.js';
// Run `npm install --save classlist.js`.

/** Evergreen browsers require these. **/
import "core-js/es6/reflect";

/** IE10 and IE11 requires the following to support `@angular/animation`. ALL Firefox browsers require the following to support `@angular/animation`. **/
//import 'web-animations-js';
// Run `npm install --save web-animations-js`.

/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
import "zone.js/dist/zone";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TooltipModule } from "@progress/kendo-angular-tooltip";
import { LayoutModule } from "@progress/kendo-angular-layout";

// Included with Angular CLI.

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, HeaderComponent],

  schemas: [NO_ERRORS_SCHEMA],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    RebarAuthModule.forRoot(),
    DefaultModule,
    PlanModule,
    InnerdefaultModule,
    DropDownsModule,
    BrowserAnimationsModule,
    TooltipModule,
    LayoutModule

    //NgbModalModule, NgbDropdownModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppConfigService) => () => config.load(),
      deps: [AppConfigService],
      multi: true
    },
    MsalService
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
