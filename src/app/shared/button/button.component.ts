import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { PhaseService } from '../../services/phase.service';
import { LoadingService } from '../../services/loading.service';
import { ValidationPhoneService } from '../../services/validation-phone.service';
import { GenerateSmsCodeService } from '../../services/generate-sms-code.service';
import { CheckSmsCodeService } from '../../services/check-sms-code.service';
import { CountriesService } from '../../services/countries.service';
import { SmsService } from '../../services/sms.service';
import { RegistrationService } from '../../services/registration.service';
import { ResponseRequestRegisterUser } from '../../interfaces/response-request-register-user';
import { PhaseprivateloginService } from '../../services/phaseprivatelogin.service';
import { CheckPhoneService } from '../../services/check-phone.service';
import { LoginPrivatoService } from '../../services/login-privato.service';
import { Router } from '@angular/router';
import { Country } from '../../interfaces/country';
import { Login, RespLogin } from '../../interfaces/login';
import { AuthLoginService } from '../../services/auth-login.service';
import { UserSessionService } from '../../services/user-session.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  standalone:false,

})
export class ButtonComponent implements OnInit {



  constructor(
    private phaseService: PhaseService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private loading: LoadingService,
    private validationPhoneService: ValidationPhoneService,
    private generateSmsCodeService: GenerateSmsCodeService,
    private checkSmsCodeService: CheckSmsCodeService,
    public countriesService: CountriesService,
    private sms: SmsService,
    private registrationService: RegistrationService,
    private phasePrivateLogin: PhaseprivateloginService,
    private checkPhoneService: CheckPhoneService,
    private loginPrivate: LoginPrivatoService,
    private router: Router,
    private authLogin: AuthLoginService,
    private userSession: UserSessionService,

  ) { }

  ngOnInit(): void {
    this.loadCountries()
  }

  @Output() simulazione: EventEmitter<any> = new EventEmitter();

  get phasePin(): number {
    return this.phasePrivateLogin.phasePin;
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

  get phaseLoginP(): number {
    return this.phasePrivateLogin.phaseLoginP;
  }

  get buttonLogin(): boolean {
    return this.phasePrivateLogin.buttonLogin;
  }


  incrementPhase() {
    this.phaseService.incrementPhase();
    if (this.phase == 2) {
      this.phaseService.startTimer();
      this.phaseService.continueButton=false;
    }
    else {
      this.phaseService.stopTimer();
    }
  }

  step1() {
    this.salvaNumero(); // 🔹 Memorizza prefisso e numero nel PhaseService

    const phoneNumber = this.phaseService.getPrefix() + this.phaseService.getPhoneNumber();
    const prefix = this.phaseService.getPrefix(); // Ottieni il prefisso separatamente

    this.checkPhoneService.checkPhone(prefix, phoneNumber).subscribe({
      next: (response) => {
        console.log('✅ Numero già registrato:', response);

        console.log("Fase login prima dell'incremento:", this.phasePrivateLogin.phaseLoginP);

        this.phasePrivateLogin.incrementPhaseLoginPrivate();
        console.log("Fase login dopo primo incremento:", this.phasePrivateLogin.phaseLoginP);

        this.phasePrivateLogin.incrementPhaseLoginPrivate();
        console.log("Fase login dopo secondo incremento:", this.phasePrivateLogin.phaseLoginP);

        this.cdr.detectChanges();

        setTimeout(() => {
          console.log("Fase login dopo timeout:", this.phasePrivateLogin.phaseLoginP);
        }, 0);

        this.router.navigate(['/loginprivate']);
      },
      error: (error) => {
        console.log("❌ Numero non registrato, procedo con la registrazione.", error);
        this.inviaSmsCodice();
        this.phaseService.incrementPhase();
        this.phaseService.startTimer();
      }
    });
  }


  salvaNumero() {
    this.phaseService.setPrefix(this.validationPhoneService.prefix);
    this.phaseService.setPhoneNumber(this.validationPhoneService.phoneNumber);
  }



  //-----------------------------------------
  //METODI BACK-END

  inviaSmsCodice() {
    const phoneNumber = this.phaseService.getPrefix() + this.phaseService.getPhoneNumber();

    this.sms.sendSmsCode(phoneNumber).subscribe({
      next: (response) => {
        console.log('SMS inviato con successo:', response);
        this.phaseService.continueButton = true;
      },
      error: (error) => {
        console.error("Errore nell'invio dell'SMS:", error);
        alert("Errore nell'invio del codice SMS.");

        // Reset del numero di telefono e dello stato
        this.phaseService.clearPhoneData();
        this.phaseService.clearCode();
        this.phaseService.phase = 1;
        this.phaseService.continueButton = false;
        this.phaseService.stopTimer();
        this.phaseService.inputNone = false;

        // Rileva i cambiamenti per aggiornare la UI
        this.cdr.detectChanges();

      }
    });
  }

  //-----------------------------------------

  registration() {
    this.loading.loading = true;

    // Creiamo il payload con i dati corretti
    const pin = this.phaseService.pinCode.join('');  // Unisci il PIN in una stringa

    // Controllo sulla lunghezza del PIN
    if (pin.length !== 5) {
      alert("Il PIN deve essere di 5 cifre!");
      this.loading.loading = false;
      return;
    }

    this.registrationService.user.pin = pin;

    this.registrationService.user.phoneNumber =
      (this.validationPhoneService.prefix + this.validationPhoneService.phoneNumber).toString(); // ✅ Convertito in stringa

    const country = this.countriesService.countries.find(
      (c) => c.phonePrefix === this.validationPhoneService.prefix
    );

    if (!country) {
      this.loading.error("Errore: countryID non trovato per il prefisso " + this.validationPhoneService.prefix);
      this.loading.loading = false;
      return;
    }

    this.registrationService.user.countryID = country.id; // ✅ Ora è un UUID

    // 🔎 Debug: controlliamo i dati prima di inviare
    console.log("Payload inviato:", this.registrationService.user);

    // Controllo lunghezza telefono
    if (this.registrationService.user.phoneNumber.length > 20) {
      alert("Errore: Numero di telefono troppo lungo.");
      this.loading.loading = false;
      return;
    }

    this.registrationService.registerUser().subscribe({
      next: async (data: ResponseRequestRegisterUser) => {
        this.loading.loading = false;
        this.phaseService.incrementPhase();
        this.cdr.detectChanges();

      },
      error: (error) => {
        this.loading.loading = false;
        console.error("Errore nella registrazione:", error);
        alert("Si è verificato un errore, riprova.");
      }
    });


  }


  //----------------------------------------------------------
  //PARTE RIGUARDANTE IL LOGIN PRIVATI
  countries: Country[] = [];


  loadCountries() {
    this.countriesService.getCountries().subscribe({
      next: (data: Country[]) => {
        this.countries = data;  // Salva localmente nel componente
        console.log("PAESI CARICATI: ", this.countries);
      },
      error: () => {
        this.countries = [];  // In caso di errore
        console.error("Errore nel caricamento dei paesi");
      }
    });
  }

  incrementPhaseLoginPrivate() {
    this.phasePrivateLogin.incrementPhaseLoginPrivate();
    this.phaseService.phase = 0;
  }

  verificationNumber() {
    // Costruisce il numero di telefono completo concatenando prefisso e numero
    const phoneNumber = this.phaseService.getPrefix() + this.phaseService.getPhoneNumber();
    const prefix = this.phaseService.getPrefix(); // Ottieni il prefisso separatamente

    // Chiama il servizio per verificare il numero
    this.checkPhoneService.checkPhone(prefix, phoneNumber).subscribe({
      next: (response) => {

        // Numero trovato nel database o valido
        console.log('Numero verificato con successo:', response);
        this.phasePrivateLogin.incrementPhaseLoginPrivate();
        this.phaseService.phase = 0; // Torna alla fase iniziale

      },
      error: (error) => {
        console.error("Errore durante la verifica del numero:", error);
        alert("Errore nel controllo del numero di telefono.");

        // Reset del numero di telefono e dello stato
        this.phaseService.resetPhoneNumber();

        // Azzera anche gli altri stati se necessario
        this.phaseService.phase = 0; // Torna alla fase iniziale
        this.phasePrivateLogin.phaseLoginP = 1;
        this.phaseService.continueButton = false; // Disabilita il pulsante di continua
        this.phaseService.stopTimer(); // Ferma il timer se in uso

        // Forza il rilevamento dei cambiamenti per aggiornare la UI
        this.cdr.detectChanges();
      }
    });
  }


  loginPrivato() {
    this.loading.loading = true;

    const pin = this.phaseService.pinCode.join(''); // Combina il PIN che è un array di numeri

    if (pin.length !== 5) {
      alert("Il PIN deve essere di 5 cifre!");
      this.loading.loading = false;
      return;
    }

    // Combina il prefisso e il numero di telefono
    const phoneNumber = `${this.validationPhoneService.prefix}${this.validationPhoneService.phoneNumber}`;

    // Rimuovi il prefisso dal numero di telefono per il payload
    const phoneWithoutPrefix = phoneNumber.replace(this.validationPhoneService.prefix, '');

    if (!this.countries || this.countries.length === 0) {
      alert("Errore: la lista dei paesi non è stata caricata.");
      this.loading.loading = false;
      return;
    }

    const prefixToFind = this.validationPhoneService.prefix.replace('+', '');

    const country = this.countries.find(
      (c) => c.phonePrefix === prefixToFind || c.phonePrefix === `+${prefixToFind}`
    );

    if (!country) {
      alert(`Errore: countryID non trovato per il prefisso ${this.validationPhoneService.prefix}`);
      this.loading.loading = false;
      return;
    }

    // Costruisci i dati per la login
    const loginData = {
      countryCode: country.code,  // Codice del paese (es: "IT")
      phone: phoneWithoutPrefix,   // Numero di telefono senza prefisso
      pin: pin
    };

    console.log("✅ Payload di login inviato:", loginData);

    this.loginPrivate.login(loginData.countryCode, loginData.phone, loginData.pin).subscribe({
      next: async (data: any) => {
        this.loading.loading = false;
        console.log('✅ Login effettuato con successo:', data);
        this.userSession.setUserData(data);  // Salviamo i dati nel localStorage
        // this.router.navigate(['/home']);
        window.location.href = '/home';
      },
      error: (error) => {
        this.loading.loading = false;
        console.error("❌ Errore nel login:", error);
        alert("Si è verificato un errore, riprova.");

        this.phaseService.clearPhone();
        this.phaseService.clearPhoneData();
        this.phaseService.prefix = '+39';
        this.phaseService.phoneNumber = '';
        this.phaseService.resetPhoneNumber();
        this.cdr.detectChanges();

        this.phaseService.clearCode();
        this.phaseService.phase = 0;
        this.phasePrivateLogin.phaseLoginP = 1;
        this.phaseService.continueButton = false;
        this.phaseService.stopTimer();
        this.cdr.detectChanges();

        //Utile per svuotare il campo input-number che è molto articolato.
        setTimeout(() => {
          window.location.href = '/loginprivate';
        }, 2500);

      }
    });
  }


//--------------------------------------------------
//RECUPERO PIN

passo1Pin(){
  this.phasePrivateLogin.incrementPhasePin()
}

get buttonPin():boolean{
  return this.phasePrivateLogin.buttonPin;
}


confermaPin() {
  const pin1 = this.phaseService.pinCode.join('');
  const pin2 = this.phaseService.pinCode2.join('');

  // Verifica che il PIN sia di 5 cifre e che i due PIN coincidano
  if (pin1.length !== 5 || pin2.length !== 5) {
    console.error('⚠️ Il PIN deve essere di 5 cifre.');
    return;
  }

  if (pin1 !== pin2) {
    console.error('❌ I PIN non coincidono!');
    return;
  }


  console.log('✅ PIN confermato con successo:', pin1);

  // Verifica il numero di telefono e ottieni l'ID dell'utente
  // const phoneNumber = this.phaseService.getPrefix() + this.phaseService.getPhoneNumber();
  const phoneNumber =  this.phaseService.getPhoneNumber();

  // Facciamo una chiamata API per recuperare l'utente tramite numero di telefono
  this.checkPhoneService.checkPhone(this.phaseService.getPrefix(), phoneNumber).subscribe({
    next: (response) => {
      // Verifica che la risposta contenga l'utente
      const user = response?.user;

      if (user && user.id) {
        // Prepara i dati dinamici per il body
        const body = {
          email: user.email,
          phoneNumber: user.phoneNumber,
          pin: pin1, // Usa il PIN confermato
          status: user.status,
          pinActive: user.pinActive,
          countryID: user.country.id, // O l'ID del paese se è presente
          appName: 'passaparola', // O un nome dinamico se necessario
          promoCode: user.promoCode,
          countryCode: user.countryCode,
          rol: user.rol
        };

        // Ora possiamo fare la richiesta PATCH per aggiornare il PIN
        this.sms.nuovoPin(user.id, body).subscribe({
          next: (response) => {
            console.log('✅ PIN aggiornato con successo:', response);
            // Esegui eventuali azioni post-aggiornamento
            this.phasePrivateLogin.incrementPhasePin();
          },
          error: (error) => {
            console.error('❌ Errore durante l’aggiornamento del PIN:', error);
          }
        });
      } else {
        console.error('❌ Utente non trovato.');
      }
    },
    error: (error) => {
      console.error("❌ Errore durante il recupero dell'utente:", error);
    }
  });
}













}
