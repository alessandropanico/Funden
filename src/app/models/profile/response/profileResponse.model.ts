import { GeneralResponse } from "../../general/response/generalResponse.model";
import { Profile } from "../profile.model";

export class ProfileReponse extends GeneralResponse {
  override data: Profile;  // Modificatore 'override' per sovrascrivere la proprietà 'data'

  constructor(data: Profile) {
    super();  // Chiamata al costruttore della classe base
    this.data = data;  // Inizializzazione di 'data' nel costruttore
  }
}
