export interface RespValidPhone {
    id:          string;
    prog:        number;
    email:       null;
    phoneNumber: string;
    userID:      string;
    pin:         string;
    status:      boolean;
    pinActive:   boolean;
    promoCode:   string;
    countryCode: string;
    rol:         string;
    createdAt:   Date;
    updatedAt:   Date;
    country:     Country;
}

export interface Country {
    id:           string;
    code:         string;
    phonePrefix:  string;
    name:         string;
    languageCode: string;
}
