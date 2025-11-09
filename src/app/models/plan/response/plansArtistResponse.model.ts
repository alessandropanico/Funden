import { GeneralResponse } from "../../general/response/generalResponse.model";
import { PlanArtist } from "../planArtist.model";

export class PlansArtistResponse extends GeneralResponse {
  override data: PlanArtist[];  // Aggiungi il modificatore "override" per indicare che stai sovrascrivendo la proprietà della classe base

  constructor(data: PlanArtist[]) {
    super();  // Chiama il costruttore della classe base
    this.data = data;  // Inizializza la proprietà "data"
  }
}
