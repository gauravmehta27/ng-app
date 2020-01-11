import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DefaultComponent } from "./default.component";
import { RouterModule } from "@angular/router";
import { DMATHomeComponent } from "../../dmathome/dmathome.component";
import { UserMetricsComponent } from "../../user-metrics/user-metrics.component";
import { SharedModule } from "../../dmathome/shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { DropDownsModule, AutoCompleteModule } from "@progress/kendo-angular-dropdowns";
import { ChartsModule } from "ng2-charts";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
//import { FeedbackformComponent } from "../../feedbackform/feedbackform.component";
import { WindowModule } from "@progress/kendo-angular-dialog";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
	declarations: [
		DefaultComponent,
		DMATHomeComponent,
		UserMetricsComponent
		//FeedbackformComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
		HttpClientModule,
		DropDownsModule,
		ChartsModule,
		BrowserAnimationsModule,
		BrowserModule,
		AutoCompleteModule,
		WindowModule,
		NgbDropdownModule
	]
})
export class DefaultModule {}
