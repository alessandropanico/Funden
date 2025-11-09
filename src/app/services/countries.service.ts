import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../interfaces/country';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _countries: Country[] = [];
  get countries(): Country[] { return this._countries; }
  set countries(value: Country[]) { this._countries = value; }

  constructor(private http: HttpClient) { }

  url = 'https://testapi.krathemis.com/api/country?limit=10&offset=0&keyword=0&languageCode=IT';


  getCountries() {
    const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
    return this.http.get<Country[]>(`${this.url}`, { headers }).pipe(
      map((data: Country[]) => {
        return data;
      })
    );
  }
}
