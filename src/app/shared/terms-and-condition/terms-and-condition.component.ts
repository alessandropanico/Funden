import { Component, OnInit } from '@angular/core';
import { PhaseService } from '../../services/phase.service';

@Component({
    selector: 'app-terms-and-condition',
    templateUrl: './terms-and-condition.component.html',
    styleUrl: './terms-and-condition.component.css',
    standalone: false
})
export class TermsAndConditionComponent implements OnInit {

  constructor(
    private phaseService: PhaseService,
  ) { }

  ngOnInit(): void {
    this.phaseService.continueButton = false;
    this.phaseService.checkboxesChecked = [false, false, false]; // Array per tenere traccia dello stato dei checkbox
  }

  get continueButton(): boolean {
    return this.phaseService.continueButton;
  }

  get checkboxesChecked(): boolean[] {
    return this.phaseService.checkboxesChecked;
  }

  get phase(): number {
    return this.phaseService.phase;
  }


  onCheckboxChange(index: number): void {
    this.phaseService.checkboxesChecked[index] = !this.phaseService.checkboxesChecked[index];
    this.phaseService.checkFormFilled(); // Chiamata al metodo per verificare se il form è compilato correttamente
    
  }
}

