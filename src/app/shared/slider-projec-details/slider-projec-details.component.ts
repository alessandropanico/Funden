import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

interface Slide {
  imgSrc: string;
  title: string;
  description: string;
}

@Component({
    selector: 'app-slider-projec-details',
    templateUrl: './slider-projec-details.component.html',
    styleUrl: './slider-projec-details.component.css',
    standalone: false
})
export class SliderProjecDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  slides: Slide[] = [];
  slidesPerView = 5;
  spaceBetween = 0;
  loop = true;
  autoplay = {
    delay: 2500,
    disableOnInteraction: false
  };
  breakpoints = {
    400: {
      slidesPerView: 1
    },
    601: {
      slidesPerView: 5
    }
  };

  isSwiperActive = false;
  private navigationSubscription!: Subscription;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const originalSlides: Slide[] = [
        { imgSrc: 'assets/immaginiProjectDetails/1.png', title: 'Sofia R.', description: 'Marketing manager' },
        { imgSrc: 'assets/immaginiProjectDetails/1.png', title: 'Sofia R.', description: 'Marketing manager' },
        { imgSrc: 'assets/immaginiProjectDetails/1.png', title: 'Sofia R.', description: 'Marketing manager' },
        { imgSrc: 'assets/immaginiProjectDetails/1.png', title: 'Sofia R.', description: 'Marketing manager' },
        { imgSrc: 'assets/immaginiProjectDetails/1.png', title: 'Sofia R.', description: 'Marketing manager' },
        { imgSrc: 'assets/immaginiProjectDetails/1.png', title: 'Sofia R.', description: 'Marketing manager' },

      ];

      // Inizializza gli slides
      this.slides = [...originalSlides, ...originalSlides, ...originalSlides];

      // Sottoscrizione a NavigationEnd per ri-inizializzare Swiper solo su /home
      this.navigationSubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd && event.urlAfterRedirects === '/home') {
          this.reloadSwiper(originalSlides);
        }
      });

      this.isSwiperActive = true;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isSwiperActive = true;
      this.cdr.detectChanges();
    }, 0);
  }

  reloadSwiper(originalSlides: Slide[]) {
    this.isSwiperActive = false;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.slides = [...originalSlides, ...originalSlides, ...originalSlides];
      this.isSwiperActive = true;
      this.cdr.detectChanges();
    }, 100);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
