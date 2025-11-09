import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-offers-swiper',
  templateUrl: './offers-swiper.component.html',
  styleUrls: ['./offers-swiper.component.scss'],
  imports: [ModalBuyPlanComponent, CommonModule, FormsModule, ModalModule]
})
export class OffersSwiperComponent implements OnInit {
  @Input() activateOffers: boolean = false;
  @Output() propagar = new EventEmitter<boolean>();

  @Input() plan!: number; // ID del piano selezionato
  currentIndex: number = 0;

  modalRef?: BsModalRef; // riferimento al modal

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
    private modalService: BsModalService, // sostituito NgbModal
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoged();
  }

  public setActivateOffers(activateOffers: boolean): void {
    this.activateOffers = !activateOffers;
    this.propagar.emit(this.activateOffers);
  }

  public isLoged(): boolean {
    return this.authenticationService.isLoged() || false;
  }

  onBuyNow(planIndex: number): void {
    this.plan = this.plansArtist[planIndex].id; // ID piano

    // Apri il modal con ngx-bootstrap
    this.modalRef = this.modalService.show(ModalBuyPlanComponent, {
      class: 'modal-lg',
      initialState: { plan: this.plan } // usa "plan" come proprietà nel componente modal
    });
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
