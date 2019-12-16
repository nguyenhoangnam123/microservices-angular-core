import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EGpSharedModule } from 'app/shared/shared.module';
import { PermissionComponent } from './permission.component';
import { PermissionDetailComponent } from './permission-detail.component';
import { PermissionUpdateComponent } from './permission-update.component';
import { PermissionDeletePopupComponent, PermissionDeleteDialogComponent } from './permission-delete-dialog.component';
import { permissionRoute, permissionPopupRoute } from './permission.route';

const ENTITY_STATES = [...permissionRoute, ...permissionPopupRoute];

@NgModule({
  imports: [EGpSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PermissionComponent,
    PermissionDetailComponent,
    PermissionUpdateComponent,
    PermissionDeleteDialogComponent,
    PermissionDeletePopupComponent
  ],
  entryComponents: [PermissionDeleteDialogComponent]
})
export class UserManagementPermissionModule {}
