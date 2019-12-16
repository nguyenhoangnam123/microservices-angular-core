import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUsers } from 'app/shared/model/UserManagement/users.model';

type EntityResponseType = HttpResponse<IUsers>;
type EntityArrayResponseType = HttpResponse<IUsers[]>;

@Injectable({ providedIn: 'root' })
export class UsersService {
  public resourceUrl = SERVER_API_URL + 'services/usermanagement/api/users';

  constructor(protected http: HttpClient) {}

  create(users: IUsers): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(users);
    return this.http
      .post<IUsers>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(users: IUsers): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(users);
    return this.http
      .put<IUsers>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUsers>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUsers[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(users: IUsers): IUsers {
    const copy: IUsers = Object.assign({}, users, {
      dateCreated: users.dateCreated != null && users.dateCreated.isValid() ? users.dateCreated.toJSON() : null,
      dateUpdated: users.dateUpdated != null && users.dateUpdated.isValid() ? users.dateUpdated.toJSON() : null,
      dateOnlineUpdated: users.dateOnlineUpdated != null && users.dateOnlineUpdated.isValid() ? users.dateOnlineUpdated.toJSON() : null,
      dateOfflineUpdated: users.dateOfflineUpdated != null && users.dateOfflineUpdated.isValid() ? users.dateOfflineUpdated.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateCreated = res.body.dateCreated != null ? moment(res.body.dateCreated) : null;
      res.body.dateUpdated = res.body.dateUpdated != null ? moment(res.body.dateUpdated) : null;
      res.body.dateOnlineUpdated = res.body.dateOnlineUpdated != null ? moment(res.body.dateOnlineUpdated) : null;
      res.body.dateOfflineUpdated = res.body.dateOfflineUpdated != null ? moment(res.body.dateOfflineUpdated) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((users: IUsers) => {
        users.dateCreated = users.dateCreated != null ? moment(users.dateCreated) : null;
        users.dateUpdated = users.dateUpdated != null ? moment(users.dateUpdated) : null;
        users.dateOnlineUpdated = users.dateOnlineUpdated != null ? moment(users.dateOnlineUpdated) : null;
        users.dateOfflineUpdated = users.dateOfflineUpdated != null ? moment(users.dateOfflineUpdated) : null;
      });
    }
    return res;
  }
}
