import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PhaseService } from '../../services/phase.service';
import { PhaseprivateloginService } from '../../services/phaseprivatelogin.service';

@Component({
  selector: 'app-pin-solo',
  templateUrl: './pin-solo.component.html',
  styleUrl: './pin-solo.component.css'
})
export class PinSoloComponent implements OnInit {

  constructor(private phaseService: PhaseService,
    private phasePrivateLogin: PhaseprivateloginService
  ) { }

  get phasePin(): number {
    return this.phasePrivateLogin.phasePin;
  }

  get buttonPin(): boolean {
    return this.phasePrivateLogin.buttonPin;
  }

  @Output() pinEntered: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.phaseService.showPassword = false;
    this.phaseService.showPassword2 = false;
    this.phaseService.continueButton = false;
  }

  get phase(): number {
    return this.phaseService.phase;
  }

  get pinCode(): string[] {
    return this.phaseService.pinCode;
  }

  get pinFinale(): boolean {
    return this.phaseService.pinFinale;
  }

  get showPassword(): boolean {
    return this.phaseService.showPassword;
  }

  get showPassword2(): boolean {
    return this.phaseService.showPassword2;
  }

  get phaseLoginP(): number {
    return this.phasePrivateLogin.phaseLoginP;
  }

  get buttonLogin(): boolean {
    return this.phasePrivateLogin.buttonLogin;
  }

  get pinCode2(): string[] {
    return this.phaseService.pinCode2;
  }


  // showPassword: boolean = false;
  @Input() uniqueId!: string;


  onVerificationCodeInput(event: any, index: number) {
    this.phaseService.pinCode[index] = event.target.value;
    const pinCompleto = this.phaseService.pinCode.join('').trim();

    if (pinCompleto.length === 5) {
      this.pinEntered.emit(pinCompleto);
    }

    if (event.target.value.length >= event.target.maxLength) {
      const nextInput = document.getElementById(`inputMIO_${index + 1}_${this.uniqueId}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    this.updateContinueButtonStatus();
  }




  onVerificationCodeKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      if (this.pinCode[index] === '' && index > 0) {
        const previousInput = document.getElementById(`inputMIO_${index - 1}_${this.uniqueId}`) as HTMLInputElement;
        if (previousInput) {
          this.phaseService.pinCode[index - 1] = '';  // Cancella il valore precedente
          previousInput.focus();  // Torna all'input precedente
        }
      } else {
        this.phaseService.pinCode[index] = '';  // Cancella il valore corrente
      }
      this.updateContinueButtonStatus();
    }
  }


  togglePasswordVisibility() {
    this.phaseService.showPassword = !this.phaseService.showPassword;
  }


  clearPinBox(index: number) {
    this.phaseService.pinCode[index] = '';
    this.updateContinueButtonStatus();
  }

  updateContinueButtonStatus() {
    this.phaseService.pinFinale = this.phaseService.pinCode.every(code => code.length > 0);
    // this.phaseService.continueButton=this.phaseService.pinCode.every(code => code.length > 0);
    this.phasePrivateLogin.buttonLogin = this.phaseService.pinCode.every(code => code.length > 0);
    this.phaseService.checkFormFilled();
    this.checkPinMatch();
  }



  //----------------------------------------------
  //---PIN 2---

  onVerificationCodeInput2(event: any, index: number) {
    this.phaseService.pinCode2[index] = event.target.value;
    const pinCompleto = this.phaseService.pinCode2.join('').trim();

    if (pinCompleto.length === 5) {
      this.pinEntered.emit(pinCompleto);
    }

    if (event.target.value.length >= event.target.maxLength) {
      const nextInput = document.getElementById(`inputMIO_2${index + 1}_${this.uniqueId}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    this.updateContinueButtonStatus();
  }



  onVerificationCodeKeyDown2(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      if (this.pinCode2[index] === '' && index > 0) {
        const previousInput = document.getElementById(`inputMIO_2${index - 1}_${this.uniqueId}`) as HTMLInputElement;
        if (previousInput) {
          this.phaseService.pinCode2[index - 1] = '';  // Cancella il valore precedente
          previousInput.focus();  // Torna all'input precedente
        }
      } else {
        this.phaseService.pinCode2[index] = '';  // Cancella il valore corrente
      }
      this.updateContinueButtonStatus();
    }
  }



  clearPinBox2(index: number) {
    this.phaseService.pinCode2[index] = '';
    this.updateContinueButtonStatus();
  }


  togglePasswordVisibility2() {
    this.phaseService.showPassword2 = !this.phaseService.showPassword2;
  }



  checkPinMatch() {
    const pin1 = this.phaseService.pinCode.join('');
    const pin2 = this.phaseService.pinCode2.join('');
    if (pin1 === pin2) {
      this.phasePrivateLogin.buttonPin = true;  // Se i PIN sono uguali, abilita il pulsante
    } else {
      this.phasePrivateLogin.buttonPin = false;  // Altrimenti disabilitalo
    }
  }



}
