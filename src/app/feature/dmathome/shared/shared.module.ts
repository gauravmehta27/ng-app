import { InnerdefaultComponent } from "./../../layouts/innerdefault/innerdefault.component";
import { OtherPageHeaderComponent } from "./../../shared/other-page-header/other-page-header.component";

//import { ScrollDirective } from '../../dmathome/scrolldirective.directive';
//import { ChartsModule } from 'ng2-charts/ng2-charts';
import {
  DropDownsModule,
  AutoCompleteModule
} from "@progress/kendo-angular-dropdowns";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { DealReportComponent } from "../deal-report/deal-report.component"; // Included with Angular CLI.

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutDmatComponent } from "./components/layout-dmat/layout-dmat.component";
import { RouterModule } from "@angular/router";
import { HomepageheaderComponent } from "../../shared/homepageheader/homepageheader.component";
import { WindowModule } from "@progress/kendo-angular-dialog";
import { ChartsModule } from "ng2-charts";
import { FeedbackformComponent } from "../../feedbackform/feedbackform.component";

@NgModule({
  declarations: [
    LayoutDmatComponent,
    HomepageheaderComponent,
    OtherPageHeaderComponent,
    InnerdefaultComponent,
    DealReportComponent,
    FeedbackformComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule,
    DropDownsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AutoCompleteModule,
    WindowModule
  ],
  exports: [
    LayoutDmatComponent,
    HomepageheaderComponent,
    OtherPageHeaderComponent,
    InnerdefaultComponent,
    FeedbackformComponent
  ]
})
export class SharedModule {}
