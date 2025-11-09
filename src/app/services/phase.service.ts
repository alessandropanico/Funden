import { Injectable, OnInit } from '@angular/core';
import { ValidationPhoneService } from './validation-phone.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhaseService implements OnInit {

  constructor(
    private validationPhoneService: ValidationPhoneService,

  ) { }

  ngOnInit(): void {
    this.inputNone = false;
  }

  phase: number = 1;
  buttonPhase: number = 1;
  continueButton: boolean = false;
  verificationCode: string[] = ['', '', '', '', '', ''];
  confermaPIN: boolean = false;
  finalButtonAddUser: boolean = false;
  inputNone: boolean = false;


  incrementPhase() {
    this.phase = this.phase + 1;
    this.buttonPhase = this.buttonPhase + 1
    console.log("fase numero: " + this.phase);
    this.inputNone = true;
  }

  decrementPhase() {
    this.phase = this.phase - 1;
    this.buttonPhase = this.buttonPhase - 1
  }

  resetPhase() {
    this.phase = 1;
    this.buttonPhase = 1;
    this.inputNone = false;
  }


  //-------------------------


  prefix: string = '+39';
  phoneNumber: string = '';

  //bottone per confermare numero telefonico
  confermaTel: boolean = false;

  getPrefix(): string {
    return this.prefix;
  }

  setPrefix(prefix: string): void {
    this.prefix = prefix;
    this.validationPhoneService.prefix = prefix;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  setPhoneNumber(phoneNumber: string): void {
    this.phoneNumber = phoneNumber;
    this.validationPhoneService.phoneNumber = phoneNumber;
  }

  resetPhoneNumber() {
    this.prefix = '+39';
    this.phoneNumber = '';
    this.verificationCode = ['', '', '', '', '', ''];
    this.pinCode = ['', '', '', '', ''];
  }

  clearCode() {
    this.verificationCode = ['', '', '', '', '', ''];
    this.pinCode = ['', '', '', '', ''];
  }

  emailConferma: boolean = false;
  testo: string = '';

  fiduciario: boolean = false;

  checkFiduciario() {
    this.fiduciario = !!this.testo && !!this.phoneNumber;
  }

  clearPhoneData(): void {
    this.setPrefix('+39');  // Reset del prefisso al valore predefinito
    this.setPhoneNumber(''); // Reset del numero di telefono
  }


  resetPrefix(): void {
    this.prefix = '+39'; // Imposta il prefisso al valore di default
    this.validationPhoneService.prefix = this.prefix;  // Aggiorna anche il servizio
  }

  resetPhoneNumber2(): void {
    this.phoneNumber = ''; // Resetta il numero telefonico
    this.validationPhoneService.phoneNumber = '';  // Aggiorna anche il servizio
    this.verificationCode = ['', '', '', '', '', ''];  // Reset dei codici
    this.pinCode = ['', '', '', '', ''];  // Reset del PIN
  }

  clearPhone(): void {
    this.resetPrefix();  // Reset del prefisso al valore predefinito
    this.resetPhoneNumber(); // Reset del numero di telefono
  }

  //----------------------------------------------------

  verificationVisible: boolean = false;
  anotherCode: boolean = false;
  strokeColor: string = '#FF0000'; // Colore predefinito del cerchio di verifica
  timeRemaining: number = 120; // Tempo in secondi (2 minuti)
  strokeDashOffset: number = 0;
  timerActive: boolean = true; // Variabile per indicare se il timer è attivo o meno

  private interval: any;

  // Controllo variabile anotherCode
  startTimer(): void {
    this.stopTimer(); // <-- opzionale ma assicura pulizia
    this.timeRemaining = 120;
    this.strokeDashOffset = 0;
    this.timerActive = true;
    
    console.log("Starting timer...");
    this.timerActive = true;
    this.interval = setInterval(() => {
      if (this.timerActive && this.timeRemaining > 0) {
        this.timeRemaining--;
        this.strokeDashOffset = Math.floor(((120 - this.timeRemaining) / 120) * 251);
        // console.log('Tempo rimanente:', this.timeRemaining);
        this.anotherCode = false;
      } else {
        clearInterval(this.interval);
        this.anotherCode = true;
        this.strokeDashOffset = 251;
      }
    }, 1000);
  }



  stopTimer(): void {
    this.timerActive = false;
    this.anotherCode = false;
    this.timeRemaining = 120;
    this.strokeDashOffset = 0;
    this.verificationVisible = false;
    clearInterval(this.interval); // Pulizia dell'intervallo
  }


  //----------------------------------

  pinCode: string[] = ['', '', '', '', ''];
  pinCode2: string[] = ['', '', '', '', ''];
  showPassword: boolean = false;
  showPassword2: boolean = false;
  pinFinale: boolean = false;


  //----------------------------------

  checkboxesChecked: boolean[] = [false, false, false];

  checkFormFilled() {
    setTimeout(() => {
      const pinCodeFilled = this.pinCode.every(code => code.trim() !== '');
      const checkboxesChecked = this.checkboxesChecked.every(checkbox => checkbox === true);

      this.continueButton = pinCodeFilled && checkboxesChecked;
    }, 0);
  }

  //----------------------------------


}
