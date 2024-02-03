import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RunningOrderComponent } from './running-order/running-order.component';
import { GetOrdersComponent } from './get-orders/get-orders.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { CookieService } from 'ngx-cookie-service';
import { AddCompanyDetailsComponent } from './add-company-details/add-company-details.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { AddUserComponent } from './add-user/add-user.component';
import { PurchaseOrderComponent } from './puchase-order/purchase-order.component';
import { ViewGatepassComponent } from './view-gatepass/view-gatepass.component';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';


@NgModule({
  declarations: [
    AppComponent,
    OrderConfirmationComponent,
    RunningOrderComponent,
    GetOrdersComponent,
    LoginComponentComponent,
    AddCompanyDetailsComponent,
    AddStockComponent,
    AddUserComponent,
    PurchaseOrderComponent,
    ViewGatepassComponent,
    UnauthorizeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient,
    CookieService
  ],
  exports: [AppRoutingModule, OrderConfirmationComponent,PurchaseOrderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
