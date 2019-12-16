import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EGpSharedModule } from 'app/shared/shared.module';
import { UserRolesComponent } from './user-roles.component';
import { UserRolesDetailComponent } from './user-roles-detail.component';
import { UserRolesUpdateComponent } from './user-roles-update.component';
import { UserRolesDeletePopupComponent, UserRolesDeleteDialogComponent } from './user-roles-delete-dialog.component';
import { userRolesRoute, userRolesPopupRoute } from './user-roles.route';

const ENTITY_STATES = [...userRolesRoute, ...userRolesPopupRoute];

@NgModule({
  imports: [EGpSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UserRolesComponent,
    UserRolesDetailComponent,
    UserRolesUpdateComponent,
    UserRolesDeleteDialogComponent,
    UserRolesDeletePopupComponent
  ],
  entryComponents: [UserRolesDeleteDialogComponent]
})
export class UserManagementUserRolesModule {}
