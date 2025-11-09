export class PaymentMethRequets {
    number: string;
    exp_month: string;
    exp_year: string;
    cvc: string;
    email?: string;
    name?:string;
    phone?: string

    constructor() {
        this.number = '';
        this.exp_month = '';
        this.exp_year = '';
        this.cvc = '';
        this.email = '';
        this.name = '';
        this.phone = '';
    }
}