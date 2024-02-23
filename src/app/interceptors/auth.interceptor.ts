import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const token = localStorage.getItem('token');
  const request = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + token),
  });

  return next(request).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        if (router.routerState.snapshot.url !== '/' || '/register') {
          router.navigateByUrl('/');
        }
      }

      return throwError(() => err);

    })
  );
};
