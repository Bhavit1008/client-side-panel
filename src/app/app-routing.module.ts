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
import { AddUserComponent } from './add-user/add-user.component';
import { PurchaseOrderComponent } from './puchase-order/purchase-order.component';
import { ViewGatepassComponent } from './view-gatepass/view-gatepass.component';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';

const routes: Routes = [
  {
    path: 'order-confirmation',
    component: OrderConfirmationComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin','manager']
    }
  },
  {
    path: 'running-order',
    component: RunningOrderComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin','manager']
    }
  },
  {
    path: 'get-orders',
    component: GetOrdersComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin','manager']
    }
  },
  {
    path: 'login',
    component: LoginComponentComponent
  },
  {
    path: 'add-company',
    component: AddCompanyDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin']
    }
  },
  {
    path: 'add-stock',
    component: AddStockComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin','manager']
    }
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin']
    }
  },
  {
    path: 'gate-pass',
    component: PurchaseOrderComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin','manager']
    }
  },
  {
    path: 'view-gate-passes',
    component: ViewGatepassComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin','manager']
    }
  },
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'unauthorize',
    component: UnauthorizeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
