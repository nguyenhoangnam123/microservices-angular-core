import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMenuZone } from 'app/shared/model/UserManagement/menu-zone.model';

type EntityResponseType = HttpResponse<IMenuZone>;
type EntityArrayResponseType = HttpResponse<IMenuZone[]>;

@Injectable({ providedIn: 'root' })
export class MenuZoneService {
  public resourceUrl = SERVER_API_URL + 'services/usermanagement/api/menu-zones';

  constructor(protected http: HttpClient) {}

  create(menuZone: IMenuZone): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(menuZone);
    return this.http
      .post<IMenuZone>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(menuZone: IMenuZone): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(menuZone);
    return this.http
      .put<IMenuZone>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMenuZone>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMenuZone[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(menuZone: IMenuZone): IMenuZone {
    const copy: IMenuZone = Object.assign({}, menuZone, {
      dateCreated: menuZone.dateCreated != null && menuZone.dateCreated.isValid() ? menuZone.dateCreated.toJSON() : null,
      dateUpdated: menuZone.dateUpdated != null && menuZone.dateUpdated.isValid() ? menuZone.dateUpdated.toJSON() : null
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
      res.body.forEach((menuZone: IMenuZone) => {
        menuZone.dateCreated = menuZone.dateCreated != null ? moment(menuZone.dateCreated) : null;
        menuZone.dateUpdated = menuZone.dateUpdated != null ? moment(menuZone.dateUpdated) : null;
      });
    }
    return res;
  }
}
