import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

// import Swiper core and required modules
import SwiperCore from 'swiper';
import { Pagination } from 'swiper/modules';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationService } from '../../../../services/authentication.service';
import { BalanceService } from '../../../../services/balance.service';
import { CommonModule } from '@angular/common';
import { PromptsListComponent } from "../prompts-list/prompts-list.component";
import { OffersSwiperComponent } from '../offers-swiper/offers-swiper.component';
import { UniquesListComponent } from "../uniques-list/uniques-list.component";
import { TopUpCreditComponent } from '../top-up-credit/top-up-credit.component';
import { PipesModule } from "../../../../models/pipes/pipes.module";
import { InvestmentService } from '../../../../services/investment.service';
import { AtmService } from '../../../../services/atm.service';
import { UserSessionService } from '../../../../services/user-session.service';
import { InviaCreditoComponent } from "../invia-credito/invia-credito.component";

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-top-up-balance',
  templateUrl: './top-up-balance.component.html',
  styleUrls: ['./top-up-balance.component.scss'],
  animations: [
    /* trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(200px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateX(0px)' })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: 'translateX(200px)' })),
      ]),
    ]), */
  ],
  imports: [CommonModule, PromptsListComponent, OffersSwiperComponent, UniquesListComponent, TopUpCreditComponent, PipesModule, InviaCreditoComponent],
  standalone: true
})
export class TopUpBalanceComponent implements OnInit, AfterViewInit {
  @Input() showTopUpBalance = true;

  @Output() propagar = new EventEmitter<boolean>();

  showLogout = false;

  email: string = '';
  tab: string = 'Prompts';
  balanceAmount: any = 0;

  activateOffers: boolean = false;
  activatePaymenBalance: boolean = false;
  activateInvia: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private balanceService: BalanceService,
    private investment: InvestmentService,
    private atmService: AtmService,
    private cdr:ChangeDetectorRef,
    private userSessionService:UserSessionService
  ) { }

  ngOnInit(): void {
    this.getInvestment();
    this.getAtm();
    this.isLoged();
    if (this.isLoged()) {
      this.getBalance();
    }
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    if (this.isLoged()) {
      this.waitForTokenAndLoadData();
    }

    this.getInvestment(); // opzionale
    setTimeout(() => this.cdr.detectChanges());
  }

  private waitForTokenAndLoadData(): void {
    const token = this.userSessionService.getToken();

    if (token) {
      this.getBalance();
      this.getAtm();
    } else {
      console.warn('⏳ Token assente, riprovo tra poco...');
      setTimeout(() => {
        const retryToken = this.userSessionService.getToken();
        if (retryToken) {
          this.getBalance();
          this.getAtm();
        } else {
          console.error('❌ Token ancora assente, ATM non caricato.');
        }
      }, 300); // oppure 500ms se vuoi stare largo
    }
  }


  getBalance() {
    this.balanceService.getBalance().subscribe((response) => {
      this.balanceAmount = response.data.balanceAmount;
    });
  }

  public isLoged(): boolean {
    let isLoged = this.authenticationService.isLoged() || false;

    if (isLoged) {
      this.email = localStorage.getItem('email') ?? '';
    }

    return isLoged;
  }

  public setShowTopUpBalance() {
    this.showLogout = false;
    this.showTopUpBalance = !this.showTopUpBalance;
    this.propagar.emit(this.showTopUpBalance);
  }

  public setActivateOffers(activateOffers: boolean) {
    this.activateOffers = !activateOffers;
  }

  public setActivatePaymenBalance(activatePaymenBalance: boolean) {
    this.activatePaymenBalance = !activatePaymenBalance;
  }

  public setActivateactivateInvia(activateInvia: boolean) {
    this.activateInvia = !activateInvia;
  }


  public logout() {
    this.showTopUpBalance = false;
    this.showLogout = true;
    this.authenticationService.logout();
    this.propagar.emit(this.showTopUpBalance);
  }


  //---------------------------------------

  investments: any[] = [];  // Array per memorizzare i dati ricevuti
  atm: number = 0;  // Inizializza come 0, che è un numero
  investmentValue: number = 0;  // Nuova variabile per memorizzare il valore


  getInvestment() {
    this.investment.getInvestment().subscribe({
      next: (data) => {
        this.investmentValue = data.investments?.[0] || 0;  // Assegna il valore o 0
        console.log('Investment caricato:', this.investmentValue);
      },
      error: (error) => {
        console.error('Errore nel recupero degli investimenti:', error);
        this.investmentValue = 0;
      }
    });
  }


  getAtm() {
    this.atmService.getAtm().subscribe({
      next: (data) => {
        // Supponiamo che la risposta sia { "ATM": 0 }
        this.atm = data.ATM || 0;  // Assegna direttamente il valore numerico di ATM
        console.log('ATM caricato:', this.atm);
      },
      error: (error) => {
        console.error('Errore nel recupero degli ATM:', error);
        this.atm = 0;  // In caso di errore, assegna il valore 0
      }
    });
  }


}
