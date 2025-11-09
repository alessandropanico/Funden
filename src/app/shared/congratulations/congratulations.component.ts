import { Component } from '@angular/core';
import { PhaseService } from '../../services/phase.service';
import { Router } from '@angular/router';
import { PhaseprivateloginService } from '../../services/phaseprivatelogin.service';

@Component({
    selector: 'app-congratulations',
    templateUrl: './congratulations.component.html',
    styleUrl: './congratulations.component.css',
    standalone: false
})
export class CongratulationsComponent {

  constructor(
    private phaseService: PhaseService,
    private router: Router,
    private phasePrivateLogin: PhaseprivateloginService
  ) { }

  get phase(): number {
    return this.phaseService.phase;
  }

  get phaseLoginP(): number {
    return this.phasePrivateLogin.phaseLoginP;
  }

  get phasePin(): number {
    return this.phasePrivateLogin.phasePin;
  }


  goToLoginPrivate() {
    this.router.navigate(['/loginprivate']);
    this.phasePrivateLogin.incrementPhaseLoginPrivate();
    console.log("Fase login dopo primo incremento:", this.phasePrivateLogin.phaseLoginP);
    this.phaseService.inputNone = false;
    this.phaseService.clearCode();

  }

  goLoginAfterPin() {
    window.location.href = '/loginprivate';
}


}
