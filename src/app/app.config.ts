import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), DatePipe,provideHttpClient(withInterceptors([
    authInterceptor
  ]))]
};
