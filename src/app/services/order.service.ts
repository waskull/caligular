import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  httpClient = inject(HttpClient);
  baseURL = environment.baseURL;
  constructor() { }
  public create(user: any) {
    return this.httpClient.post<any>(`${this.baseURL}/order/`, user);
  }

  public update(user: any) {
    return this.httpClient.patch<any>(`${this.baseURL}/order/${user.id}`, user);
  }

  public delete(id: number) {
    return this.httpClient.delete<any>(`${this.baseURL}/order/${id}`);
  }

  public getAll(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}/order`);
  }

  public getReport(start: Date, end: Date) {
    return this.httpClient.post(`${this.baseURL}/order/date`, { start, end }, { responseType: 'blob'});
  }
  public getOrderReport(id: number) {
    return this.httpClient.post(`${this.baseURL}/order/report`, { id }, { responseType: 'blob'});
  }
}
