import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EGpSharedModule } from 'app/shared/shared.module';
import { UsersComponent } from './users.component';
import { UsersDetailComponent } from './users-detail.component';
import { UsersUpdateComponent } from './users-update.component';
import { UsersDeletePopupComponent, UsersDeleteDialogComponent } from './users-delete-dialog.component';
import { usersRoute, usersPopupRoute } from './users.route';

const ENTITY_STATES = [...usersRoute, ...usersPopupRoute];

@NgModule({
  imports: [EGpSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [UsersComponent, UsersDetailComponent, UsersUpdateComponent, UsersDeleteDialogComponent, UsersDeletePopupComponent],
  entryComponents: [UsersDeleteDialogComponent]
})
export class UserManagementUsersModule {}
