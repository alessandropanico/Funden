import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Auth } from '../interfaces/auth';
import { UserSessionService } from './user-session.service';  // Aggiungi importazione del servizio

@Injectable({
  providedIn: 'root'
})
export class LoginPrivatoService {

  constructor(
    private http: HttpClient,
    private userSession: UserSessionService  // Inietta il servizio per la gestione della sessione
  ) { }

  login(countryCode: string, phone: string, pin: string): Observable<any> {

     const url = 'https://testapi.krathemis.com/api/auth/login';

    // const url = 'https://api.krathemis.com/api/auth/login';


    // Recupera il token di autenticazione
    const token = localStorage.getItem('tokenLogin');
    if (!token) {
      return throwError(() => new Error('Token di autenticazione mancante.'));
    }

    // Formattazione del numero di telefono e del prefisso
    const formattedPhone = phone.replace(/\D/g, ''); // Rimuove tutti i caratteri non numerici
    const formattedCountryCode = countryCode.replace('+', ''); // Rimuove il '+'

    const body = {
      countryCode: formattedCountryCode,
      phone: formattedPhone,
      pin: pin
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    return this.http.post<Auth>(url, body, { headers }).pipe(
      map(response => {
        console.log('Login effettuato con successo:', response);

        // Salva il token nel UserSessionService
        const token = response.token;
        if (token) {
          this.userSession.setToken(token); // Usa il servizio per memorizzare il token
        }

        return response;
      }),
      catchError(error => {
        console.error('Errore durante il login:', error);
        return throwError(() => new Error('Errore nel login'));
      })
    );
  }
}
