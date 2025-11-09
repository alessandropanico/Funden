import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  //test
  private authUrl = 'https://testapi.krathemis.com/api/auth/authentication'
  private apiUrl = 'https://testapi.krathemis.com/api/email-code';

  //prod
  // private authUrl = 'https://api.krathemis.com/api/auth/authentication';
  // private apiUrl = 'https://api.krathemis.com/api/email-code';

  constructor(private http: HttpClient) {}

  // Metodo per generare il token
  private generateToken(): Observable<string> {
    return this.http.post<any>(this.authUrl, {}).pipe(
      map(response => {
        const token = response.token; // Ottieni il token dalla risposta
        localStorage.setItem('tokenLogin', token); // Salva il token nel localStorage
        console.log('Token generato con successo:', token);
        return token;
      }),
      catchError(error => {
        console.error('Errore nella generazione del token:', error);
        return throwError(() => new Error('Errore nella generazione del token.'));
      })
    );
  }

  // Metodo per inviare l'email
  sendEmail(emailData: any): Observable<any> {
    return this.generateToken().pipe(
      // Una volta ottenuto il token, invia l'email
      switchMap(token => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        });

        return this.http.post<any>(this.apiUrl, emailData, { headers }).pipe(
          map(response => {
            console.log('Email inviata con successo:', response);
            return response;
          }),
          catchError(error => {
            console.error('Errore nell’invio dell’email:', error);
            return throwError(() => new Error(error.error.message || 'Errore nell’invio dell’email.'));
          })
        );
      })
    );
  }
}
