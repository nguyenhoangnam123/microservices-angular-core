// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';

// Models
import { MenuItem } from '../models/menu.model';
import { SERVER_API_URL } from 'app/app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MenuService {
  /**
   * Service Constructor
   *
   * @param http: HttpClient
   */
  constructor(private http: HttpClient) {}

  /**
   * Returns data from fake server
   */
  getAllItems(): Observable<MenuItem[]> {
    const API_MENU_URL = SERVER_API_URL + 'services/uaa/api/menus';
    return this.http.get<MenuItem[]>(API_MENU_URL, httpOptions);
  }

  deleteItem(id: number): Observable<MenuItem> {
    const API_DELETE_MENU_URL = SERVER_API_URL + `services/uaa/api/menus/${id}`;
    return this.http.delete<MenuItem>(API_DELETE_MENU_URL, httpOptions);
  }

  createOrUpdateItem(menu: MenuItem): Observable<MenuItem> {
    const API_CREATE_MENU_URL = SERVER_API_URL + `services/uaa/api/menus`;
    if (menu.id > 0) {
      return this.http.put<MenuItem>(API_CREATE_MENU_URL, menu, httpOptions);
    } else {
      return this.http.post<MenuItem>(API_CREATE_MENU_URL, menu, httpOptions);
    }
  }

  findById(id: number): Observable<MenuItem> {
    const API_GETBYID_MENU_URL = SERVER_API_URL + `services/uaa/api/menus/${id}`;
    return this.http.get<MenuItem>(API_GETBYID_MENU_URL, httpOptions);
  }
}
