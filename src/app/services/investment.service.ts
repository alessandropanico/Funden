import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserSessionService } from './user-session.service'; // Importa il servizio

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  //db test
  private apiUrl = 'https://testapi.krathemis.com/api/digital-object/investments/by-user';

  //db prod
  // private apiUrl = 'https://api.krathemis.com/api/digital-object/investments/by-user';


  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private userSessionService: UserSessionService // Inietta il servizio UserSessionService
  ) { }

  getInvestment(): Observable<any> {
    return this.fetchWithToken();
  }

  private fetchWithToken(): Observable<any> {
    const token = this.userSessionService.getToken();

    if (!token) {
      console.error('❌ Token non trovato!');
      return throwError(() => new Error('Token non trovato!'));
    }

    console.log('🔑 Token attuale:', token);

    return this.http.get<any>(this.apiUrl, { headers: this.createHeaders(token) }).pipe(
      tap(response => {
        if (response.investments === null) {
          console.log('📉 Nessun investimento trovato per questo utente.');
        } else {
          console.log('✅ Dati ricevuti con successo:', response);
        }
      }),
      catchError(error => this.handleError(error))
    );
  }


  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401 || (error.status === 403 && error.error?.message === 'Token expired')) {
      console.warn('🔄 Token scaduto. Generando un nuovo token...');
      return this.refreshTokenAndRetry();  // ✅ Ora il tipo restituito è compatibile
    } else if (error.status === 403 && error.error?.message === 'User need a valid role') {
      console.error('⛔ Accesso negato: l\'utente non ha il ruolo richiesto.');
      return throwError(() => new Error('Accesso negato: ruolo non valido'));
    }

    console.error('❌ Errore imprevisto:', error);
    return throwError(() => new Error(error.message || 'Errore nella richiesta'));
  }

  private refreshTokenAndRetry(): Observable<any> {
    return this.authService.CreateToken().pipe(
      switchMap(auth => {
        if (!auth.token) {
          console.error('❌ Errore nel recupero del nuovo token');
          return throwError(() => new Error('Errore nel recupero del nuovo token'));
        }

        const newToken = auth.token;
        this.userSessionService.setToken(newToken); // Usa UserSessionService per salvare il nuovo token
        console.log('🔄 Nuovo token ottenuto:', newToken);

        return this.http.get<any>(this.apiUrl, { headers: this.createHeaders(newToken) }).pipe(
          tap(response => console.log('✅ Dati ricevuti con il nuovo token:', response))
        );
      })
    );
  }
}
