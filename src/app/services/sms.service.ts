import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Login, RespLogin } from '../interfaces/login';

interface PinResponse {
  success: boolean;
  message: string;
  data?: any; // Se la risposta contiene altri dati annidati
  id?: string;
  prog?: number;
  email?: string | null;
  phoneNumber?: string; // Aggiungi questa proprietà
  userID?: string;
  countryCode?: string;  // Aggiungi questo campo

  // Aggiungi altre proprietà se necessario
}


interface SmsResponse {
  entity: {
    id: string;  // Questo è l'ID che ti serve come 'idResponse'
    // Aggiungi altre proprietà se necessario
  };
  success: boolean;
  message: string;
  idResponse?: string; // Questa è la nostra proprietà che conterrà l'ID da usare
}


@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(private http: HttpClient,
    private authService: AuthService,
  ) { }

  idResponse: string | undefined;

  //-------------------------------------------
  //GET SMS

  // Verifica codice SMS con idResponse(confronto codice)
  checkSmsCode(code: string): Observable<any> {
    if (!this.idResponse) {
      return throwError(() => new Error('idResponse non trovato.'));
    }

    const url = `https://testapi.krathemis.com/api/sms-code/check/${code}/${this.idResponse}`;
    let token = localStorage.getItem('tokenLogin');

    if (!token) {
      return throwError(() => new Error('Token di autenticazione mancante.'));
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    console.log('📤 Verifica codice SMS con idResponse:', { code, idResponse: this.idResponse });

    return this.http.get(url, { headers }).pipe(
      map(response => {
        console.log('✅ Codice SMS verificato con successo:', response);
        return response;
      }),
      catchError(error => {
        console.error('Errore verifica SMS:', error);

        // Se il token è scaduto (errore 401), rigenera e riprova
        if (error.status === 401) {
          console.warn('🔄 Token scaduto. Rigenerazione in corso...');

          return this.authService.CreateToken().pipe(
            switchMap(auth => {
              console.log('✅ Nuovo token generato:', auth.token);
              localStorage.setItem('tokenLogin', auth.token);
              this.authService.token = auth.token;

              // Riproviamo la richiesta con il nuovo token
              const newHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`,
                'Accept': 'application/json'
              });

              return this.http.get(url, { headers: newHeaders });
            })
          );
        }

        let errorMessage = 'Errore sconosciuto durante la verifica del codice SMS.';
        if (error.status === 400) errorMessage = 'Errore: Codice SMS non valido.';
        if (error.status === 500) errorMessage = 'Errore del server. Riprova più tardi.';
        if (error.error?.message) errorMessage = error.error.message;

        return throwError(() => new Error(errorMessage));
      })
    );
  }





  //-------------------------------------------
  //METODO BACK-END SMS (mi arriva il codice su cellulare)
  sendSmsCode(phoneNumber: string): Observable<SmsResponse> {
    const url = 'https://testapi.krathemis.com/api/sms-code';
    let token = localStorage.getItem('tokenLogin');

    if (!token) {
      return throwError(() => new Error('Token di autenticazione mancante.'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Usa direttamente il token salvato
    });

    const body = {
      from: "Instasent",
      to: phoneNumber,
      text: "Your activation code is",
      languageCode: "IT"
    };

    console.log('Inviando richiesta SMS:', body); // Log per debug

    return this.http.post<SmsResponse>(url, body, { headers }).pipe(
      map(response => {
        console.log('✅ SMS inviato con successo:', response);
        this.idResponse = response.entity.id;
        return { ...response, idResponse: this.idResponse };
      }),
      catchError(error => {
        console.error('Errore invio SMS:', error);

        // Se il token è scaduto (errore 401), creiamo un nuovo token e riproviamo
        if (error.status === 401) {
          console.warn('🔄 Token scaduto. Rigenerazione in corso...');
          return this.authService.CreateToken().pipe(
            switchMap(auth => {
              console.log('✅ Nuovo token generato:', auth.token);
              localStorage.setItem('tokenLogin', auth.token);
              this.authService.token = auth.token;

              // Riproviamo la richiesta SMS con il nuovo token
              const newHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
              });

              return this.http.post<SmsResponse>(url, body, { headers: newHeaders });
            })
          );
        }

        let errorMessage = 'Errore sconosciuto durante l’invio dell’SMS.';
        if (error.status === 400) errorMessage = 'Errore: Dati non validi.';
        if (error.status === 500) errorMessage = 'Errore del server. Riprova più tardi.';
        if (error.error?.message) errorMessage = error.error.message;

        return throwError(() => new Error(errorMessage));
      })
    );
  }




  //----------------------------------------------
  //METODO BACK-END PIN UTENTE NORMALE

  private apiUrl = 'https://testapi.krathemis.com/api/user/check/pin';


  checkPinUser(pin: string): Observable<PinResponse> {
    if (!pin || pin.length !== 5) {
      return throwError(() => new Error('Il PIN deve essere di 5 cifre.'));
    }

    const token = localStorage.getItem('tokenLogin');
    if (!token) {
      return throwError(() => new Error('Token di autenticazione non trovato.'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { pin }; // Il backend accetta un oggetto { pin: "xxxxx" }

    console.log('Richiesta invio PIN:', JSON.stringify(body));
    console.log('Header Authorization:', headers.get('Authorization'));

    return this.http.post<PinResponse>(this.apiUrl, body, { headers }).pipe(
      map(response => {
        console.log('✅ PIN corretto:', response);
        return response;
      }),
      catchError(error => {
        console.error('Errore API:', error);

        let errorMessage = 'Errore sconosciuto';
        if (error.status === 400) {
          errorMessage = 'PIN errato.';
        } else if (error.status === 401) {
          errorMessage = 'Autenticazione fallita. Accedi di nuovo.';
        } else if (error.status === 500) {
          errorMessage = 'Errore del server. Riprova più tardi.';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }


  //----------------------------------------------
  //METODO PATCH CAMBIO PIN UTENTE PRIVATO



  nuovoPin(id: string, body: any): Observable<RespLogin> {  // Cambia il tipo di ritorno a RespLogin
    const url = `https://testapi.krathemis.com/api/user/pin/${id}`;
    let token = localStorage.getItem('tokenLogin');

    if (!token) {
      return throwError(() => new Error('Token di autenticazione mancante.'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    console.log('🔄 Inviando richiesta di recupero PIN', body);

    return this.http.patch<RespLogin>(url, body, { headers }).pipe(  // Cambia il tipo nel metodo HTTP
      map(response => {
        console.log('✅ PIN aggiornato con successo:', response);
        // Ora la risposta è di tipo RespLogin, quindi possiamo trattarla come tale
        this.idResponse = response.id;  // Usa il campo id di RespLogin
        return { ...response, idResponse: this.idResponse };
      }),
      catchError(error => {
        console.error('❌ Errore nel recupero del PIN:', error);

        let errorMessage = 'Errore sconosciuto durante il recupero del PIN.';

        if (error.status === 500) {
          errorMessage = 'Errore interno del server. Si prega di riprovare più tardi.';
        } else if (error.status === 400) {
          errorMessage = 'Errore: Dati non validi.';
        } else if (error.status === 404) {
          errorMessage = 'Errore: Utente non trovato.';
        } else if (error.status === 401) {
          console.warn('🔄 Token scaduto. Rigenerazione in corso...');
          return this.authService.CreateToken().pipe(
            switchMap(auth => {
              console.log('✅ Nuovo token generato:', auth.token);
              localStorage.setItem('tokenLogin', auth.token);
              this.authService.token = auth.token;

              const newHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
              });

              return this.http.patch<RespLogin>(url, body, { headers: newHeaders });
            })
          );
        }

        if (error.error?.message) {
          errorMessage = error.error.message;
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }











}
