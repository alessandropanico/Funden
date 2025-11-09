import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

import { ElementsResponse } from '../models/unique/response/elementsResponse.model';
import { MoodsResponse } from '../models/unique/response/moodsResponse.model';
import { MovementsResponse } from '../models/unique/response/movementsResponse.model';
import { Unique } from '../models/unique/unique.model';
import { TOKEN_APP } from './interceptors/http.interceptor.service';
import { UserGateway } from '../models/gateway/userGateway.model';
import { UniquesResponse } from '../models/unique/response/uniquesResponse.model';
import { GenerateImgRequets } from '../models/unique/request/generateImg.model';
import { UniqueResponse } from '../models/unique/response/uniqueResponse.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniqueService {

  constructor(private http: HttpClient) { }

  // Crea un nuovo oggetto Unique
  createUnique(unique: Unique) {
    const userGateway = localStorage.getItem('userGateway');
    const user: UserGateway = userGateway ? JSON.parse(userGateway).user : null;

    if (user) {
      unique.uniquePROMTP = unique.uniquePROMTP.toUpperCase();
      unique.user = user;
      return this.http.post<UniqueResponse>(
        `${environment.p73.url}/api/unique/create`,
        unique,
        { context: new HttpContext().set(TOKEN_APP, { p73: true }) }
      ).pipe(map(res => res));
    } else {
      // Gestisce il caso in cui l'utente non sia trovato
      return throwError('User data is missing or invalid');
    }
  }

  // Recupera i moods disponibili
  getMoods() {
    return this.http.get<MoodsResponse>(`${environment.p73.url}/api/unique/moods`, {
      context: new HttpContext().set(TOKEN_APP, { p73: true })
    }).pipe(map(res => res));
  }

  // Recupera gli elementi disponibili
  getElements() {
    return this.http.get<ElementsResponse>(`${environment.p73.url}/api/unique/elements`, {
      context: new HttpContext().set(TOKEN_APP, { p73: true })
    }).pipe(map(res => res));
  }

  // Recupera i movimenti disponibili
  getMovements() {
    return this.http.get<MovementsResponse>(`${environment.p73.url}/api/unique/movements`, {
      context: new HttpContext().set(TOKEN_APP, { p73: true })
    }).pipe(map(res => res));
  }

  // Recupera le unique create dall'utente
  getUniquesByUser() {
    const userGateway = localStorage.getItem('userGateway') ?? '{}';
    const user: UserGateway = JSON.parse(userGateway).user;

    return this.http.post<UniquesResponse>(
      `${environment.p73.url}/api/unique/my-list`,
      { user },
      { context: new HttpContext().set(TOKEN_APP, { p73: true }) }
    ).pipe(map(res => res));
  }

  // Converte un oggetto in FormData
  convertidorFormData(object: { [x: string]: string | Blob | (string | Blob)[] }, metodoput = false) {
    const formData = new FormData();

    Object.keys(object).forEach((key: string) => {
      const value = object[key];

      if (Array.isArray(value)) {
        // Se il valore è un array, aggiungiamo ogni elemento singolarmente
        value.forEach((data: string | Blob, index: number) => {
          if (data instanceof Blob) {
            // Se è un Blob, lo aggiungiamo direttamente
            formData.append(`${key}[${index}]`, data);
          } else {
            // Se è una stringa, la aggiungiamo come stringa
            formData.append(`${key}[${index}]`, String(data));
          }
        });
      } else {
        // Se non è un array, controlliamo se è un Blob o una stringa
        if (value instanceof Blob) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));  // Convertiamo in stringa se è necessario
        }
      }
    });

    if (metodoput) {
      formData.append('_method', 'PUT');
    }

    return formData;
  }





  // Genera un'immagine sulla base dei parametri forniti
  generateImgage(imgRequest: GenerateImgRequets) {
    const body = new URLSearchParams();
    body.set('seed', imgRequest.seed.toString());
    body.set('init_image', imgRequest.init_image);
    body.set('iterations', imgRequest.iterations.toString());
    body.set('prompts', imgRequest.prompts);
    body.set('mood', imgRequest.mood === 'no mood' || !imgRequest.mood ? '' : imgRequest.mood);
    body.set('style', imgRequest.style);
    body.set('quality', imgRequest.quality);
    body.set('width', imgRequest.width.toString());
    body.set('height', imgRequest.height.toString());
    body.set('scale', imgRequest.scale.toString());
    body.set('drawer', imgRequest.drawer);
    body.set('make_video', 'false');

    return this.http.post(
      `${environment.imageGenerate.url}/generate`,
      body,
      {
        context: new HttpContext().set(TOKEN_APP, { imageGenerate: true }),
        responseType: 'blob'
      }
    ).pipe(map(res => res));
  }
}
