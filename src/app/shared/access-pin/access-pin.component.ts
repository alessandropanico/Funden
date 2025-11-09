import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PhaseprivateloginService } from '../../services/phaseprivatelogin.service';
import { PhaseService } from '../../services/phase.service';
import { SmsService } from '../../services/sms.service';
import { LoadingService } from '../../services/loading.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-access-pin',
  templateUrl: './access-pin.component.html',
  styleUrl: './access-pin.component.css'
})
export class AccessPinComponent implements OnInit {

  constructor(private phasePrivateLogin: PhaseprivateloginService,
    private phaseService:PhaseService,
    private sms: SmsService,
    private loading: LoadingService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.phaseService.continueButton=false;
  }

  get phasePin():number{
    return this.phasePrivateLogin.phasePin;
  }

  get loginImm():boolean{
    return this.phasePrivateLogin.loginImm;
  }

  get pinImm():boolean{
    return this.phasePrivateLogin.pinImm;
  }

  get continueButton():boolean{
    return this.phaseService.continueButton;
  }

  incrementPhasePin() {
    this.phasePrivateLogin.incrementPhasePin();
    this.phaseService.startTimer();
    this.inviaSmsCodice();
    this.phaseService.continueButton=false;
  }


  inviaSmsCodice() {

    this.phaseService.continueButton = false;
    const phoneNumber = this.phaseService.getPrefix() + this.phaseService.getPhoneNumber();
    this.cdr.detectChanges();

    this.sms.sendSmsCode(phoneNumber).subscribe({
      next: (response) => {
        console.log('SMS inviato con successo:', response);
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



}
