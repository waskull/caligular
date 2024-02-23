import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private httpClient = inject(HttpClient);
  baseURL = environment.baseURL;

  constructor() { }
  public create(sale: any) {
    return this.httpClient.post<any>(`${this.baseURL}/sale/`, sale);
  }

  public update(id: number, delivery_man: number) {
    return this.httpClient.patch<any>(`${this.baseURL}/sale/confirm/${id}`, { delivery_man_id: delivery_man });
  }

  public completeSale(id: number, delivery_man: number) {
    return this.httpClient.patch<any>(`${this.baseURL}/sale/complete/${id}`, { delivery_man_id: delivery_man });
  }

  public cancel(id: any) {
    return this.httpClient.patch<any>(`${this.baseURL}/sale/syscancel/${id}`, {});
  }

  public delete(id: number) {
    return this.httpClient.delete<any>(`${this.baseURL}/sale/${id}`);
  }

  public getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/sale`);
  }

  public getStats() {
    return this.httpClient.get<any>(`${this.baseURL}/sale/stats`);
  }

  public getLastFourBills() {
    return this.httpClient.get<any[]>(`${this.baseURL}/sale/lastfour`);
  }

  public getSalesByDate(start: Date, end: Date) {
    return this.httpClient.post(`${this.baseURL}/sale/date`, { start, end }, { responseType: 'blob'});
  }

  public getSaleReportById(id: number) {
    return this.httpClient.post(`${this.baseURL}/sale/report`, { id }, { responseType: 'blob'});
  }

}
