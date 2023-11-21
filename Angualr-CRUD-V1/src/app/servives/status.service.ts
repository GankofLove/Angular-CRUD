import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private _http: HttpClient) { }

  addStatus(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/status', data);
  }

  updateStatus(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/status/${id}`, data);
  }

  getStatusList(): Observable<any> {
    return this._http.get('http://localhost:3000/status');
  }

  deleteStatus(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/status/${id}`)
  }

}

