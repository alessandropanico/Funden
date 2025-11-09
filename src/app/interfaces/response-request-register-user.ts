export interface ResponseRequestRegisterUser {
    prog:        number;
    phoneNumber: string;
    userID:      string;
    pin:         string;
    countryCode: string;
    rol:         string;
    country:     Country;
    profile:     Profile;
    createdAt:   Date;
    updatedAt:   Date;
    email:       null;
    promoCode:   string;
    id:          string;
    status:      boolean;
    pinActive:   boolean;
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
    dateBirth:              null;
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
}