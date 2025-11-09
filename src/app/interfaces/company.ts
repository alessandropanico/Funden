export interface Company {
  id: string;
  prog: number;
  email: null | string;
  phoneNumber: string;
  userID: string;
  pin: string;
  status: boolean;
  pinActive: boolean;
  promoCode: string;
  countryCode: string;
  storeType: string;
  subCategories: null;
  rol: string;
  createdAt: Date;
  updatedAt: Date;
  country: Country;
  category: null;
  type: Type;
  profile: Profile;
  companyPassword: CompanyPassword[];
  totalBalance?: number; // Aggiungi la proprietà per il saldo totale
  atm?: ATM[];  // Aggiungiamo il '?' per dichiarare che può essere undefined
  community: Community[];
}

export interface Community {
  friends: number;
  communityFriends: number;
  myFriends: any[];               // Array di oggetti, specifica il tipo se possibile
  myFriendsOfFriends: any[];      // Array di oggetti, specifica il tipo se possibile
  mySummaryFriends: any[];        // Array di oggetti, specifica il tipo se possibile
  countryCode: string;
  country: string;
  rewardPoints: number;
  myRewardPoints: number;
  worldRewardPoints: WorldRewardPoints[]; // Usa l'interfaccia separata
  nextWorldRewardPoints: number;
  missingToNextLevel: number;
  userId: string;
  allFriends: any[];              // Array di oggetti, specifica il tipo se possibile
  myEarnings: number;
  earningsFromFriends: number;
}

// worldRewardPoints.interface.ts
export interface WorldRewardPoints {
  band: string;
  color: string;
  countries: string[];
  id: string;
  level: number;
  percentage: number;
  rewardPoints: number;
  rewardPointsFrom: number;
  rewardPointsRange: string;
  rewardPointsTo: number;
}



export interface ATM {
  walletId: string;
  userId: string;
  balance: number;  // Il saldo del wallet
  name: string;  // Nome del wallet
  status: boolean;  // Stato del wallet (attivo o no)
  countryCode: string;  // Codice paese (es. IT)
  prog: number;  // Programma associato al wallet
  default: boolean;  // Se è il wallet predefinito
  isRechargeWallet: boolean;  // Se il wallet può essere ricaricato
  isMain: boolean;  // Se il wallet è principale
  isMainCountry: boolean;  // Se è il wallet principale per il paese
  isRechargeCountry: boolean;  // Se è il wallet per la ricarica del paese
  createdAt: string;  // Data di creazione
  updatedAt: string;  // Data dell'ultimo aggiornamento
}


export interface CompanyPassword {
  id: string;
  pin: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Country {
  id: string;
  code: string;
  phonePrefix: string;
  name: string;
  languageCode: string;
}

export interface Profile {
  id: string;
  name: string;
  legalRepresentative: string;
  legalAddress: string;
  operativeAddress: string;
  legalLatitude: string;
  legalLongitude: string;
  profilePictureUrlFile: string;
  nameMap: string;
  status: boolean;
  legalRepresentativeFiscal: string;
  iva: string;
  rewardPercentage: number;
  cashBackPercentage: number;
  helpPercentage: number;
  drawingPercentage: number;
  communityPercentage: number;
  pointsPercentage: number;
  createdAt: Date;
  updatedAt: Date;
  seats: any[];
}

export interface Type {
  id: string;
  description: string;
  languageCode?: string; // Opzionale perché non presente a livello principale in Swagger
  createdAt: Date;
  updatedAt: Date;
  companyTypeTranslation: CompanyTypeTranslation[];
}

export interface CompanyTypeTranslation {
  id: string;
  description: string;
  languageCode: string;
}



