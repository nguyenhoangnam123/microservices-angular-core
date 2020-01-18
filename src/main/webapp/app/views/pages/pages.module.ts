// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { MailModule } from './apps/mail/mail.module';
// import { ECommerceModule } from './apps/e-commerce/e-commerce.module';
import { UserManagementModule } from './user-management/user-management.module';
import { MyPageComponent } from './my-page/my-page.component';
import { MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatIconModule } from '@angular/material';
import { MenuModule } from './menu/menu.module';
import { ZoneModule } from './zone/zone.module';

@NgModule({
  declarations: [MyPageComponent],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    PartialsModule,
    MailModule,
    UserManagementModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MenuModule,
    ZoneModule
  ],
  providers: []
})
export class PagesModule {}
