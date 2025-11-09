import { GeneralResponse } from "../../general/response/generalResponse.model";
import { Movement } from "../movement.model";

export class MovementsResponse extends GeneralResponse {
  override data: Movement[];  // Modificatore 'override' per sovrascrivere la proprietà data

  constructor(data: Movement[] = []) {
    super();  // Chiamata al costruttore della classe base
    this.data = data;  // Inizializzazione di data nel costruttore
  }
}
