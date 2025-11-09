import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse,
  HttpContextToken,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

interface TokenApps {
  p73?: boolean;
  etixPay?: boolean;
  etixMarket?: boolean;
  login?: boolean;
  loginGateway?: boolean;
  imageGenerate?: boolean
}

const tokenApps: TokenApps = {
  p73: false,
  etixPay: false,
  etixMarket: false,
  login: false,
  loginGateway: false,
  imageGenerate: false
};

export const TOKEN_APP = new HttpContextToken<TokenApps>(() => tokenApps);

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let tokenLogin = '';

    // Ottieni il token dal localStorage, usa '' se non esiste
    const loginStorage = localStorage.getItem('user');
    if (loginStorage) {
      const parsedLoginStorage = JSON.parse(loginStorage);
      tokenLogin = parsedLoginStorage.token || '';  // Usa un valore di default vuoto
    }

    // Ottieni la lingua dal localStorage, usa 'en' se non esiste
    let language = JSON.parse(localStorage.getItem('lenguaje') || '{"len": "en"}')["len"];

    // Inizializza la variabile 'authorization'
    let authorization;

    // Aggiungi il token p73 se presente nel contesto
    if (req.context.get(TOKEN_APP).p73) authorization = environment.p73.token;

    // Aggiungi il token loginGateway se presente
    if (req.context.get(TOKEN_APP).loginGateway)
      authorization = 'Bearer ' + tokenLogin;

    let reqClone;

    // Crea la richiesta con i corretti headers
    if (authorization) {
      reqClone = req.clone({
        headers: req.headers
          .set('Content-Type', 'application/json')
          .set('accept', 'application/json')
          .set('X-localization', language)
          .set('APP-NAME', 'p73')
          .set('Authorization', authorization),
      });
    } else {
      reqClone = req.clone({
        headers: req.headers
          .set('Content-Type', req.context.get(TOKEN_APP).imageGenerate ? 'application/x-www-form-urlencoded' : 'application/json')
          .set('accept', 'application/json')
          .set('X-localization', language)
          .set('APP-NAME', 'p73'),
      });
    }

    // Gestisci la risposta HTTP
    return next.handle(reqClone).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status >= 400 && err.status <= 499) {
          let message = err.error.message;
          if (message) {
            this.toastr.error(message, 'Error');
          } else {
            message = 'Server error.';
            this.toastr.error(message, 'Error');
          }
          return throwError(err);
        } else {
          this.toastr.error('Server error.', 'Error');
          return throwError(err);
        }
      })
    );
  }
}
