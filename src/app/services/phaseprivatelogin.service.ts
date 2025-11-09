import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhaseprivateloginService {

  constructor() { }

  phaseLoginP: number = 1;
  buttonPrivateLogin: number = 1;
  buttonLogin: boolean = false;

  loginImm: boolean = false;
  pinImm: boolean = false;

  phasePin = 0;
  buttonPin:boolean=false;

  incrementPhaseLoginPrivate() {
    this.phaseLoginP = this.phaseLoginP + 1;
    console.log("Fase login dal servizio: " + this.phaseLoginP)
  }

  incrementPhasePin() {
    this.phasePin = this.phasePin + 1
    this.loginImm = true;
    this.pinImm = true;
    console.log("fase di login numero: "+this.phasePin)
  }

  //---------------------------------

  pannello:boolean=false


  isLoggedIn = false; // Indica se l'utente è loggato
  buttonText = "Login"; // Testo dinamico del bottone



}
