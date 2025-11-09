import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, NgZone, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { PhaseprivateloginService } from '../../services/phaseprivatelogin.service';
import { PhaseService } from '../../services/phase.service';
import { ValidationPhoneService } from '../../services/validation-phone.service';
import { UserSessionService } from '../../services/user-session.service';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isScrolled: boolean = false;
  isMobile: boolean = false;
  isMenuOpen: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private router: Router,
    private phasePrivateLogin: PhaseprivateloginService,
    private phaseService: PhaseService,
    private validationPhoneService: ValidationPhoneService,
    private userSession: UserSessionService,
    private ngZone: NgZone, // Aggiunta correttamente
    private cdr: ChangeDetectorRef // 🔧 Rimossa la virgola finale
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkAuthStatus();  // 🔄 Controlla lo stato ogni volta che la navigazione termina
      }
    });
  }

  ngOnInit(): void {
    this.datiUtente();
    this.checkAuthStatus(); // Controlla lo stato dell'autenticazione all'avvio
    this.phasePrivateLogin.pannello = false;
    this.cdr.detectChanges();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.isScrolled = offset > 50; // Cambia a 50 pixel o regola in base alle tue necessità
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768; // Rileva se è mobile durante il ridimensionamento
    }
  }

  // Metodo per togglare lo stato del menu laterale
  toggleMenu(event: Event): void {
    event.preventDefault(); // Previene il comportamento predefinito del link (scrolling)
    this.isMenuOpen = !this.isMenuOpen; // Toggle del menu laterale
  }

  //-------------------------------------

  isLoggedIn = false; // Indica se l'utente è loggato
  buttonText = "Login"; // Testo dinamico del bottone

  checkAuthStatus(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.run(() => {
        const token = this.userSession.getToken();
        const userData = this.userSession.getUserData();

        const isValidUser = userData && userData.phoneNumber && userData.country?.phonePrefix;

        if (token && !this.userSession.isTokenExpired(token) && isValidUser) {
          this.isLoggedIn = true;
          this.buttonText = "Logout";
          this.datiUtente();
        } else {
          this.isLoggedIn = false;
          this.buttonText = "Login";
          this.userSession.clearToken(); // Pulisce token se i dati non sono validi
          this.userSession.clearUserData();
        }

        this.cdr.detectChanges();
      });
    }
  }




  handleAuthAction(): void {
    if (this.isLoggedIn) {
      this.logout();
    } else {
      // this.router.navigate(['/registerprivate']);
      window.location.href = '/registerprivate'
      this.phaseService.phase = 1;
      this.phasePrivateLogin.phaseLoginP = 1;
      this.phaseService.clearPhoneData();
      this.phaseService.clearCode();
      this.cdr.detectChanges();
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userSession.clearToken(); // ✅ Rimuoviamo il token dal servizio
      this.userSession.clearUserData();  // Rimuove anche i dati utente
      this.isLoggedIn = false;
      this.buttonText = "Login";
      this.cdr.detectChanges();
      window.location.href = '/home'
    }
  }


  change: boolean = true;


  get pannello(): boolean {
    return this.phasePrivateLogin.pannello;
  }

  showPannello() {
    console.log("pannello prima del cambio: ", this.phasePrivateLogin.pannello);
    this.phasePrivateLogin.pannello = !this.phasePrivateLogin.pannello;
    this.change = !this.change;
    this.cdr.detectChanges();
    console.log("pannello dopo il cambio: ", this.phasePrivateLogin.pannello);
  }



  scrollInit() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    this.phasePrivateLogin.pannello = true;
    this.cdr.detectChanges();
  }

  countryCode: string = '';
  phoneNumber: string = '';
  phonePrefix: string = '';
  userID: string = '';
  role: string = '';

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


  //----------------------------------------------

  isModalOpen = false;  // Variabile per il controllo del modale

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }


}
