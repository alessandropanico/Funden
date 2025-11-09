import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { TOKEN_APP } from './interceptors/http.interceptor.service';

import { PlansGalleryResponse } from '../models/plan/response/plansGalleryResponse.model';
import { PlansArtistResponse } from '../models/plan/response/plansArtistResponse.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(
    private http: HttpClient
  ) { }

  getPlansArtist() {
    return this.http.get<PlansArtistResponse>(environment.p73.url + '/api/plan/list-artist', { context: new HttpContext().set(TOKEN_APP, {p73: true}) }).pipe(map((res) => {
      return res;
    }));
  }

  getPlansGallery() {
    return this.http.get<PlansGalleryResponse>(environment.p73.url + '/api/plan/list-gallery', { context: new HttpContext().set(TOKEN_APP, {p73: true}) }).pipe(map((res) => {
      return res;
    }));
  }

}
