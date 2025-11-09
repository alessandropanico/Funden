import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { StripeService } from '../../../../services/stripe.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../../services/authentication.service';
import { PlanArtist } from '../../../../models/plan/planArtist.model';
import { ModalBuyPlanComponent } from '../modal-buy-plan/modal-buy-plan.component';
import { StripeService as Stripe } from 'ngx-stripe';
import { BalanceService } from '../../../../services/balance.service';
import { PromptsService } from '../../../../services/prompts.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-offers-swiper',
    templateUrl: './offers-swiper.component.html',
    styleUrls: ['./offers-swiper.component.scss'],
    imports: [ModalBuyPlanComponent, CommonModule, FormsModule]
})
export class OffersSwiperComponent implements OnInit {
  @Input() activateOffers: boolean = false;
  @Output() propagar = new EventEmitter<boolean>();

  @ViewChild(ModalBuyPlanComponent) modalBoyPlanComponent!: ModalBuyPlanComponent;

  modalPaymentPromtp: any;
  optionsModal: NgbModalOptions = { backdrop: 'static', keyboard: false };
  @Input() plan!: number;  // Assicurati che 'plan' sia un numero (l'ID del piano)
  currentIndex: number = 0;

  plansArtist: PlanArtist[] = [
    {
      id: 1,
      planTITLE: 'Premium Plan',
      planCODE: 'P001',
      planCOLOR: 'red',
      planFULLPRICE: '100',
      planDISCOUNTPRICE: '80',
      planQUANTITYPROMTP: '5 items left',
      languageID: 1,
      planTYPE: 'premium',
      Items: [
        { id: 1, itemTEXT: 'Item 1 Description', planID: 1, itemBOLD: false },
        { id: 2, itemTEXT: 'Item 2 Description', planID: 1, itemBOLD: true }
      ]
    },
    {
      id: 2,
      planTITLE: 'Basic Plan',
      planCODE: 'B001',
      planCOLOR: 'blue',
      planFULLPRICE: '50',
      planDISCOUNTPRICE: '40',
      planQUANTITYPROMTP: '10 items left',
      languageID: 1,
      planTYPE: 'basic',
      Items: [
        { id: 1, itemTEXT: 'Item 1 Description', planID: 2, itemBOLD: false },
        { id: 2, itemTEXT: 'Item 2 Description', planID: 2, itemBOLD: true }
      ]
    }
  ];

  constructor(
    private authenticationService: AuthenticationService,
    private balanceService: BalanceService,
    private promptsService: PromptsService,
    private stripeService: StripeService,
    private stripe: Stripe,
    public ngbModal: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoged();
  }

  ngAfterViewInit(): void {
    if (this.modalBoyPlanComponent) {
      this.modalPaymentPromtp = this.modalBoyPlanComponent.modalPaymentPromtp;
    }
  }

  public setActivateOffers(activateOffers: boolean): void {
    this.activateOffers = !activateOffers;
    this.propagar.emit(this.activateOffers);
  }

  public isLoged(): boolean {
    let isLoged = this.authenticationService.isLoged() || false;
    return isLoged;
  }

  onBuyNow(planIndex: number): void {
    this.plan = this.plansArtist[planIndex].id;  // Passa solo l'ID del piano (number)
    this.ngbModal.open(this.modalPaymentPromtp, this.optionsModal);
  }


  moveToPrev(): void {
    if (this.currentIndex === 0) {
      this.currentIndex = this.plansArtist.length - 1;
    } else {
      this.currentIndex--;
    }
  }

  moveToNext(): void {
    if (this.currentIndex === this.plansArtist.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }
}
