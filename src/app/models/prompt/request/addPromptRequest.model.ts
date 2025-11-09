import { UserGateway } from '../../gateway/userGateway.model';

export class AddpromptRequest {
    promtp_availableQUANTITY: number = 0; // Valore predefinito
    user?: UserGateway;
}
