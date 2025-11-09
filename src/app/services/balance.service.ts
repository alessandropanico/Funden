import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { UserGateway } from '../models/gateway/userGateway.model';

import { TOKEN_APP } from './interceptors/http.interceptor.service';
import { GeneralResponse } from '../models/general/response/generalResponse.model';
import { Balance } from '../models/balance/balance.model';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  constructor(private http: HttpClient) {}

  // Funzione per ottenere il bilancio dell'utente
  getBalance() {
    const userGateway = localStorage.getItem('userGateway');
    if (!userGateway) {
      throw new Error('User data not found in localStorage'); // Se non c'è 'userGateway', solleva un errore
    }

    // Analizziamo i dati dell'utente dal localStorage
    const user: UserGateway = JSON.parse(userGateway).user;
    if (!user) {
      throw new Error('User not found in parsed data');
    }

    return this.http
      .post<any>(`${environment.p73.url}/api/balance/get`, { user }, {
        context: new HttpContext().set(TOKEN_APP, { p73: true }),
      })
      .pipe(map((res) => res));
  }

  // Funzione per aggiungere saldo
  addBalance(balance: Balance) {
    const userGateway = localStorage.getItem('userGateway');
    if (!userGateway) {
      throw new Error('User data not found in localStorage');
    }

    const user: UserGateway = JSON.parse(userGateway).user;
    if (!user) {
      throw new Error('User not found in parsed data');
    }

    balance.user = user;
    return this.http.post<GeneralResponse>(`${environment.p73.url}/api/balance/add`, balance, { context: new HttpContext().set(TOKEN_APP, { p73: true }) })
      .pipe(map((res) => res));
  }

  // Funzione per acquistare con il saldo
  buyWithBalance(balance: Balance) {
    const userGateway = localStorage.getItem('userGateway');
    if (!userGateway) {
      throw new Error('User data not found in localStorage');
    }

    const user: UserGateway = JSON.parse(userGateway).user;
    if (!user) {
      throw new Error('User not found in parsed data');
    }

    balance.user = user;
    return this.http.post<GeneralResponse>(`${environment.p73.url}/api/balance/buy`, balance, { context: new HttpContext().set(TOKEN_APP, { p73: true }) })
      .pipe(map((res) => res));
  }
}
