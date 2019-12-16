import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EGpSharedModule } from 'app/shared/shared.module';
import { RolesPermissComponent } from './roles-permiss.component';
import { RolesPermissDetailComponent } from './roles-permiss-detail.component';
import { RolesPermissUpdateComponent } from './roles-permiss-update.component';
import { RolesPermissDeletePopupComponent, RolesPermissDeleteDialogComponent } from './roles-permiss-delete-dialog.component';
import { rolesPermissRoute, rolesPermissPopupRoute } from './roles-permiss.route';

const ENTITY_STATES = [...rolesPermissRoute, ...rolesPermissPopupRoute];

@NgModule({
  imports: [EGpSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RolesPermissComponent,
    RolesPermissDetailComponent,
    RolesPermissUpdateComponent,
    RolesPermissDeleteDialogComponent,
    RolesPermissDeletePopupComponent
  ],
  entryComponents: [RolesPermissDeleteDialogComponent]
})
export class UserManagementRolesPermissModule {}
