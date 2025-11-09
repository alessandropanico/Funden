import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Login, RespLogin } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  constructor( private http: HttpClient ) { }

  private readonly url = 'https://testapi.krathemis.com/api/';

  login(data: Login){
    return this.http.post<RespLogin>(`${this.url}auth/login`,data).pipe(
      map((data:RespLogin) => {
        return data;
      })
    );
  }
}
