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
    selector: 'app-slider-home',
    templateUrl: './slider-home.component.html',
    styleUrl: './slider-home.component.css',
    standalone: false
})
export class SliderHomeComponent implements OnInit, OnDestroy {
  slides: Slide[] = [];
  loop = true;
  autoplay = {
    delay: 3000,
    disableOnInteraction: false,
  };
  breakpoints = {
    640: { slidesPerView: 1, spaceBetween: 10 },
    768: { slidesPerView: 3, spaceBetween: 20 },
    1024: { slidesPerView: 4, spaceBetween: 30 },
    2048: { slidesPerView: 5, spaceBetween: 30 },

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
          imgSrc: 'assets/immaginiProgetti/1.png',
          category: 'Social community',
          categoryLink: '/project-1',
          authorName: 'Passaparola',
          authorImg: this.authorImages[0],  // Usa l'immagine dell'autore dinamicamente
          authorLink: '/author-1',
          title: 'Passaparola is the first community that rewards<br> you for the advice you give. Give voice to your<br> ideas and earn by sharing what you love.',
          detailsLink: '/project-details/1',
          raised: '$59,689',
          invest: '€ 1.500,00',
          percentage: '60%',
          date: '25 February 2021',
          expiryRound: new Date(now.getTime() + 60000 * 60), // 1 ora da ora
          expriresProject: new Date(now.getTime() + 60000 * 120), // 2 ore da ora
          quotas: '10.000.000,00',
          monthly: '13%',
          price: '€ 0,0110',
          round2: '11/05/2025',
          categoryClass: 'category-yellow',
          now: 'Invest now',
          showDateButton: true, // <-- mostra solo "Invest now"
          customStartDate: '24/05/2025' // <- Personalizzata per questo progetto

        },
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
        {
          imgSrc: 'assets/immaginiProgetti/4.png',
          category: 'Finance & green finance',
          categoryLink: '/project-3',
          authorName: 'Unika Exchange',
          authorImg: this.authorImages[3],  // Usa l'immagine dell'autore dinamicamente
          authorLink: '/author-3',
          title: 'Unika is the first exchange for trading Quote and Green Quote. Like a crypto exchange, but for the real and sustainable economy.',
          detailsLink: '/project-details/3',
          raised: '$40,500',
          invest: '€ 813,00',
          percentage: '32%',
          date: '5 April 2023',
          expiryRound: new Date(now.getTime() + 60000 * 60), // 1 ora da ora
          expriresProject: new Date(now.getTime() + 60000 * 120), // 2 ore da ora
          quotas: '45.000,00',
          monthly: '21%',
          price: '€ 5,4200',
          round2: '18/05/2025',
          categoryClass: 'category-yellow',
          now: 'Invest now',
          showDateButton: true, // <-- mostra solo "Invest now"
          customStartDate: '24/05/2025' // <- Personalizzata per questo progetto


        },
        {
          imgSrc: 'assets/immaginiProgetti/5.png',
          category: 'Ai & Robots',
          categoryLink: '/project-4',
          authorName: 'Human & Horse',
          authorImg: this.authorImages[4],  // Usa l'immagine dell'autore dinamicamente
          authorLink: '/author-4',
          title: 'H&H is the platform for horse lovers: monitor health remotely, find vets, equestrian events, and unforgettable horseback travel experiences.',
          detailsLink: '/project-details/4',
          raised: '$20,000',
          invest: '€ 1.500,00',
          percentage: '46%',
          date: '15 May 2023',
          expiryRound: new Date(now.getTime() + 60000 * 60), // 1 ora da ora
          expriresProject: new Date(now.getTime() + 60000 * 120), // 2 ore da ora
          quotas: '1.400,00',
          monthly: '16%',
          price: '€ 11.5000',
          round2: '18/05/2025',
          categoryClass: 'category-yellow',
          now: 'Invest now',
          showDateButton: true, // <-- mostra solo "Invest now"
          customStartDate: '28/05/2025' // <- Personalizzata per questo progetto

        },
        {
          imgSrc: 'assets/immaginiProgetti/6.png',
          category: 'Food & travel',
          categoryLink: '/project-4',
          authorName: 'La Fraschetta',
          authorImg: this.authorImages[5],  // Usa l'immagine dell'autore dinamicamente
          authorLink: '/author-4',
          title: 'La Fraschetta keeps growing! The brand expands with a new opening in Trevi, bringing Roman flavour, tradition, and warm conviviality with it.',
          detailsLink: '/project-details/4',
          raised: '$20,000',
          invest: '€ 390,00',
          percentage: '16%',
          date: '15 May 2023',
          expiryRound: new Date(now.getTime() + 60000 * 60), // 1 ora da ora
          expriresProject: new Date(now.getTime() + 60000 * 120), // 2 ore da ora
          quotas: '2.000',
          monthly: '8%',
          price: '€ 39.000',
          round2: '11/05/2025',
          categoryClass: 'category-yellow',
          now: 'Invest now',
          showDateButton: true, // <-- mostra solo "Invest now"
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
