export class UserGateway {
    email: string;
    name: string;
    updated_at: string;
    created_at: string;
    id: number;
    main_user_id: number;
  
    constructor() {
      this.email = '';
      this.name = '';
      this.updated_at = '';
      this.created_at = '';
      this.id = 0;
      this.main_user_id = 1;
    }
  }