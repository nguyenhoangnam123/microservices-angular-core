import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RolesPermiss } from 'app/shared/model/UserManagement/roles-permiss.model';
import { RolesPermissService } from './roles-permiss.service';
import { RolesPermissComponent } from './roles-permiss.component';
import { RolesPermissDetailComponent } from './roles-permiss-detail.component';
import { RolesPermissUpdateComponent } from './roles-permiss-update.component';
import { RolesPermissDeletePopupComponent } from './roles-permiss-delete-dialog.component';
import { IRolesPermiss } from 'app/shared/model/UserManagement/roles-permiss.model';

@Injectable({ providedIn: 'root' })
export class RolesPermissResolve implements Resolve<IRolesPermiss> {
  constructor(private service: RolesPermissService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRolesPermiss> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RolesPermiss>) => response.ok),
        map((rolesPermiss: HttpResponse<RolesPermiss>) => rolesPermiss.body)
      );
    }
    return of(new RolesPermiss());
  }
}

export const rolesPermissRoute: Routes = [
  {
    path: '',
    component: RolesPermissComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'eGpApp.userManagementRolesPermiss.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RolesPermissDetailComponent,
    resolve: {
      rolesPermiss: RolesPermissResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementRolesPermiss.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RolesPermissUpdateComponent,
    resolve: {
      rolesPermiss: RolesPermissResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementRolesPermiss.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RolesPermissUpdateComponent,
    resolve: {
      rolesPermiss: RolesPermissResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementRolesPermiss.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rolesPermissPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RolesPermissDeletePopupComponent,
    resolve: {
      rolesPermiss: RolesPermissResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementRolesPermiss.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
