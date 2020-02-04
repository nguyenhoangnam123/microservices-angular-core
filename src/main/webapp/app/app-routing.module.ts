import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
//import error page from theme
// import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
//import base to alternate default main
import { BaseComponent } from './views/theme/base/base.component';
import { AuthGuard } from './core/auth';
import { MyPageComponent } from './views/pages/my-page/my-page.component';
import { MenuComponent } from './views/pages/menu/menu.component';
import { ZoneComponent } from './views/pages/zone/zone.component';
// import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

// const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

const routes: Routes = [
  // {
  //   path: 'admin',
  //   data: {
  //     authorities: ['ROLE_ADMIN']
  //   },
  //   canActivate: [UserRouteAccessService],
  //   loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
  // },
  // {
  //   path: 'account',
  //   loadChildren: () => import('./account/account.module').then(m => m.EGpAccountModule)
  // },
  { path: 'auth', loadChildren: () => import('app/views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'menu', // <= Page URL
        component: MenuComponent // <= Page component registration
      },
      {
        path: 'zone', // <= Page URL
        component: ZoneComponent // <= Page component registration
      },
      {
        path: 'my-page', // <= Page URL
        component: MyPageComponent // <= Page component registration
      },
      {
        path: 'dashboard',
        loadChildren: () => import('app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'mail',
        loadChildren: () => import('app/views/pages/apps/mail/mail.module').then(m => m.MailModule)
      },
      {
        path: 'ngbootstrap',
        loadChildren: () => import('app/views/pages/ngbootstrap/ngbootstrap.module').then(m => m.NgbootstrapModule)
      },
      {
        path: 'material',
        loadChildren: () => import('app/views/pages/material/material.module').then(m => m.MaterialModule)
      },
      {
        path: 'user-management',
        loadChildren: () => import('app/views/pages/user-management/user-management.module').then(m => m.UserManagementModule)
      },
      {
        path: 'builder',
        loadChildren: () => import('app/views/theme/content/builder/builder.module').then(m => m.BuilderModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
  // ...LAYOUT_ROUTES
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: DEBUG_INFO_ENABLED })],
  exports: [RouterModule]
})
export class EGpAppRoutingModule {}
