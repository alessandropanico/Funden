import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-privacy-terms-modal',
    templateUrl: './privacy-terms-modal.component.html',
    styleUrls: ['./privacy-terms-modal.component.css'],
    standalone: false
})
export class PrivacyTermsModalComponent implements OnInit {

  modal: boolean = false;
  settings: boolean = false;

  cookiesPrefs = {
    functionality: false,
    advertising: false,
    performance: false
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const accepted = localStorage.getItem('termsAccepted');
      this.modal = accepted !== 'true'; // Se non è accettato, mostra il modale
      const savedPrefs = localStorage.getItem('cookiePrefs');
      if (savedPrefs) {
        this.cookiesPrefs = JSON.parse(savedPrefs);
      }
    }
  }

  closeModal() {
    this.modal = false;
    this.settings = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('termsAccepted', 'true');
    }
  }

  openSettings() {
    this.settings = true;
  }

  confirmChoices() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('termsAccepted', 'true');
      localStorage.setItem('cookiePrefs', JSON.stringify(this.cookiesPrefs));
    }
    this.modal = false;
    this.settings = false;
  }

  togglePreference(type: 'functionality' | 'advertising' | 'performance', value: boolean) {
    this.cookiesPrefs[type] = value;
  }

  onToggle(event: Event, type: 'functionality' | 'advertising' | 'performance') {
    const input = event.target as HTMLInputElement;
    this.togglePreference(type, input.checked);
  }
}
