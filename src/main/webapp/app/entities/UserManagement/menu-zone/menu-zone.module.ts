import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EGpSharedModule } from 'app/shared/shared.module';
import { MenuZoneComponent } from './menu-zone.component';
import { MenuZoneDetailComponent } from './menu-zone-detail.component';
import { MenuZoneUpdateComponent } from './menu-zone-update.component';
import { MenuZoneDeletePopupComponent, MenuZoneDeleteDialogComponent } from './menu-zone-delete-dialog.component';
import { menuZoneRoute, menuZonePopupRoute } from './menu-zone.route';

const ENTITY_STATES = [...menuZoneRoute, ...menuZonePopupRoute];

@NgModule({
  imports: [EGpSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MenuZoneComponent,
    MenuZoneDetailComponent,
    MenuZoneUpdateComponent,
    MenuZoneDeleteDialogComponent,
    MenuZoneDeletePopupComponent
  ],
  entryComponents: [MenuZoneDeleteDialogComponent]
})
export class UserManagementMenuZoneModule {}
