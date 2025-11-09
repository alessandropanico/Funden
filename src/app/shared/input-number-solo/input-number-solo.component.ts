import { PhaseService } from '../../services/phase.service';
import { Component, EventEmitter, OnInit, Output, Renderer2, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CheckSmsCodeService } from '../../services/check-sms-code.service';
import { LoadingService } from '../../services/loading.service';
import { ResponseRequestGenerateSmsCode } from '../../interfaces/response-request-generate-sms-code';
import { GenerateSmsCodeService } from '../../services/generate-sms-code.service';
import { ValidationPhoneService } from '../../services/validation-phone.service';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { SmsService } from '../../services/sms.service';

@Component({
  selector: 'app-input-number-solo',
  templateUrl: './input-number-solo.component.html',
  styleUrl: './input-number-solo.component.css',
  standalone:false,

})
export class InputNumberSoloComponent implements OnInit, AfterViewInit  {

  @Output() phone: EventEmitter<any> = new EventEmitter();
  @Output() countryCode: EventEmitter<any> = new EventEmitter();
  @Output() stateChanged = new EventEmitter<boolean>();

  constructor(
    private phaseService: PhaseService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private loading: LoadingService,
    private validationPhoneService: ValidationPhoneService,
    private generateSmsCodeService: GenerateSmsCodeService,
    private checkSmsCodeService: CheckSmsCodeService,
    public countriesService: CountriesService,
    private sms: SmsService
  ) { }

  get phase(): number {
    return this.phaseService.phase;
  }

  get buttonPhase(): number {
    return this.phaseService.buttonPhase;
  }

  get continueButton(): boolean {
    return this.phaseService.continueButton;
  }

  get inputNone(): boolean {
    return this.phaseService.inputNone;
  }

  get prefix(): string {
    return this.phaseService.prefix;
  }

  get phoneNumber(): string {
    return this.phaseService.phoneNumber
  }

  set prefix(value: string) {
    this.localPrefix = value;  // Assegna il valore localmente
    this.validationPhoneService.prefix = value;  // Sincronizza con il servizio
    this.phaseService.setPrefix(value);  // Sincronizza con il servizio PhaseService
  }

  set phoneNumber(value: string) {
    this.localPhoneNumber = value;  // Assegna il valore localmente
    this.validationPhoneService.phoneNumber = value;  // Sincronizza con il servizio
    this.phaseService.setPhoneNumber(value);  // Sincronizza con il servizio PhaseService
  }

  localPrefix: string = '+39';
  localPhoneNumber: string = '';


  ngOnInit() {
    // Inizializza i valori locali con quelli del servizio, se necessario
    this.localPrefix = this.phaseService.getPrefix();
    this.localPhoneNumber = this.phaseService.getPhoneNumber();
    this.updateFlag(); // Imposta la bandiera iniziale
    this.loadCountries(); // Carica i paesi dal backend
    this.cdr.detectChanges();
  }



  ngAfterViewInit(): void {
    this.updateFlag();
    this.loadCountries();
    this.cdr.detectChanges();
  }


  get confermaTel(): boolean {
    return this.phaseService.confermaTel;
  }

  checkInput() {
    const isComplete = !!this.localPrefix && !!this.localPhoneNumber;
    this.stateChanged.emit(isComplete);

    // 🔹 Salva i dati nel PhaseService
    this.phaseService.setPrefix(this.localPrefix);
    this.phaseService.setPhoneNumber(this.localPhoneNumber);
    this.validationPhoneService.prefix = this.localPrefix;
    this.validationPhoneService.phoneNumber = this.localPhoneNumber;

    this.phaseService.confermaTel = isComplete;
    this.phaseService.checkFiduciario();

    this.phaseService.continueButton = isComplete; // Abilita il pulsante se tutto è compilato
  }


  clearInputs() {
    this.localPrefix = '+39';
    this.localPhoneNumber = '';
    this.checkInput();
    this.phaseService.resetPhoneNumber();
  }

  countries = [
    { prefix: "+39", name: "IT", flag: "assets/immaginiGenerali/immaginiBandiere/it.jpg" },
    { prefix: "+34", name: "ES", flag: "assets/immaginiGenerali/immaginiBandiere/es.jpg" },
    { prefix: "+351", name: "PT", flag: "assets/immaginiGenerali/immaginiBandiere/pt.jpg" }, // Corretto per il Portogallo
    { prefix: "+33", name: "FR", flag: "assets/immaginiGenerali/immaginiBandiere/fr.jpg" }, // Francia
    { prefix: "+40", name: "RO", flag: "assets/immaginiGenerali/immaginiBandiere/ro.jpg" }  // Romania
  ];



  selectedFlag: string = "assets/immaginiGenerali/immaginiBandiere/it.jpg"; // Bandiera predefinita
  selectedCountryName: string = "IT"; // Nome del paese selezionato

  getFirstTwoWords(name: string): string {
    return name.split(" ").slice(0, 2).join(" "); // Prendi solo le prime due parole
  }

  updateFlag() {
    const selected = this.countries.find(c => c.prefix === this.localPrefix);
    if (selected) {
      this.selectedFlag = selected.flag;
      this.selectedCountryName = selected.name;
      this.cdr.detectChanges();

      const selectElement = this.elRef.nativeElement.querySelector("#prefixSelect") as HTMLSelectElement;
      if (selectElement) {
        this.renderer.setStyle(selectElement, 'backgroundImage', `url(${selected.flag})`);
      }
    }
    this.cdr.detectChanges();
    this.checkInput();
  }


  //-------------------------------------------
  //METODI BACK-END

  paesi: Country[] = [];


  loadCountries() {
    this.countriesService.getCountries().subscribe({
      next: (data: Country[]) => {
        this.paesi = data;  // Manteniamo il tipo corretto

        // Creiamo una mappa separata con i dati necessari per il select
        this.countries = this.paesi.map(country => ({
          prefix: country.phonePrefix,
          name: country.name,
          flag: `assets/immaginiGenerali/immaginiBandiere/${country.code.toLowerCase()}.jpg`
        }));

        console.log("Paesi caricati:", this.countries);
        this.updateFlag();
      },
      error: () => {
        console.error("Errore nel caricamento dei paesi");
        this.paesi = [];
      }
    });
  }


  //lo metto anche nel button
  riceviCodice() {
    if (this.checkSmsCodeService.codeCheck) return;
    this.loading.loading = true;
    this.generateSmsCodeService.generateSmsCode().subscribe({
      next: async (data: ResponseRequestGenerateSmsCode) => {
        if (data.entity.id) {
          this.checkSmsCodeService.idCheckCode = data.entity.id;
        }
        this.loading.loading = false;
      }, error: () => {
        alert("Numero di telefono non valido, inserirne uno corretto.");
        this.loading.loading = false;
      }
    })
  }

  //-------------------------------------------------------------
  //PARTE DEL LOGIN PRIVATO




}
