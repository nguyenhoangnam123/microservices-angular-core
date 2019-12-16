import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MenuZone } from 'app/shared/model/UserManagement/menu-zone.model';
import { MenuZoneService } from './menu-zone.service';
import { MenuZoneComponent } from './menu-zone.component';
import { MenuZoneDetailComponent } from './menu-zone-detail.component';
import { MenuZoneUpdateComponent } from './menu-zone-update.component';
import { MenuZoneDeletePopupComponent } from './menu-zone-delete-dialog.component';
import { IMenuZone } from 'app/shared/model/UserManagement/menu-zone.model';

@Injectable({ providedIn: 'root' })
export class MenuZoneResolve implements Resolve<IMenuZone> {
  constructor(private service: MenuZoneService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMenuZone> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MenuZone>) => response.ok),
        map((menuZone: HttpResponse<MenuZone>) => menuZone.body)
      );
    }
    return of(new MenuZone());
  }
}

export const menuZoneRoute: Routes = [
  {
    path: '',
    component: MenuZoneComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'eGpApp.userManagementMenuZone.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MenuZoneDetailComponent,
    resolve: {
      menuZone: MenuZoneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementMenuZone.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MenuZoneUpdateComponent,
    resolve: {
      menuZone: MenuZoneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementMenuZone.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MenuZoneUpdateComponent,
    resolve: {
      menuZone: MenuZoneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementMenuZone.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const menuZonePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MenuZoneDeletePopupComponent,
    resolve: {
      menuZone: MenuZoneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementMenuZone.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
