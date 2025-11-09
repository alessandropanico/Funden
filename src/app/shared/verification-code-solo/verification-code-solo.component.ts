import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhaseService } from '../../services/phase.service';


@Component({
  selector: 'app-verification-code-solo',
  templateUrl: './verification-code-solo.component.html',
  styleUrl: './verification-code-solo.component.css',
  standalone:false,

})
export class VerificationCodeSoloComponent {

  constructor(private phaseService: PhaseService) { }

  @Input() uniqueId: string | any;
  @Output() codeEntered: EventEmitter<string> = new EventEmitter<string>();

  get phase(): number {
    return this.phaseService.phase;
  }

  get buttonPhase(): number {
    return this.phaseService.buttonPhase;
  }

  get continueButton(): boolean {
    return this.phaseService.continueButton;
  }


  get verificationCode(): string[] {
    return this.phaseService.verificationCode;
  }


  // onVerificationCodeInput(event: any, index: number) {
  //   this.phaseService.verificationCode[index] = event.target.value;

  //   if (event.target.value.length >= event.target.maxLength) {
  //     const nextInput = document.getElementById('inputMIO_' + (index + 1) + '_' + this.uniqueId);
  //     if (nextInput) {
  //       nextInput.focus();
  //     }
  //   }

  //   this.updateContinueButtonStatus();

  //   if (this.phaseService.verificationCode.every(code => code.length > 0)) {
  //     const fullCode = this.phaseService.verificationCode.join(''); // Unisce i codici in una stringa
  //     console.log("Codice completo inserito:", fullCode);  // <-- DEBUG
  //     this.codeEntered.emit(fullCode); // Emette il codice completo come stringa
  //   }
  // }


  onVerificationCodeKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && this.verificationCode[index].length === 0) {
      this.phaseService.verificationCode[index - 1] = '';
      const previousInput = document.getElementById('inputMIO_' + (index - 1) + '_' + this.uniqueId);
      if (previousInput) {
        previousInput.focus();
      }
      this.updateContinueButtonStatus();
    }
  }

  clearVerificationBox(index: number) {
    this.phaseService.verificationCode[index] = '';
    this.updateContinueButtonStatus();

  }


  private updateContinueButtonStatus() {
    // this.phaseService.continueButton = this.phaseService.verificationCode.every(code => code.length > 0);
    this.phaseService.confermaPIN = this.phaseService.verificationCode.every(code => code.length > 0);
    this.phaseService.finalButtonAddUser = this.phaseService.verificationCode.every(code => code.length > 0);
  }

  //--------------

  onPaste(event: ClipboardEvent, index: number) {
    event.preventDefault(); // Impedisce il comportamento di default

    const pastedText = event.clipboardData?.getData('text')?.trim() || '';
    const cleanText = pastedText.replace(/\D/g, ''); // Mantiene solo numeri

    if (cleanText.length === 0) return;

    // Inserisce le cifre nei vari campi
    for (let i = 0; i < cleanText.length; i++) {
      if (index + i < this.verificationCode.length) {
        this.verificationCode[index + i] = cleanText[i];

        // Sposta il focus avanti
        const nextInput = document.getElementById(`inputMIO_${index + i + 1}_${this.uniqueId}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }

    this.updateContinueButtonStatus();

    // 🔥 Aspetta che Angular aggiorni il binding prima di emettere il codice
    setTimeout(() => {
      if (this.verificationCode.every(code => code.length > 0)) {
        const fullCode = this.verificationCode.join('');
        console.log("Codice completo inserito:", fullCode);
        this.codeEntered.emit(fullCode);
      }
    }, 50); // 🔥 Piccolo ritardo per far sì che Angular aggiorni il DOM
  }


  onVerificationCodeInput(event: any, index: number) {
    this.phaseService.verificationCode[index] = event.target.value;

    if (event.target.value.length >= event.target.maxLength) {
      const nextInput = document.getElementById(`inputMIO_${index + 1}_${this.uniqueId}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    this.updateContinueButtonStatus();

    // 🔹 Aspetta che tutti i campi siano pieni prima di emettere il codice
    if (this.verificationCode.every(code => code.length > 0)) {
      setTimeout(() => { // 🔥 Aspetta un ciclo di rendering per sicurezza
        const fullCode = this.verificationCode.join('');
        console.log("Codice completo inserito:", fullCode);
        this.codeEntered.emit(fullCode);
      }, 10);
    }
  }


}



