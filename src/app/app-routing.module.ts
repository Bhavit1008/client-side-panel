import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { RunningOrderComponent } from './running-order/running-order.component';
import { GetOrdersComponent } from './get-orders/get-orders.component';

const routes: Routes = [
  {
    path: 'order-confirmation',
    component: OrderConfirmationComponent
  },
  {
    path: 'running-order',
    component: RunningOrderComponent
  },
  {
    path: 'get-orders',
    component: GetOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
