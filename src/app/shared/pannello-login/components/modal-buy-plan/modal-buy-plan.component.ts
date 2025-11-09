import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { StripeService as Stripe } from 'ngx-stripe';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from "../../../../models/pipes/pipes.module";
import { ModalPayCongratPromptComponent } from '../modal-pay-congrat-prompt/modal-pay-congrat-prompt.component';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

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

@Component({
  selector: 'app-modal-buy-plan',
  templateUrl: './modal-buy-plan.component.html',
  styleUrls: ['./modal-buy-plan.component.scss'],
  imports: [CommonModule, FormsModule, PipesModule, ModalPayCongratPromptComponent, ModalModule]
})
export class ModalBuyPlanComponent implements OnInit {
  @Input() plan: number = 1;

  modalRef?: BsModalRef;
  payment: PaymentMethRequets = new PaymentMethRequets();
  plansArtist: PlanArtist[] = [];

  checkPayAvailable = false;
  checkPayCreditDebit = false;
  balanceAmount: any = 0;

  numberCard = '';
  expCard = '';
  nameCard = '';
  cvcCard = '';
  emailPromtp = '';
  email = '';
  disableBtnPay = false;
  quantityPrompt = 0;

  isLogedWatchSubscription?: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private balanceService: BalanceService,
    private promptsService: PromptsService,
    private planService: PlanService,
    private stripeService: StripeService,
    private stripe: Stripe,
    private modalService: BsModalService,
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
    this.isLogedWatchSubscription?.unsubscribe();
  }

  isLogedWatch() {
    this.isLogedWatchSubscription = this.sharedInfoService
      .isLogedWatch()
      .subscribe(valor => {
        if (valor) {
          this.getPlansArtist();
          this.getBalance();
        }
      });
  }

  getPlansArtist() {
    this.planService.getPlansArtist().subscribe(response => {
      this.plansArtist = response.data;
    });
  }

  getBalance() {
    this.balanceService.getBalance().subscribe(response => {
      this.balanceAmount = response.data.balanceAmount;
    });
  }

  isLoged(): boolean {
    const logged = this.authenticationService.isLoged() || false;
    if (logged) this.email = localStorage.getItem('email') || '';
    return logged;
  }

  openModal() {
    this.modalRef = this.modalService.show(this.constructor as any, {
      class: 'modal-lg',
      initialState: { plan: this.plan }
    });
  }

  closeModal() {
    this.modalRef?.hide();
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

  finish() {
    this.closeModal();
    this.cleanFormPay();
    this.modalRef = this.modalService.show(ModalPayCongratPromptComponent, { class: 'modal-lg' });
    this.getBalance();
  }

  validCheckPayAvailable() {
    return this.checkPayCreditDebit ||
      parseFloat(this.balanceAmount) === 0 ||
      parseFloat(this.plansArtist[this.plan].planDISCOUNTPRICE) > parseFloat(this.balanceAmount);
  }

  createPaymentMeth(form: { valid: any }) {
    if (this.checkPayAvailable) {
      if (parseFloat(this.balanceAmount) > 0 &&
          parseFloat(this.balanceAmount) >= parseFloat(this.plansArtist[this.plan].planDISCOUNTPRICE)) {
        this.buyWithBalance();
        return;
      } else {
        this.toastr.error('Not have money');
        return;
      }
    }

    this.disableBtnPay = true;
    this.quantityPrompt = 0;

    if (this.checkPayCreditDebit && form.valid) {
      this.payment = {
        number: this.numberCard,
        exp_month: this.expCard.substring(0, 2),
        exp_year: this.expCard.substring(2, 4),
        cvc: this.cvcCard,
        email: this.email,
        name: this.nameCard,
        phone: ''
      };

      this.stripeService.createPaymentMeth(this.payment).subscribe(response => {
        if (response.data.id) {
          const payment: PaymentMethIntRequets = {
            amount: parseFloat(this.plansArtist[this.plan].planDISCOUNTPRICE),
            payment_method: response.data.id
          };
          this.stripeService.createPaymentMethInt(payment).subscribe(resp => {
            this.stripe.confirmCardPayment(resp.data.client_secret).subscribe(result => {
              if (result.error) {
                this.toastr.error('Payment error');
              } else {
                const balance: Balance = {
                  movementAmount: parseFloat(this.plansArtist[this.plan].planDISCOUNTPRICE),
                  movementTYPE: 'RECHARGE'
                };
                this.balanceService.addBalance(balance).subscribe(() => this.buyWithBalance());
              }
            });
          });
        } else {
          this.closeModal();
          this.toastr.error('Error Payment');
        }
      });
    }
  }

  buyWithBalance() {
    const balance: Balance = {
      movementAmount: parseFloat(this.plansArtist[this.plan].planDISCOUNTPRICE),
      movementTYPE: 'WITHDRAWAL'
    };
    this.balanceService.buyWithBalance(balance).subscribe(() => {
      this.quantityPrompt = parseInt(this.plansArtist[this.plan].planQUANTITYPROMTP);
      const prompt: AddpromptRequest = {
        promtp_availableQUANTITY: parseFloat(this.plansArtist[this.plan].planQUANTITYPROMTP)
      };
      this.promptsService.addPrompt(prompt).subscribe(() => this.finish());
    });
  }
}
