export class Account {
    username: string;
    name: string;
    email: string;
    password: string;
    c_password: string;
    phone: string;
    codePhone: string;
    idCountry: number;
    type: number;

    constructor() {
        this.username = '';
        this.name = '';
        this.email = '';
        this.password = '';
        this.c_password = '';
        this.phone = '';
        this.codePhone = '';
        this.idCountry = 0;
        this.type = 0;
    }
}