import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Permission } from 'app/shared/model/UserManagement/permission.model';
import { PermissionService } from './permission.service';
import { PermissionComponent } from './permission.component';
import { PermissionDetailComponent } from './permission-detail.component';
import { PermissionUpdateComponent } from './permission-update.component';
import { PermissionDeletePopupComponent } from './permission-delete-dialog.component';
import { IPermission } from 'app/shared/model/UserManagement/permission.model';

@Injectable({ providedIn: 'root' })
export class PermissionResolve implements Resolve<IPermission> {
  constructor(private service: PermissionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPermission> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Permission>) => response.ok),
        map((permission: HttpResponse<Permission>) => permission.body)
      );
    }
    return of(new Permission());
  }
}

export const permissionRoute: Routes = [
  {
    path: '',
    component: PermissionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'eGpApp.userManagementPermission.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PermissionDetailComponent,
    resolve: {
      permission: PermissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementPermission.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PermissionUpdateComponent,
    resolve: {
      permission: PermissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementPermission.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PermissionUpdateComponent,
    resolve: {
      permission: PermissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementPermission.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const permissionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PermissionDeletePopupComponent,
    resolve: {
      permission: PermissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementPermission.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
