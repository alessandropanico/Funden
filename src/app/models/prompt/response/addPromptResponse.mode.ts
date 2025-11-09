import { GeneralResponse } from "../../general/response/generalResponse.model";

export class AddPromptResponse extends GeneralResponse {
  override data: Data;  // Aggiungi "override" per indicare che stai sovrascrivendo la proprietà

  constructor(data: Data) {
    super();  // Chiamata al costruttore della classe base
    this.data = data;  // Inizializzazione della proprietà data
  }
}

interface Data {
  id: number;
  promtp_availableQUANTITY: string;
  userID: string;
  promtp_availableUNTIL: string;
  updatedAt: string;
  createdAt: string;
}
