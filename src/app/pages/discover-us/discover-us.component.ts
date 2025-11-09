import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-discover-us',
    templateUrl: './discover-us.component.html',
    styleUrl: './discover-us.component.css',
    standalone: false
})
export class DiscoverUsComponent implements OnInit {

  private observer!: IntersectionObserver;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    // Manteniamo il codice esistente
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');

            // Nuovo codice per i contatori
            if (entry.target.classList.contains('count') && !entry.target.classList.contains('counted')) {
              entry.target.classList.add('counted');
              this.animateCount(entry.target as HTMLElement);
            }
          }
        });
      }, { threshold: 0.5 });

      // Osserva le immagini già presenti
      const images = document.querySelectorAll('.hero-img');
      images.forEach(image => {
        this.observer.observe(image);
      });

      // Osserva i contatori aggiunti
      const counters = document.querySelectorAll('.count');
      counters.forEach(counter => {
        this.observer.observe(counter);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // Aggiunto per animazione dei numeri
  private animateCount(element: HTMLElement): void {
    const targetNumber = parseInt(element.getAttribute('data-to') || '0', 10);
    const duration = 2000; // Durata dell'animazione in millisecondi
    const stepTime = 20; // Tempo tra i passi
    const steps = Math.ceil(duration / stepTime);
    const increment = targetNumber / steps;
    let currentNumber = 0;

    const interval = setInterval(() => {
      currentNumber += increment;
      if (currentNumber >= targetNumber) {
        currentNumber = targetNumber;
        clearInterval(interval);
      }
      element.textContent = Math.floor(currentNumber).toString();
    }, stepTime);
  }

}
