import { Component } from '@angular/core';
import { PhaseService } from '../../services/phase.service';
import { PhaseprivateloginService } from '../../services/phaseprivatelogin.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {

  constructor(private phaseService: PhaseService,
    private phasePrivateLogin: PhaseprivateloginService
  ) { }

  get phase(): number {
    return this.phaseService.phase;
  }

  get buttonPhase(): number {
    return this.phaseService.buttonPhase;
  }

  get phasePin():number{
    return this.phasePrivateLogin.phasePin;
  }


}
