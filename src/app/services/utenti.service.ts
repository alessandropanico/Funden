import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUtentiPrivati(): Observable<any> {
    const token = localStorage.getItem('tokenLogin');

    // Verifica se il token è presente
    if (!token) {
      console.error('Token not found!');
      return throwError(() => new Error('Token not found!')); // Usa una funzione di fabbrica
    }

    console.log('Token:', token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json' 
    });

    //db test
    const apiUrl = 'https://testapi.krathemis.com/api/user?limit=100&offset=0&keyword=0&languageCode=IT'

    //db prod
    // // const apiUrl = 'https://api.krathemis.com/api/user?limit=100&offset=0&keyword=0&languageCode=IT';

    return this.http.get<any>(apiUrl, { headers }).pipe(
      map((response: any) => {
        // console.log('Response:', response);
        return response;
      }),
      catchError((error: any) => {
        console.error('Request Failed:', error); // Debug: verifica l'errore
        return throwError(() => new Error(error.message || 'Request failed')); // Usa una funzione di fabbrica
      })
    );
  }
}
