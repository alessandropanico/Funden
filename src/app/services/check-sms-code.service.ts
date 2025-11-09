import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckSmsCodeService {

  private _codeCheck: boolean = false;
  get codeCheck(): boolean { return this._codeCheck; }
  set codeCheck(value: boolean) { this._codeCheck = value; }

  private _idCheckCode: string = '';
  get idCheckCode(): string { return this._idCheckCode; }
  set idCheckCode(value: string) { this._idCheckCode = value; }

  private _codeSms: string = '';
  get codeSms(): string { return this._codeSms; }
  set codeSms(value: string) { this._codeSms = value; }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  checkCodeSMS(){
    let headers = {};
    headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.token}` }
    return this.http.get<boolean>(`${environment.apiKrathemisTest}sms-code/check/${this.codeSms}/${this.idCheckCode}`, { headers }).pipe(
      map((data: boolean) => {
        return data;
      })
    );
  }

}
