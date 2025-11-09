import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PhaseService } from '../../services/phase.service';
import { LoadingService } from '../../services/loading.service';
import { Router } from '@angular/router';
import { Login, RespLogin } from '../../interfaces/login';
import { AuthLoginService } from '../../services/auth-login.service';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../interfaces/auth';
import { Country } from '../../interfaces/login';
import { CountriesService } from '../../services/countries.service';
import { SmsService } from '../../services/sms.service';
import { PhaseprivateloginService } from '../../services/phaseprivatelogin.service';
import { UserSessionService } from '../../services/user-session.service';

@Component({
    selector: 'app-registerprivate',
    templateUrl: './registerprivate.component.html',
    styleUrl: './registerprivate.component.css',
    standalone: false
})
export class RegisterprivateComponent implements OnInit, OnDestroy {

  constructor(
    private phaseService: PhaseService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private loading: LoadingService,
    private router: Router,
    private authLogin: AuthLoginService,
    private authService: AuthService,
    private countriesService: CountriesService,
    private sms:SmsService,
    private cdr: ChangeDetectorRef,
    private phasePrivateLoginService:PhaseprivateloginService,
    private userSession: UserSessionService,
  ) { }

  goTo(){
    window.location.href='/home'
    this.phaseService.phase=1;
    this.phasePrivateLoginService.phaseLoginP=1;
    this.phaseService.clearPhoneData();
    this.phaseService.clearCode();
    this.userSession.clearToken(); // ✅ Rimuoviamo il token dal servizio
    this.userSession.clearUserData();  // Rimuove anche i dati utente
    this.cdr.detectChanges();
   }

  ngOnInit(): void {
    // Verifica se siamo nel browser prima di accedere a `window`
    if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth <= 600) {
        document.body.style.overflow = 'hidden';
      }
      this.phasePrivateLoginService.phaseLoginP=0;
      this.cdr.detectChanges();
    }

    //---
    this.authService.CreateToken().subscribe({
      next: async (data: Auth) => {
        this.authService.token = data.token;
        console.log('Token ricevuto:', this.authService.token); // Log del token
      },
      error: () => {
        console.error('Errore nella creazione del token');
      }
    });

    this.countriesService.getCountries().subscribe({
      next: async (data: Country[]) => {
        this.countriesService.countries = data;
        console.log('Paesi ricevuti:', this.countriesService.countries); // Log dei paesi
      },
      error: () => {
        console.error('Errore nel recupero dei paesi');
      }
    });


  }

  ngOnDestroy(): void {
    // Aggiungi la protezione anche in ngOnDestroy per il lato server
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  get phase(): number {
    return this.phaseService.phase;
  }

  get buttonPhase(): number {
    return this.phaseService.buttonPhase;
  }

  get continueButton(): boolean {
    return this.phaseService.continueButton;
  }


  //----------------------------------------------------

  uniqueId: string = '123'; // Aggiungi un valore unico per identificare l'input, se necessario.
  errorMessage='';


  verifySmsCode(code: string) {
    if (code.length !== 6) {
      this.errorMessage = "Il codice di verifica deve essere di 6 cifre.";

      return;
    }

    // Ora passiamo il codice completo alla funzione nel servizio
    this.sms.checkSmsCode(code).subscribe(
      response => {
        // Gestione della risposta positiva
        console.log('Codice VERIFICATO con SUCCESSO!!', response);
        // Aggiungi qui la logica per gestire il successo della verifica
        this.errorMessage = '';
        this.phaseService.continueButton=true;
        this.cdr.detectChanges(); // Forza l'aggiornamento della UI

      },
      error => {
        // Gestione dell'errore
        console.error('Errore verifica codice', error);
        // alert("Codice errato!");
        this.phaseService.resetPhoneNumber();
        this.errorMessage = error.message || 'Si è verificato un errore durante la verifica del codice.';
        this.phaseService.continueButton=false;
        this.cdr.detectChanges(); // Forza l'aggiornamento della UI

      }
    );
  }




  //----------------------------------------------------

  login: Login = {
    phone: '',
    countryCode: 'ES',
    pin: ''
  };
  pinCode = ['', '', '', '', ''];


  loguearse() {
    this.loading.loading = true;
    this.login.pin = this.phaseService.pinCode.join('');
    this.authLogin.login(this.login).subscribe({
      next: async (data: RespLogin) => {
        localStorage.setItem('tokenLogin', data.token);
        this.router.navigate(['/home']);
        this.loading.loading = false;
        this.loading.exito("Accesso effettuato con successo!");
      }, error: () => {
        this.loading.loading = false;
        this.loading.error("Errore nell'accesso. Controlla il prefisso, il numero di telefono e il pin.");
        this.phaseService.pinCode = ['', '', '', '', ''];
      }
    })
  }




}

