import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KnowlagesBaseTabComponent } from './knowlages-base-tab/knowlages-base-tab.component'
import { OrdersTabComponent } from './orders-tab/orders-tab.component'
import { EmployeesTabComponent } from './employees-tab/employees-tab.component'
import { ClientsTabComponent } from './clients-tab/clients-tab.component'
import { AssetsTabComponent } from './assets-tab/assets-tab.component'
import { SettingsTabComponent } from './settings-tab/settings-tab.component'

const routes: Routes = [
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  { path: 'knowlages-base', component: KnowlagesBaseTabComponent },
  { path: 'orders', component: OrdersTabComponent },
  { path: 'employees', component: EmployeesTabComponent },
  { path: 'clients', component: ClientsTabComponent },
  { path: 'assets', component: AssetsTabComponent },
  { path: 'settings', component: SettingsTabComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
