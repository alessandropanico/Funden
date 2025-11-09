import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { UserGateway } from '../models/gateway/userGateway.model';
import { GeneralResponse } from '../models/general/response/generalResponse.model';
import { AddPromptResponse } from '../models/prompt/response/addPromptResponse.mode';
import { Promtp } from '../models/prompt/promtp.model';
import { PromtpsResponse } from '../models/prompt/response/promtpsResponse.model';

import { TOKEN_APP } from './interceptors/http.interceptor.service';
import { AddpromptRequest } from '../models/prompt/request/addPromptRequest.model';

@Injectable({
  providedIn: 'root',
})
export class PromptsService {
  constructor(private http: HttpClient) { }

  private getUser(): UserGateway | null {
    const userData = localStorage.getItem('userGateway');
    return userData ? JSON.parse(userData).user : null;
  }

  listPromptsUser() {
    const user = this.getUser();
    if (!user) {
      throw new Error('Utente non trovato nel localStorage');
    }

    return this.http
      .post<PromtpsResponse>(`${environment.p73.url}/api/promtp/my-list`, { user }, {
        context: new HttpContext().set(TOKEN_APP, { p73: true }),
      })
      .pipe(map(res => res));
  }

  availablePromptsUser() {
    const user = this.getUser();
    if (!user) {
      throw new Error('Utente non trovato nel localStorage');
    }

    return this.http
      .post<any>(`${environment.p73.url}/api/promtp-available/balance-promtp`, { user }, {
        context: new HttpContext().set(TOKEN_APP, { p73: true }),
      })
      .pipe(map(res => res));
  }

  checkPromtp(promtpText: string) {
    return this.http
      .post<any>(`${environment.p73.url}/api/promtp/check`, { promtpTEXT: promtpText }, {
        context: new HttpContext().set(TOKEN_APP, { p73: true }),
      })
      .pipe(map(res => res.success));
  }

  checkPromtpByUser(promtp: Promtp) {
    const user = this.getUser();
    if (!user) {
      throw new Error('Utente non trovato nel localStorage');
    }

    promtp.userID = user.main_user_id;
    return this.http
      .post<any>(`${environment.p73.url}/api/promtp/checkByUser`, promtp, {
        context: new HttpContext().set(TOKEN_APP, { p73: true }),
      })
      .pipe(map(res => res.success));
  }

  createPromtp(promtpText: string) {
    const user = this.getUser();
    if (!user) {
      throw new Error('Utente non trovato nel localStorage');
    }

    const promtp = JSON.stringify({
      promtpTEXT: promtpText,
      walletID: 1,
      userID: user.main_user_id
    });

    return this.http
      .post<GeneralResponse>(`${environment.p73.url}/api/promtp/create`, promtp, {
        context: new HttpContext().set(TOKEN_APP, { p73: true }),
      })
      .pipe(map(res => res.success));
  }

  addPrompt(prompt: AddpromptRequest) {
    const user = this.getUser();
    if (!user) {
      throw new Error('Utente non trovato nel localStorage');
    }

    prompt.user = user;
    return this.http
      .post<AddPromptResponse>(`${environment.p73.url}/api/promtp-available/add`, prompt, {
        context: new HttpContext().set(TOKEN_APP, { p73: true }),
      })
      .pipe(map(res => res));
  }

  discountPrompt() {
    const user = this.getUser();
    if (!user) {
      throw new Error('Utente non trovato nel localStorage');
    }

    return this.http
      .post<AddPromptResponse>(`${environment.p73.url}/api/promtp-available/used-balance-promtp`, { user }, {
        context: new HttpContext().set(TOKEN_APP, { p73: true }),
      })
      .pipe(map(res => res));
  }
}
