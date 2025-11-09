import { UserGateway } from '../gateway/userGateway.model';

export class AddpromptRequest {
  promtp_availableQUANTITY: number;
  user?: UserGateway;

  // Aggiungi un costruttore per inizializzare le proprietà
  constructor(promtp_availableQUANTITY: number, user?: UserGateway) {
    this.promtp_availableQUANTITY = promtp_availableQUANTITY; // Inizializza la proprietà
    this.user = user; // Inizializza la proprietà user, se presente
  }
}
