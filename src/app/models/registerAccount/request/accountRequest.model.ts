export class AccountRequest {
    username: string;
    name: string
    email:string;
    password: string;
    c_password: string;
    paisDOMICILIO: string;
    personaTELEFONO: string;
    usuarioAFILIADO: string;

    constructor() {
        this.username = '';
        this.name = '';
        this.email = ''
        this.password = '';
        this.c_password = '';
        this.paisDOMICILIO = '0';
        this.personaTELEFONO = '0';
        this.usuarioAFILIADO = '';
    }
}