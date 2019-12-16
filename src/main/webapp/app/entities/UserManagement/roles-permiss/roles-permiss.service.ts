import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRolesPermiss } from 'app/shared/model/UserManagement/roles-permiss.model';

type EntityResponseType = HttpResponse<IRolesPermiss>;
type EntityArrayResponseType = HttpResponse<IRolesPermiss[]>;

@Injectable({ providedIn: 'root' })
export class RolesPermissService {
  public resourceUrl = SERVER_API_URL + 'services/usermanagement/api/roles-permisses';

  constructor(protected http: HttpClient) {}

  create(rolesPermiss: IRolesPermiss): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rolesPermiss);
    return this.http
      .post<IRolesPermiss>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(rolesPermiss: IRolesPermiss): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rolesPermiss);
    return this.http
      .put<IRolesPermiss>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRolesPermiss>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRolesPermiss[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(rolesPermiss: IRolesPermiss): IRolesPermiss {
    const copy: IRolesPermiss = Object.assign({}, rolesPermiss, {
      dateCreated: rolesPermiss.dateCreated != null && rolesPermiss.dateCreated.isValid() ? rolesPermiss.dateCreated.toJSON() : null,
      dateUpdated: rolesPermiss.dateUpdated != null && rolesPermiss.dateUpdated.isValid() ? rolesPermiss.dateUpdated.toJSON() : null
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
      res.body.forEach((rolesPermiss: IRolesPermiss) => {
        rolesPermiss.dateCreated = rolesPermiss.dateCreated != null ? moment(rolesPermiss.dateCreated) : null;
        rolesPermiss.dateUpdated = rolesPermiss.dateUpdated != null ? moment(rolesPermiss.dateUpdated) : null;
      });
    }
    return res;
  }
}
