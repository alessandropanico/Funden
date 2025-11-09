export class GeneralResponse {
    success: boolean;
    data: any;
    message: string;
    error?: ''

    constructor() {
        this.success = false;
        this.data = '';
        this.message = '';
        this.error = '';
    }
}