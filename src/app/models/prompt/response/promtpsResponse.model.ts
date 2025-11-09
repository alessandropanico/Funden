import { GeneralResponse } from "../../general/response/generalResponse.model";
import { Promtp } from "../promtp.model";

export class PromtpsResponse extends GeneralResponse {
  override data: Promtp[];  // Aggiungi il modificatore "override" per sovrascrivere la proprietà della classe base

  constructor(data: Promtp[]) {
    super();  // Chiama il costruttore della classe base
    this.data = data;  // Inizializza la proprietà "data"
  }
}
