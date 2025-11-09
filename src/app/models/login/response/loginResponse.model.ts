import { GeneralResponse } from "../../general/response/generalResponse.model";

export class LoginResponse extends GeneralResponse {
  // Aggiungiamo l'override per il membro 'data' ereditato dalla classe base
  override data: Data;

  // Costruttore che accetta 'data' come parametro
  constructor(data: Data) {
    super(); // chiamata al costruttore della classe base
    this.data = data; // Inizializzazione di 'data' con il valore passato
  }
}

interface Data {
  token: string;
  username: string;
  usuarioESTADO: string;
  usuarioULTOMOLOGIN: string;
  rol: string[];
  operaciones: any[];
  tipoUsuario: number;
}
