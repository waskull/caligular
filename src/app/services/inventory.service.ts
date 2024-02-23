import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  httpClient = inject(HttpClient);
  baseURL = environment.baseURL;
  constructor() { }

  public getAll(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}/inventory/stock`);
  }

  public getOne(id: number): Observable<any>{
    return this.httpClient.get<any[]>(`${this.baseURL}/inventory/${id}`);
  }
}
