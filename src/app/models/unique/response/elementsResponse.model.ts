import { GeneralResponse } from "../../general/response/generalResponse.model";
import { UniqueElement } from "../element.model";

export class ElementsResponse extends GeneralResponse {
  override data: UniqueElement[];  // Modificatore 'override' per sovrascrivere la proprietà 'data'

  constructor(data: UniqueElement[] = []) {
    super();  // Chiamata al costruttore della classe base
    this.data = data;  // Inizializzazione di 'data' nel costruttore
  }
}
