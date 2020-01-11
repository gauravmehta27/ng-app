import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";
import { MsalGuard } from "@azure/msal-angular";
import { REBAR_AUTH_GUARD } from "./core/rebarauth/rebar.auth.module";
import { DefaultComponent } from "./feature/layouts/default/default.component";

import { UserMetricsComponent } from "./feature/user-metrics/user-metrics.component";
import { DMATHomeComponent } from "./feature/dmathome/dmathome.component";
import { PlanComponent } from "./feature/plan/plan.component";

import { DealReportComponent} from './feature/dmathome/deal-report/deal-report.component';
import { FeedbackformComponent } from "./feature/feedbackform/feedbackform.component";
const appRoutes: Routes = [
  //{
  //  path: "",
  //  pathMatch: "full",
  //  redirectTo: "home"
  //  },
    {
        path: "",
        component: DefaultComponent,
        children: [{
            path: "",
            component:DMATHomeComponent
        },
            {
             path: "user-metrics",
            component: UserMetricsComponent
           }
           
          //  {
          //    path:"feedbackform",
          //    component:FeedbackformComponent
          //  }
]     },
    {
      path: "Deal-Report",
      component: DealReportComponent
    },
  //  {
  //  path: "home",
  //  loadChildren: "./feature/home/home.module#HomeModule",
  //  canActivate: [REBAR_AUTH_GUARD]
  //},
  //{
  //  path: "admin",
  //  loadChildren: "./feature/admin/admin.module#AdminModule",
  //  canActivate: [REBAR_AUTH_GUARD]
  //},
  //{
  //  path: "dashboard",
  //  loadChildren: "./feature/dashboard/dashboard.module#DashboardModule",
  //  canActivate: [REBAR_AUTH_GUARD]
  //},
  //{
  //  path: "plan",
  //  loadChildren: "./feature/plan/plan.module#PlanModule",
  //  canActivate: [REBAR_AUTH_GUARD]
  //},
  {
    path: "not-found",
    component: PageNotFoundComponent
  }
  //{
  //  path: "**",
  //  redirectTo: "not-found"
  //}
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
