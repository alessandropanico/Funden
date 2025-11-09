import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {

  private _token: string = '';
  get token(): string { return this._token; }
  set token(value: string) { this._token = value; }

  // La variabile url è definita qui
  url = 'https://testapi.krathemis.com/api/';

  constructor( private http: HttpClient ) { }

  // Correzione del metodo CreateToken
  CreateToken() {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    };

    // Usa direttamente `this.url` senza ripetere `auth/authentication`
    return this.http.post<Auth>(`${this.url}auth/authentication`, {}, { headers })
      .pipe(
        map((data: Auth) => {
          return data;
        })
      );
  }
}
