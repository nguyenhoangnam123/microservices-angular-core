import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EGpSharedModule } from 'app/shared/shared.module';
import { RolesComponent } from './roles.component';
import { RolesDetailComponent } from './roles-detail.component';
import { RolesUpdateComponent } from './roles-update.component';
import { RolesDeletePopupComponent, RolesDeleteDialogComponent } from './roles-delete-dialog.component';
import { rolesRoute, rolesPopupRoute } from './roles.route';

const ENTITY_STATES = [...rolesRoute, ...rolesPopupRoute];

@NgModule({
  imports: [EGpSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [RolesComponent, RolesDetailComponent, RolesUpdateComponent, RolesDeleteDialogComponent, RolesDeletePopupComponent],
  entryComponents: [RolesDeleteDialogComponent]
})
export class UserManagementRolesModule {}
