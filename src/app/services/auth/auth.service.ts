import { Injectable, inject, signal } from '@angular/core';
import { IRegisterUser, IUser, User } from '../../interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient = inject(HttpClient);
  baseURL = environment.baseURL;
  constructor() {
    this.reAuth().subscribe((res: IUser) => {
      // console.log(res);
      this.currentUser.set(res);
    });
  }

  currentUser = signal<User | IUser | undefined | null>(undefined);

  public login({ email, password }: { email: string, password: string }) {
    return this.httpClient.post<any>(`${this.baseURL}/auth/login`, { email, password });
  }

  public getInfo(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.baseURL}/auth/me`);
  }

  public reset({email}: {email: string}){
    return this.httpClient.post<any>(`${this.baseURL}/auth/resetpassword`, { email });
  }

  public resetPassword({email,code,password}: {email: string,code:string,password:string}){
    return this.httpClient.post<any>(`${this.baseURL}/auth/repass`, { email,code,password });
  }

  public reAuth(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.baseURL}/auth/me`);
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.currentUser.set(undefined);
  }

  public register(user: IRegisterUser) {
    return this.httpClient.post<any>(`${this.baseURL}/user/register`, user);
  }

  handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Un error ha ocurrido obteniendo los datos';
    if (err) {
      console.log(err);
      errorMessage = `Error: ${err.error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

}
