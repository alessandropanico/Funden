import { Injectable } from '@angular/core';
import { RequestRegisterUser } from '../interfaces/request-register-user';
import { HttpClient } from '@angular/common/http';
import { ResponseRequestRegisterUser } from '../interfaces/response-request-register-user';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  private _pinCode: string[] = ['','','','',''];
  get pinCode(): string[] { return this._pinCode; }
  set pinCode(value: string[]) { this._pinCode = value; }

  private _user: RequestRegisterUser = new RequestRegisterUser();
  get user(): RequestRegisterUser { return this._user; }
  set user(value: RequestRegisterUser) { this._user = value; }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}


  registerUser(){
    let headers = {};
    headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.token}` }
    return this.http.post<ResponseRequestRegisterUser>(`${environment.apiKrathemisTest}user`,{...this.user}, { headers }).pipe(
      map((data:ResponseRequestRegisterUser) => {
        return data;
      })
    );
  }
}
