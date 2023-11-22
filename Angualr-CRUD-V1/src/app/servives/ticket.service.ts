import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost:3000/tickets'; // URL zum JSON-Server für Ticketdaten

  constructor(private _http: HttpClient) { }

  addTicket(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data);
  }

  updateTicket(id: number, data: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/${id}`, data);
  }

  getTicketList(): Observable<any> {
    return this._http.get(this.apiUrl);
  }

  deleteTicket(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`);
  }
}
