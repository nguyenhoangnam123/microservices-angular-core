// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// Models
import { Zone } from './zone.model';
import { SERVER_API_URL } from 'app/app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ZoneService {
  /**
   * Service Constructor
   *
   * @param http: HttpClient
   */
  constructor(private http: HttpClient) {}
  getAllItems(): Observable<Zone[]> {
    const API_ZONE_URL = SERVER_API_URL + 'services/uaa/api/zones';
    return this.http.get<Zone[]>(API_ZONE_URL, httpOptions);
  }
}
