import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationPhoneService } from './validation-phone.service';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment.prod';
import { map } from 'rxjs';
import { RequestGenerateSmsCode } from '../interfaces/request-generate-sms-code';
import { ResponseRequestGenerateSmsCode } from '../interfaces/response-request-generate-sms-code';

@Injectable({
  providedIn: 'root'
})
export class GenerateSmsCodeService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private validationPhoneService: ValidationPhoneService
  ) {}

  generateSmsCode(){
    let requestGenerateSmsCode: RequestGenerateSmsCode = {} as RequestGenerateSmsCode;
    requestGenerateSmsCode = {
      from: "Instasent",
      text: "Your activation code is",
      to: this.validationPhoneService.prefix+this.validationPhoneService.phoneNumber
    };
    let headers = {};
    headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.token}` }
    return this.http.post<ResponseRequestGenerateSmsCode>(`${environment.apiKrathemisTest}sms-code`,{...requestGenerateSmsCode}, { headers }).pipe(
      map((data:ResponseRequestGenerateSmsCode) => {
        return data;
      })
    );
  }
}
