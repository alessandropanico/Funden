import {
  HttpClient,
  HttpContext,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { LoginUser } from '../models/login/requets/loginUser.model';
import { LoginResponse } from '../models/login/response/loginResponse.model';
import { LoginResponseGateway } from '../models/gateway/response/login.model';

import { TOKEN_APP } from './interceptors/http.interceptor.service';
import { environment } from '../environments/environment';

import { AccountRequest } from '../models/registerAccount/request/accountRequest.model';
import { AccountRespose } from '../models/registerAccount/response/accountResponse';
import { Profile } from '../models/profile/profile.model';
import { ProfileReponse } from '../models/profile/response/profileResponse.model';

import { UserGateway } from '../models/gateway/userGateway.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userLogin: LoginResponse | undefined; // Dichiarazione senza inizializzazione
  userLoginGateway: LoginResponseGateway = new LoginResponseGateway();

  constructor(private http: HttpClient, private router: Router) {}

  login(loginUser: LoginUser) {
    localStorage.setItem('email', loginUser.email);

    return this.http
      .post<any>(environment.etixPay.url + '/api/v1/login', loginUser)
      .pipe(
        switchMap((res1) => {
          // Passiamo res1.data al costruttore di LoginResponse
          this.userLogin = new LoginResponse(res1.data);  // Passa il dato corretto
          this.saveLocalStorage(this.userLogin);

          return this.http
            .get<LoginResponseGateway>(
              environment.gateway.url + '/api/auth/login-token',
              {
                context: new HttpContext().set(TOKEN_APP, {
                  loginGateway: true,
                }),
              }
            )
            .pipe(
              map(async (res2) => {
                this.userLoginGateway = res2;
                localStorage.setItem(
                  'userGateway',
                  JSON.stringify(this.userLoginGateway.data)
                );
                this.sessionStared().subscribe();
                return true;
              }),
              catchError((error: HttpErrorResponse) => {
                return throwError(error);
              })
            );
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  saveLocalStorageGateway(login: LoginResponseGateway) {
    localStorage.setItem('userGateway', JSON.stringify(login.data));
  }

  saveLocalStorage(login: LoginResponse) {
    const loginStorage = {
      token: login.data.token,
      username: login.data.username,
    };
    localStorage.setItem('user', JSON.stringify(loginStorage));
  }

  isLoged() {
    const loginStorage = localStorage.getItem('userGateway');

    // Verifica se loginStorage è null o se access_token non esiste
    if (loginStorage) {
      const parsedLogin = JSON.parse(loginStorage);
      return parsedLogin.access_token ? true : false;
    } else {
      return false;
    }
  }


  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    localStorage.removeItem('userGateway');
    this.router.navigate(['/home']);
  }

  createAccount(account: AccountRequest) {
    localStorage.setItem('email', account.email);
    return this.http
      .post<AccountRespose>(
        environment.gateway.url + '/api/auth/register',
        account
      )
      .pipe(
        switchMap((res1) => {
          const profile: Profile = {
            description: account.email,
            userID: res1.data.main_user_id.toString(),
            idProfileType: 1,
          };

          return this.http
            .post<ProfileReponse>(
              environment.p73.url + '/api/profile/create',
              profile,
              { context: new HttpContext().set(TOKEN_APP, { p73: true }) }
            )
            .pipe(
              map((res2) => {
                return true;
              })
            )
            .pipe(
              catchError((error: HttpErrorResponse) => {
                return throwError(error);
              })
            );
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  sessionStared() {
    const userGateway = localStorage.getItem('userGateway');
    if (userGateway) {
      const user: UserGateway = JSON.parse(userGateway).user;

      return this.http
        .post<ProfileReponse>(
          environment.p73.url + '/api/dashboard/session-stared',
          { userID: user.main_user_id },
          { context: new HttpContext().set(TOKEN_APP, { p73: true }) }
        )
        .pipe(
          map((res) => {
            return true;
          })
        )
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError(error);
          })
        );
    } else {
      // Gestire il caso in cui 'userGateway' non è trovato in localStorage
      return throwError('User data not found in localStorage');
    }
  }

}
