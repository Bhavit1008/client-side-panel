import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { RunningOrderComponent } from './running-order/running-order.component';
import { GetOrdersComponent } from './get-orders/get-orders.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './helper/auth.guard';
import { AddCompanyDetailsComponent } from './add-company-details/add-company-details.component';
import { AddStockComponent } from './add-stock/add-stock.component';

const routes: Routes = [
  {
    path: 'order-confirmation',
    component: OrderConfirmationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'running-order',
    component: RunningOrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'get-orders',
    component: GetOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponentComponent
  },
  {
    path: 'add-company',
    component: AddCompanyDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-stock',
    component: AddStockComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
