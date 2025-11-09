import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-invia-credito',
  templateUrl: './invia-credito.component.html',
  styleUrls: ['./invia-credito.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class InviaCreditoComponent implements OnInit {
  @Input() activateInvia = false;
  @Output() propagar = new EventEmitter<boolean>();

  email: string = '';
  numberCard: string = '';
  expCard: string = '';
  nameCard: string = '';
  cvcCard: string = '';
  amount: number = 0;
  disableBtnPay = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadUserEmail();
  }

  loadUserEmail(): void {
    this.email = localStorage.getItem('email') ?? 'utente@example.com'; // Simulazione di email
  }

  setActivateactivateInvia(activateInvia: boolean): void {
    this.activateInvia = !activateInvia;
    this.propagar.emit(this.activateInvia);
  }

  payment: any = {};


  createPaymentMeth(form: NgForm) {
    this.disableBtnPay = true;

    // Assicuriamoci che 'valid' sia sempre booleano
    if (form.valid ?? false) {
      let email = localStorage.getItem('email') ?? '';

      this.payment = {
        number: this.numberCard,
        exp_month: this.expCard.substring(0, 2),
        exp_year: this.expCard.substring(2, 4),
        cvc: this.cvcCard,
        email: this.email,
        name: this.nameCard,
        phone: ''
      };

      console.log("Dati di pagamento:", this.payment);

      // Simulazione di pagamento senza servizi esterni
      setTimeout(() => {
        console.log("Pagamento completato con successo!");
        this.finish();
      }, 2000);
    } else {
      console.log("Il form non è valido!");
      this.disableBtnPay = false;
    }
  }

  finish() {
    this.cleanFormPay();
    console.log("Pagamento salvato con successo!");
    this.setActivateactivateInvia(false);
    this.cdr.detectChanges()
  }


  simulatePaymentProcess(): void {
    setTimeout(() => {
      console.log('Pagamento simulato con successo.');
      alert('Pagamento effettuato con successo!');
      this.cleanFormPay();
    }, 2000); // Simuliamo un ritardo di 2 secondi per il pagamento
  }

  cleanFormPay(): void {
    this.numberCard = '';
    this.expCard = '';
    this.nameCard = '';
    this.cvcCard = '';
    this.amount = 0;
    this.disableBtnPay = false;
  }
}
