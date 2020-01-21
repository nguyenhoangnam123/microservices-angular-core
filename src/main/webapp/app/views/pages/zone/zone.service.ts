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
  findById(id: number): Observable<Zone> {
    const API_GETBYID_ZONE_URL = SERVER_API_URL + `services/uaa/api/zones/${id}`;
    return this.http.get<Zone>(API_GETBYID_ZONE_URL, httpOptions);
  }
  deleteById(id: number): Observable<any> {
    const API_DELETE_ZONE_URL = SERVER_API_URL + `services/uaa/api/zones/${id}`;
    return this.http.delete<any>(API_DELETE_ZONE_URL, httpOptions);
  }
  createOrUpdateItem(zone: Zone): Observable<Zone> {
    const API_CREATE_ZONE_URL = SERVER_API_URL + `services/uaa/api/zones/addOrEdit`;
    return this.http.post<Zone>(API_CREATE_ZONE_URL, zone, httpOptions);
  }
}
