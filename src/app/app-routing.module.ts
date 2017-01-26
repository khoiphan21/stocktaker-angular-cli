import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { StockSetupComponent } from './stock-setup/stock-setup.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { StockTakeComponent } from './stock-take/stock-take.component';
import { StockTakeWarehouseComponent } from './stock-take-warehouse/stock-take-warehouse.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'stock-setup', component: StockSetupComponent },
  { path: 'stock-take', component: StockTakeComponent },
  { path: 'stock-take/warehouse', component: StockTakeWarehouseComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
