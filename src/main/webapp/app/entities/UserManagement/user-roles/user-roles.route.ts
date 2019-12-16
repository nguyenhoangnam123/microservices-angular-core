import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserRoles } from 'app/shared/model/UserManagement/user-roles.model';
import { UserRolesService } from './user-roles.service';
import { UserRolesComponent } from './user-roles.component';
import { UserRolesDetailComponent } from './user-roles-detail.component';
import { UserRolesUpdateComponent } from './user-roles-update.component';
import { UserRolesDeletePopupComponent } from './user-roles-delete-dialog.component';
import { IUserRoles } from 'app/shared/model/UserManagement/user-roles.model';

@Injectable({ providedIn: 'root' })
export class UserRolesResolve implements Resolve<IUserRoles> {
  constructor(private service: UserRolesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserRoles> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<UserRoles>) => response.ok),
        map((userRoles: HttpResponse<UserRoles>) => userRoles.body)
      );
    }
    return of(new UserRoles());
  }
}

export const userRolesRoute: Routes = [
  {
    path: '',
    component: UserRolesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'eGpApp.userManagementUserRoles.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserRolesDetailComponent,
    resolve: {
      userRoles: UserRolesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementUserRoles.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserRolesUpdateComponent,
    resolve: {
      userRoles: UserRolesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementUserRoles.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserRolesUpdateComponent,
    resolve: {
      userRoles: UserRolesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementUserRoles.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const userRolesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UserRolesDeletePopupComponent,
    resolve: {
      userRoles: UserRolesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementUserRoles.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
