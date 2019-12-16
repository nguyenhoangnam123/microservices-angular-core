import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRoles } from 'app/shared/model/UserManagement/roles.model';

type EntityResponseType = HttpResponse<IRoles>;
type EntityArrayResponseType = HttpResponse<IRoles[]>;

@Injectable({ providedIn: 'root' })
export class RolesService {
  public resourceUrl = SERVER_API_URL + 'services/usermanagement/api/roles';

  constructor(protected http: HttpClient) {}

  create(roles: IRoles): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(roles);
    return this.http
      .post<IRoles>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(roles: IRoles): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(roles);
    return this.http
      .put<IRoles>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRoles>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRoles[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(roles: IRoles): IRoles {
    const copy: IRoles = Object.assign({}, roles, {
      dateCreated: roles.dateCreated != null && roles.dateCreated.isValid() ? roles.dateCreated.toJSON() : null,
      dateUpdated: roles.dateUpdated != null && roles.dateUpdated.isValid() ? roles.dateUpdated.toJSON() : null
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
      res.body.forEach((roles: IRoles) => {
        roles.dateCreated = roles.dateCreated != null ? moment(roles.dateCreated) : null;
        roles.dateUpdated = roles.dateUpdated != null ? moment(roles.dateUpdated) : null;
      });
    }
    return res;
  }
}
