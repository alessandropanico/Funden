import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PhaseprivateloginService } from '../../services/phaseprivatelogin.service';
import { ValidationPhoneService } from '../../services/validation-phone.service';
import { UserSessionService } from '../../services/user-session.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pannello-login',
  templateUrl: './pannello-login.component.html',
  styleUrl: './pannello-login.component.css'
})
export class PannelloLoginComponent implements OnInit {
  countryCode: string = '';
  phoneNumber: string = '';
  phonePrefix: string = '';
  userID: string = '';
  role: string = '';

  constructor(
    private phasePrivateLogin: PhaseprivateloginService,
    private validationPhoneService: ValidationPhoneService,
    private userSession: UserSessionService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any // ✅ Corretto l'inject
  ) { }

  get pannello(): boolean {
    return this.phasePrivateLogin.pannello;
  }

  ngOnInit(): void {
    this.datiUtente();
  }

  datiUtente() {
    const userData = this.userSession.getUserData();
    if (userData) {
      console.log("📌 Dati utente recuperati:", userData);

      this.phonePrefix = userData.country?.phonePrefix || 'N/A';
      this.countryCode = userData.countryCode || 'N/A';
      this.phoneNumber = userData.phoneNumber || 'N/A';
      this.userID = userData.userID || 'N/A';
      this.role = userData.rol || 'N/A';

      console.log("📞 Prefisso:", this.phonePrefix);
      console.log("🌍 Codice Paese:", this.countryCode);
      console.log("📱 Numero:", this.phoneNumber);
      console.log("🆔 User ID:", this.userID);
      console.log("🎭 Ruolo:", this.role);
    } else {
      console.log("❌ Nessun utente loggato.");
    }
  }

  change: boolean = true;

  showPannello() {
    console.log("pannello prima del cambio: ", this.phasePrivateLogin.pannello);
    this.phasePrivateLogin.pannello = !this.phasePrivateLogin.pannello;
    this.change = !this.change;
    this.cdr.detectChanges();
    console.log("pannello dopo il cambio: ", this.phasePrivateLogin.pannello);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('tokenLogin');
      this.userSession.clearUserData();  // Rimuove i dati dal localStorage

      setTimeout(() => { // 🔥 Garantisce l'aggiornamento immediato
        this.phasePrivateLogin.isLoggedIn = false;
        this.phasePrivateLogin.buttonText = 'Login';
        window.location.href='/home'
        this.cdr.detectChanges()
      });
    }
    console.log("prova logout da pannello")
  }

  //--------------------------------

  prenotaButton: string = 'Reserve your app';

  prenota() {
    this.prenotaButton = `Reservation confirmed!`
  }
  

}
