import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IZone } from 'app/shared/model/UserManagement/zone.model';

type EntityResponseType = HttpResponse<IZone>;
type EntityArrayResponseType = HttpResponse<IZone[]>;

@Injectable({ providedIn: 'root' })
export class ZoneService {
  public resourceUrl = SERVER_API_URL + 'services/usermanagement/api/zones';

  constructor(protected http: HttpClient) {}

  create(zone: IZone): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(zone);
    return this.http
      .post<IZone>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(zone: IZone): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(zone);
    return this.http
      .put<IZone>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IZone>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IZone[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(zone: IZone): IZone {
    const copy: IZone = Object.assign({}, zone, {
      dateCreated: zone.dateCreated != null && zone.dateCreated.isValid() ? zone.dateCreated.toJSON() : null,
      dateUpdated: zone.dateUpdated != null && zone.dateUpdated.isValid() ? zone.dateUpdated.toJSON() : null
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
      res.body.forEach((zone: IZone) => {
        zone.dateCreated = zone.dateCreated != null ? moment(zone.dateCreated) : null;
        zone.dateUpdated = zone.dateUpdated != null ? moment(zone.dateUpdated) : null;
      });
    }
    return res;
  }
}
