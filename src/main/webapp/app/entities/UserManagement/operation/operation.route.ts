import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Operation } from 'app/shared/model/UserManagement/operation.model';
import { OperationService } from './operation.service';
import { OperationComponent } from './operation.component';
import { OperationDetailComponent } from './operation-detail.component';
import { OperationUpdateComponent } from './operation-update.component';
import { OperationDeletePopupComponent } from './operation-delete-dialog.component';
import { IOperation } from 'app/shared/model/UserManagement/operation.model';

@Injectable({ providedIn: 'root' })
export class OperationResolve implements Resolve<IOperation> {
  constructor(private service: OperationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOperation> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Operation>) => response.ok),
        map((operation: HttpResponse<Operation>) => operation.body)
      );
    }
    return of(new Operation());
  }
}

export const operationRoute: Routes = [
  {
    path: '',
    component: OperationComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'eGpApp.userManagementOperation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OperationDetailComponent,
    resolve: {
      operation: OperationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementOperation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OperationUpdateComponent,
    resolve: {
      operation: OperationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementOperation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OperationUpdateComponent,
    resolve: {
      operation: OperationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementOperation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const operationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OperationDeletePopupComponent,
    resolve: {
      operation: OperationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'eGpApp.userManagementOperation.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
