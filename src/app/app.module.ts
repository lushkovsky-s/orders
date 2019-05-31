import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TruncateModule } from 'ng2-truncate';
import { MobxAngularModule } from 'mobx-angular';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersTabComponent } from './orders-tab/orders-tab.component';
import { EmployeesTabComponent } from './employees-tab/employees-tab.component';
import { ClientsTabComponent } from './clients-tab/clients-tab.component';
import { KnowlagesBaseTabComponent } from './knowlages-base-tab/knowlages-base-tab.component';
import { AssetsTabComponent } from './assets-tab/assets-tab.component';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';

import { Store as OrdersStore } from './orders-tab/orders.store';

import { APIService } from './api.service';
import { EditableFieldComponent } from './editable-field/editable-field.component';
import { SearchBarComponent } from './search-bar/search-bar.component' 

@NgModule({
  declarations: [
    AppComponent,
    OrdersTabComponent,
    EmployeesTabComponent,
    ClientsTabComponent,
    KnowlagesBaseTabComponent,
    AssetsTabComponent,
    SettingsTabComponent,
    EditableFieldComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TruncateModule,
    MobxAngularModule,
    HttpClientModule 
  ],
  providers: [
    OrdersStore,
    APIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
