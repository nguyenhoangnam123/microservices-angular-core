import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserRoles } from 'app/shared/model/UserManagement/user-roles.model';

type EntityResponseType = HttpResponse<IUserRoles>;
type EntityArrayResponseType = HttpResponse<IUserRoles[]>;

@Injectable({ providedIn: 'root' })
export class UserRolesService {
  public resourceUrl = SERVER_API_URL + 'services/usermanagement/api/user-roles';

  constructor(protected http: HttpClient) {}

  create(userRoles: IUserRoles): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userRoles);
    return this.http
      .post<IUserRoles>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(userRoles: IUserRoles): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userRoles);
    return this.http
      .put<IUserRoles>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUserRoles>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUserRoles[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(userRoles: IUserRoles): IUserRoles {
    const copy: IUserRoles = Object.assign({}, userRoles, {
      dateCreated: userRoles.dateCreated != null && userRoles.dateCreated.isValid() ? userRoles.dateCreated.toJSON() : null,
      dateUpdated: userRoles.dateUpdated != null && userRoles.dateUpdated.isValid() ? userRoles.dateUpdated.toJSON() : null
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
      res.body.forEach((userRoles: IUserRoles) => {
        userRoles.dateCreated = userRoles.dateCreated != null ? moment(userRoles.dateCreated) : null;
        userRoles.dateUpdated = userRoles.dateUpdated != null ? moment(userRoles.dateUpdated) : null;
      });
    }
    return res;
  }
}
