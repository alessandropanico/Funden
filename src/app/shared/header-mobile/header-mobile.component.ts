import { ChangeDetectorRef, Component } from '@angular/core';
import { PhaseService } from '../../services/phase.service';
import { PhaseprivateloginService } from '../../services/phaseprivatelogin.service';
import { Router } from '@angular/router';
import { UserSessionService } from '../../services/user-session.service';

@Component({
    selector: 'app-header-mobile',
    templateUrl: './header-mobile.component.html',
    styleUrl: './header-mobile.component.css',
    standalone: false
})
export class HeaderMobileComponent {

    constructor(
      private phaseService: PhaseService,
      private router: Router,
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
    this.cdr.detectChanges();  }
}
