import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPermission } from 'app/shared/model/UserManagement/permission.model';

type EntityResponseType = HttpResponse<IPermission>;
type EntityArrayResponseType = HttpResponse<IPermission[]>;

@Injectable({ providedIn: 'root' })
export class PermissionService {
  public resourceUrl = SERVER_API_URL + 'services/usermanagement/api/permissions';

  constructor(protected http: HttpClient) {}

  create(permission: IPermission): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(permission);
    return this.http
      .post<IPermission>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(permission: IPermission): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(permission);
    return this.http
      .put<IPermission>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPermission>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPermission[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(permission: IPermission): IPermission {
    const copy: IPermission = Object.assign({}, permission, {
      dateCreated: permission.dateCreated != null && permission.dateCreated.isValid() ? permission.dateCreated.toJSON() : null,
      dateUpdated: permission.dateUpdated != null && permission.dateUpdated.isValid() ? permission.dateUpdated.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateCreated = res.body.dateCreated != null ? moment(res.body.dateCreated) : null;
      res.body.dateUpdated = res.body.dateUpdated != null ? moment(res.body.dateUpdated) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((permission: IPermission) => {
        permission.dateCreated = permission.dateCreated != null ? moment(permission.dateCreated) : null;
        permission.dateUpdated = permission.dateUpdated != null ? moment(permission.dateUpdated) : null;
      });
    }
    return res;
  }
}
