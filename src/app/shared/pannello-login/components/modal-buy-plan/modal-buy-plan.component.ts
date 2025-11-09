import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { StripeService as Stripe } from 'ngx-stripe';
import { ToastrService } from 'ngx-toastr';

import { Balance } from '../../../../models/balance/balance.model';
import { PlanArtist } from '../../../../models/plan/planArtist.model';
import { AddpromptRequest } from '../../../../models/request/addPromptRequest.model';
import { PaymentMethIntRequets } from '../../../../models/stripe/requets/paymentMethIntRequets.model';
import { PaymentMethRequets } from '../../../../models/stripe/requets/paymentMethRequets.model';
import { AuthenticationService } from '../../../../services/authentication.service';
import { BalanceService } from '../../../../services/balance.service';
import { PlanService } from '../../../../services/plan.service';
import { PromptsService } from '../../../../services/prompts.service';
import { SharedInfoService } from '../../../../services/shared-info.service';
import { Subscription } from 'rxjs';
import { StripeService } from '../../../../services/stripe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from "../../../../models/pipes/pipes.module";
import { ModalPayCongratPromptComponent } from '../modal-pay-congrat-prompt/modal-pay-congrat-prompt.component';

@Component({
  selector: 'app-modal-buy-plan',
  templateUrl: './modal-buy-plan.component.html',
  styleUrls: ['./modal-buy-plan.component.scss'],
  imports: [CommonModule, FormsModule, PipesModule, ModalPayCongratPromptComponent],
  standalone: true
})
export class ModalBuyPlanComponent implements OnInit {
  @Input() plan: number = 1;

  @ViewChild('modalPaymentPromtp') modalPaymentPromtp: ElementRef | undefined;

  payment: PaymentMethRequets = new PaymentMethRequets();

  optionsModal: NgbModalOptions = { backdrop: 'static', keyboard: false };

  plansArtist: PlanArtist[] = [];

  checkPayAvailable: boolean = false;
  checkPayCreditDebit: boolean = false;
  balanceAmount: any = 0;

  numberCard: string = '';
  expCard: string = '' ;
  nameCard: string = '';
  cvcCard: string = '';
  emailPromtp = '';
  email: string = '';
  disableBtnPay = false;
  quantityPrompt = 0;

  isLogedWatchSubscription: Subscription | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private balanceService: BalanceService,
    private promptsService: PromptsService,
    private planService: PlanService,
    private stripeService: StripeService,
    private stripe: Stripe,
    public ngbModal: NgbModal,
    private toastr: ToastrService,
    public sharedInfoService: SharedInfoService
  ) {}

  ngOnInit(): void {
    this.isLoged();
    this.isLogedWatch();

    if (this.isLoged()) {
      this.getBalance();
      this.getPlansArtist();
    }
  }

  ngOnDestroy(): void {
    if (this.isLogedWatchSubscription) {
      this.isLogedWatchSubscription.unsubscribe();
    }
  }

  isLogedWatch() {
    this.isLogedWatchSubscription = this.sharedInfoService
      .isLogedWatch()
      .subscribe((valor) => {
        if (valor) {
          this.getPlansArtist();
          this.getBalance();
        }
      });
  }

  getPlansArtist() {
    this.planService.getPlansArtist().subscribe((response) => {
      this.plansArtist = response.data;
    });
  }

  getBalance() {
    this.balanceService.getBalance().subscribe((response) => {
      this.balanceAmount = response.data.balanceAmount;
    });
  }

  public isLoged(): boolean {
    let isLoged = this.authenticationService.isLoged() || false;

    if (isLoged) {
      this.email = localStorage.getItem('email') || ''; // Default to empty string if null
    }

    return isLoged;
  }

  onBuyNow(plan: number, modal: any) {
    this.plan = plan;
    this.ngbModal.open(modal, this.optionsModal);
  }

  closeModalPayPromtp(modal: any) {
    this.ngbModal.dismissAll(modal);
  }

  cleanFormPay() {
    this.emailPromtp = '';
    this.numberCard = '';
    this.expCard = '';
    this.nameCard = '';
    this.cvcCard = '';
    this.checkPayAvailable = false;
    this.checkPayCreditDebit = false;
    this.disableBtnPay = false;
  }

  finish(modal: any, modal_2: any) {
    this.closeModalPayPromtp(modal);
    this.cleanFormPay();
    this.ngbModal.open(modal_2);
    // this.toastr.success('Payment Successfully');
    // this.toastr.success('Now you can block promtp');

    this.getBalance();
  }

  validCheckPayAvailable() {
    return this.checkPayCreditDebit ||
      parseFloat(this.balanceAmount) == 0 ||
      parseFloat(this.plansArtist[this.plan].planDISCOUNTPRICE) >
        parseFloat(this.balanceAmount)
      ? true
      : false;
  }

  createPaymentMeth(modal: any, form: { valid: any; }, modal_2: any) {
    if (this.checkPayAvailable) {
      if (
        parseFloat(this.balanceAmount) > 0 &&
        parseFloat(this.balanceAmount) >=
          parseFloat(this.plansArtist[this.plan].planDISCOUNTPRICE)
      ) {
        this.buyWithBalance(modal, modal_2);
      } else {
        this.toastr.error('Not have money');
        return;
      }
    }

    this.disableBtnPay = true;
    this.quantityPrompt = 0;

    if (this.checkPayCreditDebit && form.valid) {
      let email = localStorage.getItem('email');
      if (!email) email = '';
      this.payment = {
        number: this.numberCard,
        exp_month: this.expCard.substring(0, 2),
        exp_year: this.expCard.substring(2, 4),
        cvc: this.cvcCard,
        email: this.email,
        name: this.nameCard,
        phone: ''
      };

      // Crear metodo de pago (verificar tarjeta)
      this.stripeService.createPaymentMeth(this.payment).subscribe(
        (response) => {
          console.log('createPaymentMeth', response);
          if (response.data.id) {
            const payment: PaymentMethIntRequets = {
              amount: parseFloat(this.plansArtist[this.plan].planDISCOUNTPRICE),
              payment_method: response.data.id,
            };
            // Crear metodo de pago interno
            this.stripeService.createPaymentMethInt(payment).subscribe(
              (response) => {
                // console.log('createPaymentMethInt', response);
                // Validad datos de pago desde stripe
                this.stripe
                  .confirmCardPayment(response.data.client_secret)
                  .subscribe(
                    // this.stripe.confirmCardPayment(response.data.client_secret, {payment_method: response.data.payment_method}).subscribe(
                    (response: any) => {
                      // console.log('confirmCardPayment', response);
                      if (response.error) {
                        this.toastr.error('Payment error');
                      } else {
                        const balance: Balance = {
                          movementAmount: parseFloat(
                            this.plansArtist[this.plan].planDISCOUNTPRICE
                          ),
                          movementTYPE: 'RECHARGE',
                        };
                        // Agregar balance a la cuenta del usuario
                        this.balanceService.addBalance(balance).subscribe(
                          (response) => {
                            // console.log('addBalance', response);

                            this.buyWithBalance(modal, modal_2);
                          },
                          (error) => {}
                        );
                      }
                    },
                    (error) => {}
                  );
              },
              (error) => {}
            );
          } else {
            this.closeModalPayPromtp(modal);
            this.toastr.error('Error Payment');
          }
        },
        () => {}
      );
    } else {
    }
  }

  buyWithBalance(modal: any, modal_2: any) {
    // comprar con balance
    const balance: Balance = {
      movementAmount: parseFloat(this.plansArtist[this.plan].planDISCOUNTPRICE),
      movementTYPE: 'WITHDRAWAL',
    };
    this.balanceService.buyWithBalance(balance).subscribe(
      (response) => {
        // console.log('buyWithBalance', response);
        // Agregar promtp
        this.quantityPrompt = parseInt(
          this.plansArtist[this.plan].planQUANTITYPROMTP
        );
        const prompt: AddpromptRequest = {
          promtp_availableQUANTITY: parseFloat(
            this.plansArtist[this.plan].planQUANTITYPROMTP
          ),
        };
        this.promptsService.addPrompt(prompt).subscribe(
          (response) => {
            // console.log('addPrompt', response);
            this.finish(modal, modal_2);
          },
          (error) => {}
        );
      },
      (error) => {}
    );
  }
}
