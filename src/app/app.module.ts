import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RunningOrderComponent } from './running-order/running-order.component';
import { GetOrdersComponent } from './get-orders/get-orders.component';


@NgModule({
  declarations: [
    AppComponent,
    OrderConfirmationComponent,
    RunningOrderComponent,
    GetOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient
  ],
  exports: [AppRoutingModule, OrderConfirmationComponent,],
  bootstrap: [AppComponent]
})
export class AppModule { }
