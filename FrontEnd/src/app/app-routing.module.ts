import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBookingComponent } from './admin-booking/admin-booking.component';
import { AdminCheckoutComponent } from './admin-checkout/admin-checkout.component';
import { AdminPayInfoComponent } from './admin-pay-info/admin-pay-info.component';
import { AdminPayComponent } from './admin-pay/admin-pay.component';
import { AdminReportInfoComponent } from './admin-report-info/admin-report-info.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { AdminUsermangeComponent } from './admin-usermange/admin-usermange.component';
import { AdminComponent } from './admin/admin.component';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { PayComponent } from './pay/pay.component';
import { RegisterComponent } from './register/register.component';
import { RootGuard } from './root.guard';
import { AgreementComponent } from './serve/agreement/agreement.component';
import { CheckoutComponent } from './serve/checkout/checkout.component';
import { ReportComponent } from './serve/report/report.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'news',
    component: NewsComponent,
    canActivate: [RootGuard],
    data: {
      role: 'useser,admin'
    }
  },
  {
    path: 'serve/report',
    component: ReportComponent,
    canActivate: [RootGuard],
    data: {
      role: 'useser,admin'
    }
  },
  {
    path: 'serve/agreement',
    component: AgreementComponent,
    canActivate: [RootGuard],
    data: {
      role: 'useser,admin'
    }
  },
  {
    path: 'serve/checkout',
    component: CheckoutComponent,
    canActivate: [RootGuard],
    data: {
      role: 'useser,admin'
    }
  },
  {
    path: 'booking',
    component: BookingComponent,
    canActivate: [RootGuard],
    data: {
      role: 'useser,admin'
    }
  },
  {
    path: 'pay',
    component: PayComponent,
    canActivate: [RootGuard],
    data: {
      role: 'useser,admin'
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RootGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'admin-booking',
    component: AdminBookingComponent,
    canActivate: [RootGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'admin-report',
    component: AdminReportComponent,
    canActivate: [RootGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'admin-checkout',
    component: AdminCheckoutComponent,
    canActivate: [RootGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'admin-usermanage',
    component: AdminUsermangeComponent,
    canActivate: [RootGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'admin-report/info/:id',
    component: AdminReportInfoComponent,
    canActivate: [RootGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'admin-pay',
    component: AdminPayComponent,
    canActivate: [RootGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'admin-pay/info/:id',
    component: AdminPayInfoComponent,
    canActivate: [RootGuard],
    data: {
      role: 'admin'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
