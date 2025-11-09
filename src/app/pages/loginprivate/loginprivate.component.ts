import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
import { PhaseService } from '../../services/phase.service';
import { UtentiService } from '../../services/utenti.service';
import { Company } from '../../interfaces/company';
import { UserSessionService } from '../../services/user-session.service';

@Component({
  selector: 'app-loginprivate',
  templateUrl: './loginprivate.component.html',
  styleUrl: './loginprivate.component.css'
})
export class LoginprivateComponent {

  constructor(private phasePrivateLogin: PhaseprivateloginService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private loading: LoadingService,
    private router: Router,
    private authLogin: AuthLoginService,
    private authService: AuthService,
    private countriesService: CountriesService,
    private sms: SmsService,
    private cdr: ChangeDetectorRef,
    private phaseService: PhaseService,
    private utentiService: UtentiService,
    private userSession: UserSessionService,

  ) { }


  get loginImm():boolean{
    return this.phasePrivateLogin.loginImm;
  }

  get pinImm():boolean{
    return this.phasePrivateLogin.pinImm;
  }

  goTo() {
    window.location.href='/home'
    this.phaseService.phase = 1;
    this.phasePrivateLogin.phaseLoginP = 1;
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
    }
    this.phaseService.phase = 0;
    this.cdr.detectChanges();

  }


  get phaseLoginP(): number {
    return this.phasePrivateLogin.phaseLoginP;
  }


  utenti: Company[] = [];

  getUtentiPrivati() {
    this.utentiService.getUtentiPrivati().subscribe({
      next: (data: Company[]) => {
        this.utenti = data;  // Salva localmente nel componente
        //  console.log("UTENTI CARICATI: ", this.utenti);
      },
      error: () => {
        this.utenti = [];  // In caso di errore
        //  console.error("Errore nel caricamento dei paesi");
      }
    });
  }

  //----------------------------------------------------

  get phasePin():number{
    return this.phasePrivateLogin.phasePin;
  }

  uniqueId: string = '222'; // Aggiungi un valore unico per identificare l'input, se necessario.
  errorMessage='';


  verifySmsCodePIN(code: string) {

    console.log("🟢 Metodo verifySmsCodePIN chiamato con codice:", code);

    if (code.length !== 6) {
      this.errorMessage = "Il codice di verifica deve essere di 6 cifre.";

      return;
    }

    console.log("🟢 22 Metodo verifySmsCodePIN chiamato con codice:", code);


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


}
