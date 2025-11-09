import { GeneralResponse } from "../../general/response/generalResponse.model";
import { UserGateway } from "../userGateway.model";

// Sovrascrive la classe GeneralResponse
export class LoginResponseGateway extends GeneralResponse {
  override data: Data;  // Aggiungi 'override' se 'data' è presente in GeneralResponse

  constructor() {
    super();  // Chiama il costruttore della classe base, GeneralResponse
    this.data = new Data();  // Inizializza la proprietà data
  }
}

class Data {
  user: UserGateway;
  access_token: string;

  constructor() {
    this.user = {} as UserGateway;
    this.access_token = '';
  }
}
