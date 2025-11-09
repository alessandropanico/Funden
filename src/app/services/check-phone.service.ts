import { Injectable } from '@angular/core';
import { catchError, map, switchMap, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckPhoneService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  checkPhone(prefix: string, phoneNumber: any): Observable<any> {
    // Converte phoneNumber in stringa se non lo è già
    phoneNumber = String(phoneNumber);

    // Rimuove il prefisso se già presente
    if (phoneNumber.startsWith(prefix)) {
      phoneNumber = phoneNumber.substring(prefix.length);
    }

    const url = `https://testapi.krathemis.com/api/auth/check-phone/${prefix}/${phoneNumber}`;
    let token = localStorage.getItem('tokenLogin');

    if (!token) {
      return this.authService.CreateToken().pipe(
        switchMap((authData) => {
          localStorage.setItem('tokenLogin', authData.token);
          return this.sendRequest(url, authData.token);
        }),
        catchError(() => throwError(() => new Error('Impossibile creare un nuovo token.')))
      );
    }

    return this.sendRequest(url, token);
  }



  private sendRequest(url: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    return this.http.get(url, { headers }).pipe(
      map(response => {
        console.log('✅ Numero trovato nel database:', response);
        return response;
      }),
      catchError(error => {
        console.error('Errore durante il controllo del numero:', error);
        let errorMessage = 'Errore sconosciuto durante la verifica del numero di telefono.';

        if (error.status === 400) {
          errorMessage = 'Errore: numero non valido.';
        } else if (error.status === 401) {
          errorMessage = 'Autenticazione fallita. Token non valido.';
        } else if (error.status === 404) {
          errorMessage = 'Numero non trovato nel database.';
        } else if (error.status === 500) {
          errorMessage = 'Errore del server. Riprova più tardi.';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
