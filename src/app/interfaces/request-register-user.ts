export class RequestRegisterUser {
    phoneNumber: string;
    countryID:   string;
    pin:         string;
    rol:         string;
    constructor() {
        this.phoneNumber =  '';
        this.countryID   =  '';
        this.pin         =  '';
        this.rol         =  'user';
    }
}