import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';

// containers
import { DashboardComponent } from './dashboard.component';

// routes
export const ROUTES: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
