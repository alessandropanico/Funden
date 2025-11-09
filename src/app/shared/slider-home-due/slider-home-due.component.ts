import { Component, OnInit, OnDestroy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Slide {
  imgSrc: string;
  category: string;
  categoryLink: string;
  authorName: string;
  authorImg: string;
  authorLink: string;
  title: string;
  detailsLink: string;
  raised: string;
  percentage: string;
  date: string;
  invest: string;
  expiryRound: Date;       // Fine del round
  expriresProject: Date;   // Fine del progetto
  quotas: string;
  countdownRound?: string; // Tempo rimanente per il round
  countdownProject?: string; // Tempo rimanente per il progetto
  monthly: string;
  price: string;
  round2: string;
  categoryClass?: string;
  now: string;
  showDateButton?: boolean; // <- questo controlla se mostrare la data oppure solo "Invest now"
  customStartDate?: string; // Esempio: '24/05/2025'

}
@Component({
  selector: 'app-slider-home-due',
  templateUrl: './slider-home-due.component.html',
  styleUrl: './slider-home-due.component.css'
})
export class SliderHomeDueComponent implements OnInit, OnDestroy {
  slides: Slide[] = [];
  loop = true;
  autoplay = {
    delay: 3000,
    disableOnInteraction: false,
  };
  breakpoints = {
    640: { slidesPerView: 1, spaceBetween: 10 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 2, spaceBetween: 30 },
  };
  isSwiperActive = false;
  private timer: any;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Array delle immagini autori
  authorImages = [
    'assets/immaginiProgetti/el1.png',
    'assets/immaginiProgetti/el2.png',
    'assets/immaginiProgetti/el3.png',
    'assets/immaginiProgetti/el4.png',
    'assets/immaginiProgetti/el5.png',
    'assets/immaginiProgetti/el6.png',
  ];


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const now = new Date();
      this.slides = [

        {
          imgSrc: 'assets/immaginiProgetti/2.png',
          category: 'Green & Sustainable',
          categoryLink: '/project-1',
          authorName: 'Ekonia',
          authorImg: this.authorImages[1],  // Usa l'immagine dell'autore dinamicamente
          authorLink: '/author-1',
          title: 'Ekonia is the first digital community connecting green people and businesses to build a sustainable, real, and participatory economy together.',
          detailsLink: '/project-details/1',
          raised: '$59,689',
          invest: '€ 7.500,00',
          percentage: '38%',
          date: '25 February 2021',
          expiryRound: new Date(now.getTime() + 60000 * 60), // 1 ora da ora
          expriresProject: new Date(now.getTime() + 60000 * 120), // 2 ore da ora
          quotas: '145.000',
          monthly: '16%',
          price: '€ 1,980,00',
          round2: '18/05/2025',
          categoryClass: 'category-green',
          now: 'Invest now',
          showDateButton: true, // <-- mostra solo "Invest now"
          customStartDate: '24/05/2025' // <- Personalizzata per questo progetto


        },
        {
          imgSrc: 'assets/immaginiProgetti/3.png',
          category: 'Green & Sustainable',
          categoryLink: '/project-2',
          authorName: 'CO2 Neutral Tech',
          authorImg: this.authorImages[2],  // Usa l'immagine dell'autore dinamicamente
          authorLink: '/author-2',
          title: 'CO₂ NeutralTech helps people and companies reduce environmental impact through digital solutions, carbon credits, and sustainability reports.',
          detailsLink: '/project-details/2',
          raised: '$75,000',
          invest: '€ 10,00',
          percentage: '8%',
          date: '10 March 2022',
          expiryRound: new Date(now.getTime() + 60000 * 60), // 1 ora da ora
          expriresProject: new Date(now.getTime() + 60000 * 120), // 2 ore da ora
          quotas: '4.769.000,00',
          monthly: '13%',
          price: '€ 0,8200',
          round2: '30/04/2025',
          categoryClass: 'category-green',
          now: 'Invest now',
          showDateButton: false, // <-- mostra solo "Invest now"
          customStartDate: '24/05/2025' // <- Personalizzata per questo progetto


        },

        //Doppioni

        {
          imgSrc: 'assets/immaginiProgetti/2.png',
          category: 'Green & Sustainable',
          categoryLink: '/project-1',
          authorName: 'Ekonia',
          authorImg: this.authorImages[1],  // Usa l'immagine dell'autore dinamicamente
          authorLink: '/author-1',
          title: 'Ekonia is the first digital community connecting green people and businesses to build a sustainable, real, and participatory economy together.',
          detailsLink: '/project-details/1',
          raised: '$59,689',
          invest: '€ 7.500,00',
          percentage: '38%',
          date: '25 February 2021',
          expiryRound: new Date(now.getTime() + 60000 * 60), // 1 ora da ora
          expriresProject: new Date(now.getTime() + 60000 * 120), // 2 ore da ora
          quotas: '145.000',
          monthly: '16%',
          price: '€ 1,980,00',
          round2: '18/05/2025',
          categoryClass: 'category-green',
          now: 'Invest now',
          showDateButton: true, // <-- mostra solo "Invest now"
          customStartDate: '24/05/2025' // <- Personalizzata per questo progetto


        },
        {
          imgSrc: 'assets/immaginiProgetti/3.png',
          category: 'Green & Sustainable',
          categoryLink: '/project-2',
          authorName: 'CO2 Neutral Tech',
          authorImg: this.authorImages[2],  // Usa l'immagine dell'autore dinamicamente
          authorLink: '/author-2',
          title: 'CO₂ NeutralTech helps people and companies reduce environmental impact through digital solutions, carbon credits, and sustainability reports.',
          detailsLink: '/project-details/2',
          raised: '$75,000',
          invest: '€ 10,00',
          percentage: '8%',
          date: '10 March 2022',
          expiryRound: new Date(now.getTime() + 60000 * 60), // 1 ora da ora
          expriresProject: new Date(now.getTime() + 60000 * 120), // 2 ore da ora
          quotas: '4.769.000,00',
          monthly: '13%',
          price: '€ 0,8200',
          round2: '30/04/2025',
          categoryClass: 'category-green',
          now: 'Invest now',
          showDateButton: false, // <-- mostra solo "Invest now"
          customStartDate: '24/05/2025' // <- Personalizzata per questo progetto


        },



      ];

      this.startCountdown();

      this.isSwiperActive = true;
    }
  }

  ngOnDestroy() {
    this.isSwiperActive = false;
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private startCountdown() {
    this.timer = setInterval(() => {
      const now = new Date();

      this.slides.forEach((slide) => {
        slide.countdownRound = this.calculateCountdown(slide.expiryRound, now);
        slide.countdownProject = this.calculateCountdown(slide.expriresProject, now);
      });

      // Rileva i cambiamenti per aggiornare la vista
      this.cdr.detectChanges();
    }, 1000);
  }

  private calculateCountdown(targetDate: Date, now: Date): string {
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      return 'Expired';
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  }


  isModalOpen = false;  // Variabile per il controllo del modale

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }


}
