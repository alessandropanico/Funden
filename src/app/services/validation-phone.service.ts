import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { RespValidPhone } from '../interfaces/resp-valid-phone';

@Injectable({
  providedIn: 'root'
})
export class ValidationPhoneService {

  private _prefix: string = '';
  get prefix(): string { return this._prefix; }
  set prefix(value: string) { this._prefix = value; }

  private _phoneNumber: string = '';
  get phoneNumber(): string { return this._phoneNumber; }
  set phoneNumber(value: string) { this._phoneNumber = value; }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  ValidationPhoneRegistered(){
    let headers = {};
    headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.token}` }
    return this.http.get<RespValidPhone|boolean>(`${environment.apiKrathemisTest}user/find-by-phone/${this.prefix}/${this.phoneNumber}`, { headers }).pipe(
      map((data: RespValidPhone|boolean) => {
        return data;
      })
    );
  }
}
