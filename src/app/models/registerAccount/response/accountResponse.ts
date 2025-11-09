import { GeneralResponse } from "../../general/response/generalResponse.model";

export class AccountRespose extends GeneralResponse {
  override data: Data;  // Modificatore 'override' per sovrascrivere la proprietà 'data'

  constructor(data: Data) {
    super();  // Chiamata al costruttore della classe base
    this.data = data;  // Inizializzazione di 'data' nel costruttore
  }
}

interface Data {
  name: string;
  email: string;
  sso_user_id: number;
  updated_at: string;
  created_at: string;
  uuid: string;
  main_user_id: number;
}
