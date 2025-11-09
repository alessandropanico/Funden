import { PhaseService } from '../../services/phase.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SmsService } from '../../services/sms.service';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrl: './timer.component.css',
    standalone: false
})
export class TimerComponent implements OnInit, OnDestroy {

  constructor(private phaseService: PhaseService,
    private cdr: ChangeDetectorRef,
    private sms:SmsService

  ) { }

  ngOnInit(): void {

    if (this.phase === 1 && this.phaseService.prefix !== '' && this.phaseService.phoneNumber !== '') {
      this.phaseService.continueButton = true;
    }    // Controlla periodicamente lo stato del timer
    this.timerSubscription = setInterval(() => {
      this.cdr.markForCheck(); // Meno costoso di detectChanges
    }, 1000);
    this.phaseService.continueButton=false;
  }



  ngOnDestroy(): void {
    // Cancella la sottoscrizione al timer quando il componente viene distrutto
    if (this.timerSubscription) {
      clearInterval(this.timerSubscription);
    }
  }

  get phase(): number {
    return this.phaseService.phase;
  }

  get buttonPhase(): number {
    return this.phaseService.buttonPhase;
  }

  get continueButton(): boolean {
    return this.phaseService.continueButton;
  }


  private timerSubscription: any;


  get verificationVisible(): boolean {
    return this.phaseService.verificationVisible
  }

  get anotherCode(): boolean {
    return this.phaseService.anotherCode;
  }

  get strokeColor(): string {
    return this.phaseService.strokeColor;
  }

  get timeRemaining(): number {
    return this.phaseService.timeRemaining;
  }

  get strokeDashOffset(): number {
    return this.phaseService.strokeDashOffset;
  }

  Math = Math;

  calculateDashOffset(): number {
    const totalSeconds = 120; // Tempo totale in secondi
    const remainingSeconds = this.timeRemaining;
    const circleLength = 188; // Lunghezza della circonferenza del cerchio
    const proportion = remainingSeconds / totalSeconds;
    return circleLength * (1 - proportion);
  }

  //--------------------------
  //Click a tentativi

  canRequestAnotherCodeBusiness(): boolean {
    const attemptsKey = 'canRequestAnotherCodeBusiness';
    let attemptsRemaining = parseInt(
      localStorage.getItem(attemptsKey) || '5',
      10
    ); // Se non c'è nessun valore salvato, assume 5 tentativi rimanenti
    const today = new Date();
    const lastResetDate = localStorage.getItem('lastResetDate');

    if (lastResetDate) {
      const lastResetTime = new Date(lastResetDate);
      if (
        today.getDate() !== lastResetTime.getDate() ||
        today.getMonth() !== lastResetTime.getMonth() ||
        today.getFullYear() !== lastResetTime.getFullYear()
      ) {
        attemptsRemaining = 5;
        localStorage.setItem('lastResetDate', today.toISOString());
      }
    } else {
      localStorage.setItem('lastResetDate', today.toISOString());
    }

    attemptsRemaining--;
    localStorage.setItem(attemptsKey, attemptsRemaining.toString());
    console.log('Altro codice in corso...');
    if (attemptsRemaining < 0) {
      // Mostro l'alert se i tentativi sono esauriti
      alert(
        'Hai superato i 5 tentativi. Basta cosi per oggi.'
      );
      return false; // Ritorno false per indicare che non è possibile richiedere un altro codice
    } else {
      this.phaseService.stopTimer();
      this.phaseService.startTimer();
      return true; // Ritorno true se ci sono ancora tentativi disponibili
    }
  }

  //--------------------------------------------------
  //METODI BACK-END
  richiestaCodice() {
    const phoneNumber = this.phaseService.getPrefix() + this.phaseService.getPhoneNumber();

    this.sms.sendSmsCode(phoneNumber).subscribe({
      next: (response) => {
        console.log('SMS inviato con successo:', response);
        // Puoi anche gestire la logica per il timer qui se necessario
        this.phaseService.stopTimer();

        setTimeout(() => {
          this.phaseService.clearCode();
          this.phaseService.startTimer();
          this.cdr.detectChanges();
        }, 50); // 50ms di delay è più che sufficiente

      },
      error: (error) => {
        console.error("Errore nell'invio dell'SMS:", error);
        alert("Errore nell'invio del codice SMS.");
        this.phaseService.stopTimer();

      }
    });
  }





}

