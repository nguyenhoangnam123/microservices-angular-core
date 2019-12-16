import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Roles } from 'app/shared/model/UserManagement/roles.model';
import { RolesService } from './roles.service';
import { RolesComponent } from './roles.component';
import { RolesDetailComponent } from './roles-detail.component';
import { RolesUpdateComponent } from './roles-update.component';
import { RolesDeletePopupComponent } from './roles-delete-dialog.component';
import { IRoles } from 'app/shared/model/UserManagement/roles.model';

@Injectable({ providedIn: 'root' })
export class RolesResolve implements Resolve<IRoles> {
  constructor(private service: RolesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRoles> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Roles>) => response.ok),
        map((roles: HttpResponse<Roles>) => roles.body)
      );
    }
    return of(new Roles());
  }
}

export const rolesRoute: Routes = [
  {
    path: '',
    component: RolesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'eGpApp.userManagementRoles.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RolesDetailComponent,
    resolve: {
      roles: RolesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementRoles.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RolesUpdateComponent,
    resolve: {
      roles: RolesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementRoles.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RolesUpdateComponent,
    resolve: {
      roles: RolesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementRoles.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rolesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RolesDeletePopupComponent,
    resolve: {
      roles: RolesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementRoles.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
