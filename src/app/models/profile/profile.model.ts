export class Profile {
  description: string;
  userID: string;
  idProfileType: number
  img?: string;
  id?: number;
  updatedAt?: string;
  createdAt?: string;

  constructor() {
    this.description = '';
    this.img = '';
    this.userID = '';
    this.idProfileType = 0;
    this.id = 0;
    this.updatedAt = '';
    this.createdAt = '';
  }
}