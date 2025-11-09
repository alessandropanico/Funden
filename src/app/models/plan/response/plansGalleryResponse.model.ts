import { GeneralResponse } from "../../general/response/generalResponse.model";
import { PlanGallery } from "../planGallery.model";

export class PlansGalleryResponse extends GeneralResponse {
  override data: PlanGallery[];  // Aggiungi il modificatore "override" per sovrascrivere la proprietà della classe base

  constructor(data: PlanGallery[]) {
    super();  // Chiama il costruttore della classe base
    this.data = data;  // Inizializza la proprietà "data"
  }
}
