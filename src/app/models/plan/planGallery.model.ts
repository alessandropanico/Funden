export class PlanGallery {
  id: number;
  planTITLE: string;
  planCODE: string;
  planCOLOR?: any;
  planFULLPRICE: string;
  planDISCOUNTPRICE: string;
  planQUANTITYPROMTP?: any;
  languageID: number;
  planTYPE: string;
  createdAt?: any;
  updatedAt?: any;
  Items: Item[];

  // Aggiungi un costruttore per inizializzare le proprietà obbligatorie e opzionali
  constructor(
    id: number,
    planTITLE: string,
    planCODE: string,
    planFULLPRICE: string,
    planDISCOUNTPRICE: string,
    languageID: number,
    planTYPE: string,
    Items: Item[] = [] // Inizializza Items come un array vuoto
  ) {
    this.id = id;
    this.planTITLE = planTITLE;
    this.planCODE = planCODE;
    this.planFULLPRICE = planFULLPRICE;
    this.planDISCOUNTPRICE = planDISCOUNTPRICE;
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
