import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpClient = inject(HttpClient);
  baseURL = environment.baseURL;
  constructor() { }
  public create(user: any) {
    return this.httpClient.post<any>(`${this.baseURL}/item/`, user);
  }

  public update(user: any, id:number) {
    return this.httpClient.patch<any>(`${this.baseURL}/item/${id}`, user);
  }

  public delete(id: number) {
    return this.httpClient.delete<any>(`${this.baseURL}/item/${id}`);
  }

  public getAll(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}/item`);
  }
}
