import { DealInformationService } from "./deal-information/deal-information.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PlanRoutingModule } from "./plan-routing.module";
import { PlanComponent } from "./plan.component";
import { DealInformationComponent } from "./deal-information/deal-information.component";
import { MECCheckListComponent } from "./meccheck-list/meccheck-list.component";
import { ProjectStaffingComponent } from "./project-staffing/project-staffing.component";
import { ProjectArtifactsComponent } from "./project-artifacts/project-artifacts.component";
import { SharedModule } from "../../../app/feature/dmathome/shared/shared.module";
import { DealInformationSetupComponent } from "./Shared/deal-information-setup/deal-information-setup.component";
import { DealReportingInformationComponent } from "./Shared/deal-reporting-information/deal-reporting-information.component";
import { OpportunityInformationComponent } from "./Shared/opportunity-information/opportunity-information.component";
import { PanelBarModule } from "@progress/kendo-angular-layout";

@NgModule({
	declarations: [
		PlanComponent,
		DealInformationComponent,
		MECCheckListComponent,
		ProjectStaffingComponent,
		ProjectArtifactsComponent,
		DealInformationSetupComponent,
		DealReportingInformationComponent,
		OpportunityInformationComponent
	],
	imports: [CommonModule, PlanRoutingModule, SharedModule, DropDownsModule, FormsModule, PanelBarModule, ReactiveFormsModule],
	providers: [DealInformationService]
})
export class PlanModule {}
