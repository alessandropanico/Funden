
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(
    private router: Router,
    private loading: LoadingService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    if (localStorage.getItem('token')) request = req.clone({setHeaders: {Authorization: `Bearer ${ localStorage.getItem('token') }`}});
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) this.remueveTodo();
        return throwError( err );
      })
    );
  }
  remueveTodo() {
    localStorage.clear();
    this.router.navigateByUrl('/home');
    this.loading.loading = false;
  }
}
