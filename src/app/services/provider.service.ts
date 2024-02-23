import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  httpClient = inject(HttpClient);
  baseURL = environment.baseURL;
  constructor() { }
  public create(user: any) {
    return this.httpClient.post<any>(`${this.baseURL}/provider/`, user);
  }

  public update(user: any, id:number) {
    return this.httpClient.patch<any>(`${this.baseURL}/provider/${id}`, user);
  }

  public delete(id: number) {
    return this.httpClient.delete<any>(`${this.baseURL}/provider/${id}`);
  }

  public getAll(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}/provider`);
  }
}
