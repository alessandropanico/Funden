import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

import { PaymentMethIntRequets } from '../models/stripe/requets/paymentMethIntRequets.model';
import { PaymentMethRequets } from '../models/stripe/requets/paymentMethRequets.model';
import { PaymentMethIntResponse } from '../models/stripe/response/paymentMethIntResponse.model';
import { PaymentMethResponse } from '../models/stripe/response/paymentMethResponse.model';

import { TOKEN_APP } from './interceptors/http.interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(
    private http: HttpClient
  ) { }

  createPaymentMeth(payment: PaymentMethRequets) {
    return this.http.post<PaymentMethResponse>(environment.p73.url + '/api/stripe/create-payment-method', JSON.stringify(payment) , { context: new HttpContext().set(TOKEN_APP, {p73: true}) }).pipe(map((res) => {
      return res;
    }));
  }

  createPaymentMethInt(payment: PaymentMethIntRequets) {
    // console.log(payment)
    return this.http.post<PaymentMethIntResponse>(environment.p73.url + '/api/stripe/create-payment-intent', JSON.stringify(payment) , { context: new HttpContext().set(TOKEN_APP, {p73: true}) }).pipe(map((res) => {
      return res;
    }));
  }

  validatePaymentMethInt(paymentInt: string) {
    return this.http.post<PaymentMethIntResponse>(environment.p73.url + '/api/stripe/create-payment-intent', {paymentInt} , { context: new HttpContext().set(TOKEN_APP, {p73: true}) }).pipe(map((res) => {
      return res;
    }));
  }


}
