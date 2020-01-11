import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "Plan-list",
    loadChildren: () =>
      import("./feature/plan/plan.module").then(m => m.PlanModule)
  }
  // {
  //   path: "",
  //   component: LayoutDMATComponent,
  //   loadChildren: () => import("./dmat/dmat.module").then(m => m.DMATModule)
  // },
  // {
  //   path: "deal",
  //   component: LayoutDealComponent,
  //   loadChildren: () => import("./dmat/dmat.module").then(m => m.DMATModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
