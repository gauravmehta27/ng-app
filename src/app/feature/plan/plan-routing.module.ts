import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlanComponent } from "./plan.component";
import { DealInformationComponent } from "./deal-information/deal-information.component";
import { MECCheckListComponent } from "./meccheck-list/meccheck-list.component";

const routes: Routes = [
  {
    path: "plan",
    component: PlanComponent,
    children: [
      { path: "dealInfo", component: DealInformationComponent },
      { path: "MEC", component: MECCheckListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule {}
