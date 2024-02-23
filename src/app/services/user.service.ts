import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IRegisterUser, User } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient = inject(HttpClient);
  baseURL = environment.baseURL;
  constructor() { }

  public create(user: IRegisterUser) {
    return this.httpClient.post<any>(`${this.baseURL}/user/`, user);
  }
  
  public updateProfile(user: IRegisterUser) {
    return this.httpClient.patch<any>(`${this.baseURL}/user/profile`, user);
  }

  public update(user: User, id: number) {
    return this.httpClient.patch<any>(`${this.baseURL}/user/${id}`, user);
  }

  public delete(user: number) {
    return this.httpClient.delete<any>(`${this.baseURL}/user/${user}`);
  }

  public getAll(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}/user`);
  }
  public getAllDelivery(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}/user/delivery`);
  }
  
}
