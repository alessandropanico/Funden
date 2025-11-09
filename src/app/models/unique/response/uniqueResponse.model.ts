import { GeneralResponse } from "../../general/response/generalResponse.model";
import { Unique } from "../unique.model";

export class UniqueResponse extends GeneralResponse {
  override data: Unique; // Aggiungiamo il modificatore 'override'

  // Puoi aggiungere un costruttore per inizializzare 'data' se necessario
  constructor(data: Unique) {
    super();  // Chiamata al costruttore della classe base GeneralResponse
    this.data = data; // Inizializziamo 'data' nel costruttore
  }
}
