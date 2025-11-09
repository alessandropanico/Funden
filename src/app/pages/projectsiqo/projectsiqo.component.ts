import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-projectsiqo',
  templateUrl: './projectsiqo.component.html',
  styleUrls: ['./projectsiqo.component.css']
})
export class ProjectsiqoComponent implements OnInit, OnDestroy {
  expiryRound1: string = '';
  expiresProject1: string = '';

  private expiryRound1Target!: Date;
  private expiresProject1Target!: Date;
  private timerId: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // Solo sul client/browser
    if (isPlatformBrowser(this.platformId)) {
      const now = new Date();
      this.expiryRound1Target = new Date(now.getTime() + 2 * 60 * 60 * 1000);
      this.expiresProject1Target = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);

      this.updateCountdowns();
      this.timerId = setInterval(() => this.updateCountdowns(), 1000);
    }
  }

  updateCountdowns(): void {
    this.expiryRound1 = this.getTimeRemaining(this.expiryRound1Target);
    this.expiresProject1 = this.getTimeRemaining(this.expiresProject1Target);
  }

  getTimeRemaining(targetDate: Date): string {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) return 'Expired';

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${days}D ${hours}H ${minutes}M ${seconds}S`;
  }

  goToDetails() {
    this.router.navigate(['/projectdetails']);
    console.log('Navigazione a dettagli progetto');
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  isModalOpen = false;  // Variabile per il controllo del modale

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }


}
