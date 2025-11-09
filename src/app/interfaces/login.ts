export interface Login {
  countryCode: string;
  phone:       string;
  pin:         string;
}
export interface RespLogin {
  id:          string;
  prog:        number;
  email:       string;
  phoneNumber: string;
  userID:      string;
  status:      boolean;
  pinActive:   boolean;
  promoCode:   string;
  countryCode: string;
  rol:         string;
  createdAt:   Date;
  updatedAt:   Date;
  country:     Country;
  profile:     Profile;
  token:       string;
}

export interface Country {
  id:           string;
  code:         string;
  phonePrefix:  string;
  name:         string;
  languageCode: string;
}

export interface Profile {
  id:                     string;
  name:                   string;
  lastName:               string;
  username:               string;
  dateBirth:              Date;
  taxNumber:              string;
  residenceAddress:       string;
  homeAddress:            string;
  status:                 boolean;
  idCardUrlFile:          string;
  proofResidencyUrlFile:  string;
  idCardVerified:         boolean;
  proofResidencyVerified: boolean;
  profilePictureUrlFile:  string;
  createdAt:              Date;
  updatedAt:              Date;
  countryResidence:       Country;
  homeCountry:            Country;
}
