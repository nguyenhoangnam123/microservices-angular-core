import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOperation } from 'app/shared/model/UserManagement/operation.model';

type EntityResponseType = HttpResponse<IOperation>;
type EntityArrayResponseType = HttpResponse<IOperation[]>;

@Injectable({ providedIn: 'root' })
export class OperationService {
  public resourceUrl = SERVER_API_URL + 'services/usermanagement/api/operations';

  constructor(protected http: HttpClient) {}

  create(operation: IOperation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(operation);
    return this.http
      .post<IOperation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(operation: IOperation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(operation);
    return this.http
      .put<IOperation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOperation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOperation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(operation: IOperation): IOperation {
    const copy: IOperation = Object.assign({}, operation, {
      dateCreated: operation.dateCreated != null && operation.dateCreated.isValid() ? operation.dateCreated.toJSON() : null,
      dateUpdated: operation.dateUpdated != null && operation.dateUpdated.isValid() ? operation.dateUpdated.toJSON() : null
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
      res.body.forEach((operation: IOperation) => {
        operation.dateCreated = operation.dateCreated != null ? moment(operation.dateCreated) : null;
        operation.dateUpdated = operation.dateUpdated != null ? moment(operation.dateUpdated) : null;
      });
    }
    return res;
  }
}
