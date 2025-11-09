export class PlanArtist {
  id: number;
  planTITLE: string;
  planCODE: string;
  planCOLOR?: any;
  planFULLPRICE: string;
  planDISCOUNTPRICE: string;
  planQUANTITYPROMTP: string;
  languageID: number;
  planTYPE: string;
  createdAt?: any;
  updatedAt?: any;
  Items: Item[];


  // Aggiungi il costruttore per inizializzare le proprietà
  constructor(
    id: number,
    planTITLE: string,
    planCODE: string,
    planFULLPRICE: string,
    planDISCOUNTPRICE: string,
    planQUANTITYPROMTP: string,
    languageID: number,
    planTYPE: string,
    Items: Item[] = [] // Inizializza Items come array vuoto di default
  ) {
    this.id = id;
    this.planTITLE = planTITLE;
    this.planCODE = planCODE;
    this.planFULLPRICE = planFULLPRICE;
    this.planDISCOUNTPRICE = planDISCOUNTPRICE;
    this.planQUANTITYPROMTP = planQUANTITYPROMTP;
    this.languageID = languageID;
    this.planTYPE = planTYPE;
    this.Items = Items; // Assegna l'array di Item
  }
}

interface Item {
  id: number;
  itemTEXT: string;
  planID: number;
  itemBOLD: boolean;
  createdAt?: any;
  updatedAt?: any;
}
