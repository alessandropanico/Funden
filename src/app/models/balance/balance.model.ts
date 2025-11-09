import { UserGateway } from '../gateway/userGateway.model';

export class Balance {
  movementAmount: number;
  movementTYPE: string;
  user?: UserGateway;

  // Aggiungi un costruttore per inizializzare le proprietà
  constructor(movementAmount: number, movementTYPE: string, user?: UserGateway) {
    this.movementAmount = movementAmount; // Inizializza la proprietà
    this.movementTYPE = movementTYPE; // Inizializza la proprietà
    this.user = user; // Inizializza la proprietà user (opzionale)
  }
}
