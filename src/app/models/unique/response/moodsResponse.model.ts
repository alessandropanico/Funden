import { GeneralResponse } from "../../general/response/generalResponse.model";
import { Mood } from "../mood.model";

export class MoodsResponse extends GeneralResponse {
  override data: Mood[];  // Aggiungi 'override' se 'data' è presente in GeneralResponse

  constructor() {
    super();  // Chiama il costruttore della classe base, GeneralResponse
    this.data = [];  // Inizializza la proprietà data come array vuoto
  }
}
