import { GeneralResponse } from "../../general/response/generalResponse.model";
import { Unique } from "../unique.model";

export class UniquesResponse extends GeneralResponse {
  override data: Unique[];  // Modificatore 'override' per sovrascrivere la proprietà data

  constructor(data: Unique[] = []) {
    super(); // Chiamata al costruttore della classe base
    this.data = data;  // Inizializzazione di data nel costruttore
  }
}
